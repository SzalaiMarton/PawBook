import { ParkLocation } from "../backend/types";
import { mapStyle } from "../styles/styles";
import { MouseEvent } from "react";
import theme from "../styles/theme";
import { makePinIcon } from "../(pages)/scripts/map_scripts";
import {Map as LeafletMap, Marker} from "leaflet"

type Props = {
    parkList: ParkLocation[];
    search: string;
    selectedPark: number | null;
    setSelectedPark: React.Dispatch<React.SetStateAction<number | null>>,
    setParkList: React.Dispatch<React.SetStateAction<ParkLocation[]>>;
    leafletMap: React.RefObject<LeafletMap | null>;
    markersRef: React.RefObject<Record<number, Marker<any>>>,
}

function ParkList(props: Props) {
    const toggle = (id: number): void => props.setSelectedPark((prev) => (prev === id ? null : id));

    const toggleGoing = (e: MouseEvent<HTMLButtonElement>, id: number): void => {
        e.stopPropagation();
        props.setParkList((prev) =>
        prev.map((p) => (p.park_id === id ? { ...p, user_going: !p.user_going } : p))
        );
        if (props.leafletMap.current && window.L) {
        const park = props.parkList.find((p) => p.park_id === id);
        if (!park) return;
        const nowGoing = !park.user_going;
        const color = nowGoing ? theme.accent : theme.surfaceUp;
        const border = nowGoing ? "#000" : theme.border;
        props.markersRef.current[id]?.setIcon(makePinIcon(window.L, color, border));
        }
    };

    const filtered: ParkLocation[] = props.parkList.filter((p) =>
        p.name.toLowerCase().includes(props.search.toLowerCase())
    );
    return (
        <div style={mapStyle.list}>
        {filtered.map((park: ParkLocation) => {
          const selected = props.selectedPark === park.park_id;
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
    );
}

export default ParkList;