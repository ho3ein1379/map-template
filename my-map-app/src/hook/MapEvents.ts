import { useMapEvents } from "react-leaflet";

interface Props {
    setPosition: (pos: [number, number]) => void;
    setZoom: (zoom: number) => void;
}

export default function MapEvents({ setPosition, setZoom }: Props) {
    const map = useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
        zoomend() {
            setZoom(map.getZoom());
        },
    });

    map.getContainer().addEventListener("contextmenu", (e) => e.preventDefault());

    return null;
}
