import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { overlayStyles } from "../styles/styles";
import { menuItems } from "../styles/theme";

function MenuList() {
  return (
    <>
      {menuItems.map((item, i) => (
        <View key={item.label}>
          {i === 6 && <View style={overlayStyles.menuDivider} />}
          <TouchableOpacity style={overlayStyles.menuItem} activeOpacity={0.7}>
            <Text style={{ fontSize: 18 }}>{item.icon}</Text>
            <Text style={i === 6 ? overlayStyles.menuItemDanger : overlayStyles.menuItemText}>
              {item.label}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

export default MenuList;