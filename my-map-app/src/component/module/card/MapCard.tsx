import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {useMapDrawHandlers} from "../../../hook/UseMapDrawHandlers.ts";
import MapEvents from "../../../hook/MapEvents.ts";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
    iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
    shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

export default function MapCard({
                                    lat = 37.1378,
                                    lng = 50.2856,
                                    zoom = 15,
                                    height = "500px",
                                }) {
    const [position, setPosition] = useState<[number, number]>([lat, lng]);
    const [currentZoom, setCurrentZoom] = useState(zoom);
    const { onCreated, onEdited, onDeleted } = useMapDrawHandlers();

    return (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
                <h2 className="text-2xl font-bold">نقشه تعاملی</h2>
                <p className="text-sm text-blue-100 mt-1">برای انتخاب موقعیت، روی نقشه کلیک کنید</p>
            </div>

            {/*<MapToolbar
                position={position}
                zoom={currentZoom}
                onLatChange={(val) => setPosition([parseFloat(val), position[1]])}
                onLngChange={(val) => setPosition([position[0], parseFloat(val)])}
                onZoomChange={setCurrentZoom}
                onGoToLocation={(lat, lng) => setPosition([lat, lng])}
            />*/}

            <div style={{ height, width: "100%", position: "relative" }}>
                <MapContainer
                    center={position}
                    zoom={currentZoom}
                    minZoom={15}
                    scrollWheelZoom
                    style={{ height: "100%", width: "100%" }}
                >
                    <FeatureGroup>
                        <EditControl
                            position="topright"
                            onCreated={onCreated}
                            onEdited={onEdited}
                            onDeleted={onDeleted}
                            draw={{
                                rectangle: false,
                                circle: false,
                                circlemarker: false,
                                marker: false,
                                polygon: {
                                    allowIntersection: true,
                                    showArea: true,
                                    shapeOptions: { color: "#3388ff", weight: 3 },
                                    repeatMode: true,
                                },
                            }}
                        />
                    </FeatureGroup>

                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={position}>
                        <Popup>
                            <div className="text-center">
                                <b>موقعیت انتخابی</b>
                                <br />
                                Lat: {position[0].toFixed(6)}
                                <br />
                                Lng: {position[1].toFixed(6)}
                            </div>
                        </Popup>
                    </Marker>

                    <MapEvents setPosition={setPosition} setZoom={setCurrentZoom} />
                </MapContainer>
            </div>

            <div className="p-3 bg-gray-100 border-t text-sm text-gray-600 flex justify-between">
        <span>
          موقعیت: {position[0].toFixed(6)}, {position[1].toFixed(6)}
        </span>
                <span>زوم: {currentZoom}</span>
            </div>
        </div>
    );
}