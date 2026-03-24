import { useState, useRef, JSX } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import { mapStyle } from "../styles/styles";
import { ParkLocation } from "../backend/types";
import { parks } from "../test_items/test_data";
import theme from "../styles/theme";
import { useLeafletCSS } from "./scripts/map_scripts";
import ParkList from "../components/park_list";
import CustomSearchBar from "../components/search_bar";
import { useInitMap, useLeaflet, usePanMap } from "../hooks/map_hooks";

declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

export default function MapPage(): JSX.Element {
  const [selectedPark, setSelectedPark] = useState<number | null>(null);
  const [parkList, setParkList] = useState<ParkLocation[]>(parks);
  const [search, setSearch] = useState<string>("");

  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<number, Marker>>({});

  useLeafletCSS();

  // Load Leaflet script dynamically
  const leafletReady = useLeaflet();

  // Initialise map once Leaflet is ready
  useInitMap({
    leafletMap: leafletMap, 
    leafletReady: leafletReady, 
    setSelectedPark: setSelectedPark,
    mapRef: mapRef,
    parkList: parkList,
    markersRef: markersRef
  });

  // Pan map when selection changes from the list
  usePanMap({
    leafletMap: leafletMap,
    markersRef: markersRef,
    selectedPark: selectedPark,
    parkList: parkList
  })

  return (
    <div style={mapStyle.root}>
      <CustomSearchBar 
        setSearch={setSearch} 
        search={search}
        defaultText="Search for parks..."
        searchBar={mapStyle.searchBar}
        searchInput={mapStyle.searchInput}
        searchWrap={mapStyle.searchWrap}
      />

      {/* Leaflet Map */}
      <div style={mapStyle.mapWrap}>
        <div ref={mapRef} style={mapStyle.mapNode} />

        <div style={mapStyle.legend}>
          <div style={mapStyle.legendRow}>
            <div style={mapStyle.legendDot(theme.accent, null)} />
            <span style={mapStyle.legendText}>You're going</span>
          </div>
          <div style={mapStyle.legendRow}>
            <div style={mapStyle.legendDot(theme.surfaceUp, theme.border)} />
            <span style={mapStyle.legendText}>Available</span>
          </div>
        </div>
      </div>

      <ParkList 
        setSelectedPark={setSelectedPark} 
        search={search} 
        parkList={parkList} 
        selectedPark={selectedPark}
        markersRef={markersRef}
        leafletMap={leafletMap}
        setParkList={setParkList}
      />
    </div>
  );
}