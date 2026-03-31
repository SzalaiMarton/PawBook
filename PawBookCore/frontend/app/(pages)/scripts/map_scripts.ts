import { ParkLocation } from "@/app/backend/models";
import theme from "@/app/styles/theme";
import { DivIcon } from "leaflet";
import { useEffect } from "react";

export function makePinIcon(L: typeof import("leaflet"), color: string, borderColor: string): DivIcon {
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

export function useLeafletCSS(): void {
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

export function createMapPopUp(park: ParkLocation) {
    return (
        `
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
      `
    );
}