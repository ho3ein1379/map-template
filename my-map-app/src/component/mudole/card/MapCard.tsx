import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

interface MapCardProps {
    lat?: number;
    lng?: number;
    zoom?: number;
    height?: string;
}

export default function MapCard({
                                    lat = 37.1378,
                                    lng = 50.2856,
                                    zoom = 15,
                                    height = '500px'
                                }: MapCardProps) {
    const [position, setPosition] = useState<[number, number]>([lat, lng]);
    const [currentZoom, setCurrentZoom] = useState(zoom);

    const MapEventHandler = () => {
        const map = useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
            },
            zoomend() {
                setCurrentZoom(map.getZoom());
            },
        });
        return null;
    };

    const handleLatChange = (value: string) => {
        const newLat = parseFloat(value);
        if (!isNaN(newLat)) {
            setPosition([newLat, position[1]]);
        }
    };

    const handleLngChange = (value: string) => {
        const newLng = parseFloat(value);
        if (!isNaN(newLng)) {
            setPosition([position[0], newLng]);
        }
    };

    const goToLocation = (lat: number, lng: number) => {
        setPosition([lat, lng]);
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
                <h2 className="text-2xl font-bold">نقشه تعاملی</h2>
                <p className="text-sm text-blue-100 mt-1">برای انتخاب موقعیت، روی نقشه کلیک کنید</p>
            </div>

            <div className="p-4 bg-gray-50 border-b">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            عرض جغرافیایی (Latitude)
                        </label>
                        <input
                            type="number"
                            step="0.000001"
                            value={position[0]}
                            onChange={(e) => handleLatChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            طول جغرافیایی (Longitude)
                        </label>
                        <input
                            type="number"
                            step="0.000001"
                            value={position[1]}
                            onChange={(e) => handleLngChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            سطح زوم (Zoom)
                        </label>
                        <input
                            type="number"
                            min="10"
                            max="25"
                            value={currentZoom}
                            onChange={(e) => setCurrentZoom(parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">مکان‌های پیشنهادی:</p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => goToLocation(35.6892, 51.3890)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            تهران
                        </button>
                        <button
                            onClick={() => goToLocation(36.2974, 59.6061)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            مشهد
                        </button>
                        <button
                            onClick={() => goToLocation(32.6546, 51.6680)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            اصفهان
                        </button>
                        <button
                            onClick={() => goToLocation(29.5918, 52.5836)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            شیراز
                        </button>
                        <button
                            onClick={() => goToLocation(38.0736, 46.2919)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            تبریز
                        </button>
                        <button
                            onClick={() => goToLocation(37.1378, 50.2856)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            رودسر
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ height, width: '100%', position: 'relative' }}>
                <MapContainer
                    center={position}
                    zoom={currentZoom}
                    minZoom={15}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={position}>
                        <Popup>
                            <div className="text-center">
                                <b>موقعیت انتخابی</b><br />
                                Lat: {position[0].toFixed(6)}<br />
                                Lng: {position[1].toFixed(6)}
                            </div>
                        </Popup>
                    </Marker>

                    <MapEventHandler />
                </MapContainer>
            </div>

            <div className="p-3 bg-gray-100 border-t">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>موقعیت: {position[0].toFixed(6)}, {position[1].toFixed(6)}</span>
                    <span>زوم: {currentZoom}</span>
                </div>
            </div>
        </div>
    );
}