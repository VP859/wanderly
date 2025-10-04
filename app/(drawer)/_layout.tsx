import { places } from "@/constans";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { router, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

const CustomDrawerComponent = (props: DrawerContentComponentProps) => {
  const pathname = usePathname();
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome5
            name="map-marked-alt"
            size={34}
            color={pathname === "/Booking" ? "white" : "black"}
          />
        )}
        style={{
          backgroundColor: pathname === "/Booking" ? "black" : "white",
          borderRadius: 8,
          marginBottom: 8,
          marginTop: 40,
        }}
        label={"Booking"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/Booking" ? "white" : "black" },
        ]}
        onPress={() => {
          router.push("/(drawer)/Booking");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome
            name="hotel"
            size={34}
            color={pathname == "/fav_places" ? "white" : "black"}
          />
        )}
        style={{
          backgroundColor: pathname === "/fav_places" ? "black" : "white",
          borderRadius: 8,
          marginBottom: 8,
        }}
        label={"Your places"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/fav_places" ? "white" : "black" },
        ]}
        onPress={() => {
          router.push("/(drawer)/fav_places");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <AntDesign
            name="wechat-work"
            size={34}
            color={pathname == "/chat" ? "white" : "black"}
          />
        )}
        style={{
          backgroundColor: pathname === "/chat" ? "black" : "white",
          borderRadius: 8,
          marginBottom: 8,
        }}
        label={"Chat"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/Chat" ? "white" : "black" },
        ]}
        onPress={() => {
          router.push("/(drawer)/chat");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome5 name="tasks" size={24} color="black" />
        )}
        style={{
          backgroundColor: pathname === "/packaging" ? "black" : "white",
          borderRadius: 8,
          marginBottom: 8,
        }}
        label={"Packaging"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/packaging" ? "white" : "black" },
        ]}
        onPress={() => {
          router.push("/(drawer)/packaging");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="weather-cloudy" size={24} color="black" />
        )}
        style={{
          backgroundColor: pathname === "/weather" ? "black" : "white",
          borderRadius: 8,
          marginBottom: 8,
        }}
        label={"Weather"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/weather" ? "white" : "black" },
        ]}
        onPress={() => {
          router.push("/(drawer)/weather");
        }}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  const navigation = useNavigation();
  const pathname = usePathname();
  const [path, setPath] = useState<string | undefined>(undefined);
  useEffect(() => {
    setPath(
      pathname === "/Booking"
        ? "Booking"
        : pathname === "/fav_places"
        ? "Your places"
        : places.find(
            (place) =>
              place.name.toLowerCase() === pathname.split("/").pop()
          )?.name
    );
  }, [pathname]);
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitle: path ,
      }}
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
    />
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 16,
    borderRadius: 8,
  },
});
