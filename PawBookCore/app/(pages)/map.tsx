import { useState, useEffect, useRef, CSSProperties, MouseEvent, JSX } from "react";
import type { Map as LeafletMap, Marker, DivIcon } from "leaflet";
import { mapStyle } from "../styles/styles";
import { ParkLocation } from "../backend/types";
import { parks } from "../test_items/test_data";
import theme from "../styles/theme";
import { currentUser } from "../test_items/test_data";
import { getProfileById } from "../backend/helper_functions";

// Extend Window to include the dynamically loaded Leaflet global
declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

// ─── Leaflet CSS injected once ────────────────────────────────────────────────

function useLeafletCSS(): void {
  useEffect(() => {
    if (document.getElementById("leaflet-css")) return;

    const link = document.createElement("link");
    link.id = "leaflet-css";
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      .leaflet-container { background: #0f1117 !important; font-family: inherit; }
      .leaflet-control-attribution { background: rgba(15,17,23,0.85) !important; color: #6b7280 !important; }
      .leaflet-control-attribution a { color: #60a5fa !important; }
      .leaflet-control-zoom a { background: #1f2330 !important; color: #f1f5f9 !important; border-color: #2a2f3d !important; }
      .leaflet-control-zoom a:hover { background: #2a2f3d !important; }
      .leaflet-popup-content-wrapper { background: #181b24; color: #f1f5f9; border: 1px solid #2a2f3d; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
      .leaflet-popup-tip { background: #181b24; }
      .leaflet-popup-close-button { color: #6b7280 !important; }
    `;
    document.head.appendChild(style);
  }, []);
}

// ─── Build a coloured SVG pin as a Leaflet DivIcon ────────────────────────────

function makePinIcon(L: typeof import("leaflet"), color: string, borderColor: string): DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:34px;height:34px;border-radius:50%;
        background:${color};
        border:2.5px solid ${borderColor};
        display:flex;align-items:center;justify-content:center;
        font-size:16px;
        box-shadow:0 4px 12px rgba(0,0,0,0.45);
        cursor:pointer;
        transition:transform .15s ease;
      ">🐾</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -36],
  });
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MapPage(): JSX.Element {
  const [selectedPark, setSelectedPark] = useState<number | null>(null);
  const [parkList, setParkList] = useState<ParkLocation[]>(parks);
  const [search, setSearch] = useState<string>("");
  const [leafletReady, setLeafletReady] = useState<boolean>(false);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<number, Marker>>({});

  useLeafletCSS();

  // Load Leaflet script dynamically
  useEffect(() => {
    if (window.L) {
      setLeafletReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => setLeafletReady(true);
    document.head.appendChild(script);
  }, []);

  // Initialise map once Leaflet is ready
  useEffect(() => {
    if (!leafletReady || !mapRef.current || leafletMap.current) return;
    const L = window.L;
    const user = getProfileById(currentUser)
    const map = L.map(mapRef.current, {
      center: [user.current_location.lat, user.current_location.lng],
      zoom: 14,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    parkList.forEach((park: ParkLocation) => {
      const color = park.user_going ? theme.accent : theme.surfaceUp;
      const border = park.user_going ? "#000" : theme.border;
      const icon = makePinIcon(L, color, border);

      const marker = L.marker([park.lat, park.lng], { icon }).addTo(map);

      marker.bindPopup(`
        <div style="min-width:180px;padding:4px 2px">
          <div style="font-size:15px;font-weight:700;margin-bottom:6px">${park.name}</div>
          <div style="font-size:12px;color:#94a3b8;margin-bottom:2px">🐕 ${park.dogs_there.length} dogs there now</div>
          <div style="font-size:12px;color:#94a3b8;margin-bottom:10px">📅 ${park.dogs_going.length} dogs coming</div>
          <div style="
            display:inline-block;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
            background:${park.user_going ? theme.accent : theme.surfaceUp};
            color:${park.user_going ? "#000" : theme.textSub};
            border:1px solid ${park.user_going ? "transparent" : theme.border};
          ">${park.user_going ? "✓ Going" : "Join"}</div>
        </div>
      `);

      marker.on("click", () => {
        setSelectedPark((prev) => (prev === park.park_id ? null : park.park_id));
      });

      markersRef.current[park.park_id] = marker;
    });

    leafletMap.current = map;
  }, [leafletReady]);

  // Pan map when selection changes from the list
  useEffect(() => {
    if (!leafletMap.current || selectedPark === null) return;
    const park = parkList.find((p) => p.park_id === selectedPark);
    if (!park) return;
    leafletMap.current.flyTo([park.lat, park.lng], 15, { duration: 0.8 });
    markersRef.current[park.park_id]?.openPopup();
  }, [selectedPark]);

  const toggle = (id: number): void =>
    setSelectedPark((prev) => (prev === id ? null : id));

  const toggleGoing = (e: MouseEvent<HTMLButtonElement>, id: number): void => {
    e.stopPropagation();
    setParkList((prev) =>
      prev.map((p) => (p.park_id === id ? { ...p, user_going: !p.user_going } : p))
    );
    if (leafletMap.current && window.L) {
      const park = parkList.find((p) => p.park_id === id);
      if (!park) return;
      const nowGoing = !park.user_going;
      const color = nowGoing ? theme.accent : theme.surfaceUp;
      const border = nowGoing ? "#000" : theme.border;
      markersRef.current[id]?.setIcon(makePinIcon(window.L, color, border));
    }
  };

  const filtered: ParkLocation[] = parkList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={mapStyle.root}>
      {/* Search */}
      <div style={mapStyle.searchWrap}>
        <div style={mapStyle.searchBar}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <input
            style={mapStyle.searchInput}
            placeholder="Search parks near you..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Leaflet Map */}
      <div style={mapStyle.mapWrap}>
        <div ref={mapRef} style={mapStyle.mapNode} />

        {/* Legend */}
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

      {/* Park list */}
      <div style={mapStyle.list}>
        {filtered.map((park: ParkLocation) => {
          const selected = selectedPark === park.park_id;
          return (
            <div
              key={park.park_id}
              style={mapStyle.parkRow(selected)}
              onClick={() => toggle(park.park_id)}
            >
              <div style={mapStyle.parkIcon(park.user_going)}>🌳</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={mapStyle.parkName}>{park.name}</div>
                <div style={mapStyle.parkSub}>{park.dogs_there.length} dogs currently there</div>
                <div style={mapStyle.parkSub}>{park.dogs_going.length} dogs will be there</div>
              </div>
              <button
                style={mapStyle.badge(park.user_going)}
                onClick={(e) => toggleGoing(e, park.park_id)}
              >
                {park.user_going ? "Going" : "Join"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}