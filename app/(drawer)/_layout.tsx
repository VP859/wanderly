import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';


const CustomDrawerComponent = (props: DrawerContentComponentProps) => {
    const pathname = usePathname();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                icon={({ color, size }) => (
                    <FontAwesome5 name="map-marked-alt" size={34} color={pathname === '/book' ?'white':'black'} />
                )}
                style={{backgroundColor:pathname === '/book' ? 'black':'white',borderRadius:8,marginBottom: 8,marginTop:40}}
                label={'Booking'}
                labelStyle={[styles.navItemLabel,
                    {color:pathname === '/book' ? 'white' : 'black'}
                ]}
                onPress={() => {
                    router.push('/(drawer)/book');
                }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <FontAwesome name="hotel" size={34} color={pathname =='/fav_places'?"white":"black"} />
                )}
                style={{backgroundColor:pathname === '/fav_places' ? 'black':'white',borderRadius:8,marginBottom: 8}}
                label={'Your places'}
                labelStyle={[styles.navItemLabel,
                    {color:pathname === '/fav_places' ? 'white' : 'black'}
                ]}
                onPress={() => {
                    router.push('/(drawer)/fav_places');
                }}
            />
        </DrawerContentScrollView>
    );
};

export default function Layout(){
    return(
        <Drawer drawerContent={(props)=><CustomDrawerComponent{...props}/>}/>
    )
}

const styles=StyleSheet.create({
    navItemLabel:{fontSize:20,fontWeight:'500',marginLeft:16,borderRadius:8}
})