import L from "leaflet";
import {loadFromLocalStorage, saveToLocalStorage} from "../utils/MapUtils.ts";

export const useMapDrawHandlers = () => {

    const onCreated = (e: any) => {
        const layer = e.layer;
        const text = prompt("متن داخل شکل:", "منطقه جدید");
        const color = prompt("رنگ شکل:", "#ff0000");

        layer.setStyle({
            color,
            fillColor: color,
            fillOpacity: 0.4,
        });

        const center = layer.getBounds().getCenter();

        const label = L.marker(center, {
            icon: L.divIcon({
                className: "polygon-label",
                html: `<div style="color:white; font-weight:bold;">${text}</div>`,
            }),
        }).addTo(layer._map);

        layer._label = label;
        layer._text = text;
        layer._color = color;
        layer._id = Date.now();
        const latlngs = layer.getLatLngs()[0].map((p: any) => ({
            lat: p.lat,
            lng: p.lng,
        }));

        const polygons = loadFromLocalStorage();
        polygons.push({
            id: layer._id,
            text,
            color,
            latlngs,
            zoom: layer._map.getZoom(),
        });
        saveToLocalStorage(polygons);

        layer.addTo(layer._map);
    };

    const onEdited = (e: any) => {
        const polygons = loadFromLocalStorage();

        e.layers.eachLayer((layer: any) => {
            const newText = prompt("متن جدید:", layer._text || "منطقه جدید");
            const newColor = prompt("رنگ جدید:", layer._color || "#ff0000");

            if (newColor) {
                layer.setStyle({
                    color: newColor,
                    fillColor: newColor,
                    fillOpacity: 0.4,
                });
                layer._color = newColor;
            }

            if (newText) {
                if (layer._label) layer._map.removeLayer(layer._label);

                const center = layer.getBounds().getCenter();
                const newLabel = L.marker(center, {
                    icon: L.divIcon({
                        className: "polygon-label",
                        html: `<div style="color:white; font-weight:bold;">${newText}</div>`,
                    }),
                }).addTo(layer._map);

                layer._label = newLabel;
                layer._text = newText;
            }

            const latlngs = layer.getLatLngs()[0].map((p: any) => ({
                lat: p.lat,
                lng: p.lng,
            }));

            const idx = polygons.findIndex((p: { id: any; }) => p.id === layer._id);
            if (idx !== -1) {
                polygons[idx] = {
                    ...polygons[idx],
                    text: layer._text,
                    color: layer._color,
                    latlngs,
                    zoom: layer._map.getZoom(),
                };
            }
        });

        saveToLocalStorage(polygons);
    };

    const onDeleted = (e: any) => {
        let polygons = loadFromLocalStorage();

        e.layers.eachLayer((layer: any) => {
            if (layer._label) {
                layer._map.removeLayer(layer._label);
            }

            polygons = polygons.filter((p: { id: any; }) => p.id !== layer._id);

            layer._map.removeLayer(layer);
        });

        saveToLocalStorage(polygons);
    };

    return { onCreated, onEdited, onDeleted };
};
