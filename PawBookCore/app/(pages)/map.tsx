import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { theme } from "../styles/theme";
import { shared, mapStyles } from "../styles/styles";
import { parks } from "../test_items/test_data";

export default function MapPage() {
  const [selectedPark, setSelectedPark] = useState<number | null>(null);

  const toggle = (id: number) => setSelectedPark((p) => (p === id ? null : id));

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Search */}
      <View style={{ padding: 14 }}>
        <View style={shared.searchBar}>
          <Text style={{ fontSize: 16 }}>🔍</Text>
          <Text style={shared.searchPlaceholder}>Search parks near you...</Text>
        </View>
      </View>

      {/* Map canvas */}
      <View style={mapStyles.canvas}>
        {/* Grid lines (horizontal) */}
        {[...Array(7)].map((_, i) => (
          <View
            key={`h${i}`}
            style={{
              position: "absolute", left: 0, right: 0,
              top: `${(i + 1) * 12.5}%`, height: 1,
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          />
        ))}
        {/* Grid lines (vertical) */}
        {[...Array(7)].map((_, i) => (
          <View
            key={`v${i}`}
            style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${(i + 1) * 12.5}%`, width: 1,
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          />
        ))}

        {/* Park pins */}
        {parks.map((park) => {
          const isSelected = selectedPark === park.park_id;
          const bg = park.user_going ? theme.accent : isSelected ? theme.blue : theme.surfaceUp;
          return (
            <TouchableOpacity
              key={park.park_id}
              onPress={() => toggle(park.park_id)}
              style={{
                position: "absolute",
                left: `${park.x}%` as any,
                top: `${park.y}%` as any,
                transform: [{ translateX: -16 }, { translateY: -32 }],
              }}
              activeOpacity={0.8}
            >
              <View style={{
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: bg,
                borderWidth: 2, borderColor: park.user_going ? "#000" : theme.border,
                alignItems: "center", justifyContent: "center",
              }}>
                <Text style={{ fontSize: 14 }}>🐾</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* User dot */}
        <View style={{ position: "absolute", left: "48%", top: "48%" as any }}>
          <View style={mapStyles.userDot} />
        </View>

        {/* Legend */}
        <View style={mapStyles.legend}>
          <View style={mapStyles.legendRow}>
            <View style={[mapStyles.legendDot, { backgroundColor: theme.accent }]} />
            <Text style={mapStyles.legendText}>You're going</Text>
          </View>
          <View style={mapStyles.legendRow}>
            <View style={[mapStyles.legendDot, { backgroundColor: theme.surfaceUp, borderWidth: 1, borderColor: theme.border }]} />
            <Text style={mapStyles.legendText}>Available</Text>
          </View>
        </View>
      </View>

      {/* Park list */}
      <ScrollView style={mapStyles.parkList} showsVerticalScrollIndicator={false}>
        {parks.map((park) => (
          <TouchableOpacity
            key={park.park_id}
            style={[
              mapStyles.parkMapRow,
              selectedPark === park.park_id && {
                backgroundColor: theme.blueSoft,
                borderColor: theme.blue + "66",
              },
            ]}
            onPress={() => toggle(park.park_id)}
            activeOpacity={0.8}
          >
            <View style={[
              shared.parkRowIcon,
              {
                backgroundColor: park.user_going ? theme.accentSoft : theme.surfaceUp,
                borderWidth: 1,
                borderColor: park.user_going ? theme.accent + "44" : theme.border,
              },
            ]}>
              <Text style={{ fontSize: 20 }}>🌳</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={shared.parkRowName}>{park.name}</Text>
              <Text style={shared.parkRowSub}>{park.dogs_going} dogs</Text>
            </View>
            <View style={{
              paddingHorizontal: 10, paddingVertical: 5,
              borderRadius: 20,
              backgroundColor: park.user_going ? theme.accent : theme.surfaceUp,
              borderWidth: 1,
              borderColor: park.user_going ? "transparent" : theme.border,
            }}>
              <Text style={{ fontSize: 11, fontWeight: "600", color: park.user_going ? "#000" : theme.muted }}>
                {park.user_going ? "Going" : "Join"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
