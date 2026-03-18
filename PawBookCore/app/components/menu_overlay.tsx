import { useRef, useEffect, useState } from "react";
import { Animated, Modal, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { overlayStyles } from "../styles/styles";
import MenuList from "./menu_items";

function MenuOverlay({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const slideX = useRef(new Animated.Value(-300)).current;
	const [isMounted, setMounted] = useState(visible);

  useEffect(() => {
		if (visible) {
			setMounted(true);
			Animated.spring(slideX, {
				toValue: 0,
				useNativeDriver: true,
				tension: 80, 
				friction: 12,
			}).start();
		} else {
			Animated.spring(slideX, {
				toValue: -300,
				useNativeDriver: true,
				tension: 80, 
				friction: 12,
			}).start(() => {
				setMounted(false);
			});
		}
  }, [visible]);

  if (!isMounted) return null;

  return (
    <Modal 
    transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <TouchableOpacity style={overlayStyles.backdrop} onPress={onClose} activeOpacity={1} />
        <Animated.View style={[overlayStyles.menuPanel, { transform: [{ translateX: slideX }] }]}>
          
          {/* Profile */}
          <View style={overlayStyles.menuProfileCard}>
            <View style={overlayStyles.menuProfileAvatar}>
              <Text style={{ fontSize: 24 }}>🐾</Text>
            </View>
            <View>
              <Text style={overlayStyles.menuProfileName}>Alex Johnson</Text>
              <Text style={overlayStyles.menuProfileSub}>with Buddy 🐶</Text>
            </View>
          </View>
          
          {/* Items */}
          <MenuList/>

          <Text style={overlayStyles.menuFooter}>PawPlan v1.0.0 · Made with 🐾</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default MenuOverlay;