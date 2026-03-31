import { useEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getProfileById } from "../backend/helper_functions";
import { overlayStyles } from "../styles/styles";
import { currentUser } from "../test_items/test_data";
import MenuList from "./menu_items";
import ProfilePicture from "./profile_picture";

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

  const currUser = getProfileById(currentUser);

  return (
    <Modal 
    transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <TouchableOpacity style={overlayStyles.backdrop} onPress={onClose} activeOpacity={1} />
        <Animated.View style={[overlayStyles.menuPanel, { transform: [{ translateX: slideX }] }]}>
          
          {/* Profile */}
          <View style={overlayStyles.menuProfileCard}>
            <ProfilePicture profileId={currentUser}/>
            <View>
              <Text style={overlayStyles.menuProfileName}>{currUser.dog.dog_name}</Text>
              <Text style={overlayStyles.menuProfileSub}>with {currUser.owner_name}</Text>
            </View>
          </View>
          
          <MenuList/>

          <Text style={overlayStyles.menuFooter}>PawPlan v1.0.0 · Made with 🐾</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default MenuOverlay;