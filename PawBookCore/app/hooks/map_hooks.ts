import { useEffect, useState } from "react";
import { createMapPopUp, makePinIcon } from "../(pages)/scripts/map_scripts";
import { ParkLocation } from "../backend/types";
import { getProfileById } from "../backend/helper_functions";
import theme from "../styles/theme";
import { currentUser } from "../test_items/test_data";
import type { Map as LeafletMap, Marker } from "leaflet";

export function useLeaflet() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window.L) {
      setIsReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => setIsReady(true);
    document.head.appendChild(script);
  }, []);

  return isReady;
}

type useInitMapProps = {
    leafletReady: boolean;
    mapRef: React.RefObject<HTMLDivElement | null>;
    leafletMap: React.RefObject<LeafletMap | null>;
    parkList: ParkLocation[];
    markersRef: React.RefObject<Record<number, Marker<any>>>;
    setSelectedPark: React.Dispatch<React.SetStateAction<number | null>>;
}

export function useInitMap(props: useInitMapProps) {
    useEffect(() => {
        if (!props.leafletReady || !props.mapRef.current || props.leafletMap.current) return;
        const L = window.L;
        const user = getProfileById(currentUser)
        const map = L.map(props.mapRef.current, {
            center: [user.current_location.lat, user.current_location.lng],
            zoom: 14,
            zoomControl: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(map);

        props.parkList.forEach((park: ParkLocation) => {
            const color = park.user_going ? theme.accent : theme.surfaceUp;
            const border = park.user_going ? "#000" : theme.border;
            const icon = makePinIcon(L, color, border);

            const marker = L.marker([park.lat, park.lng], { icon }).addTo(map);

            marker.bindPopup(createMapPopUp(park));

            marker.on("click", () => {
                props.setSelectedPark((prev) => (prev === park.park_id ? null : park.park_id));
            });

            props.markersRef.current[park.park_id] = marker;
        });

        props.leafletMap.current = map;
    }, [props.leafletReady]);
}

type usePanMapType = {
    leafletMap: React.RefObject<LeafletMap | null>;
    selectedPark: number | null;
    parkList: ParkLocation[];
    markersRef: React.RefObject<Record<number, Marker<any>>>;
}

export function usePanMap(props: usePanMapType) {
    useEffect(() => {
        if (!props.leafletMap.current || props.selectedPark === null) return;
        const park = props.parkList.find((p) => p.park_id === props.selectedPark);
        if (!park) return;
        props.leafletMap.current.flyTo([park.lat, park.lng], 15, { duration: 0.8 });
        props.markersRef.current[park.park_id]?.openPopup();
    }, [props.selectedPark]);
}