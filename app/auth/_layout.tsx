import { View, Text, StyleSheet, Image } from 'react-native'
import { Slot, Stack } from 'expo-router'
import React from 'react'
import SidebarComponent from '@/components/sidebar/SidebarComponent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {MenuProvider} from 'react-native-popup-menu'

const logo = require("../../assets/logo-white.svg")

const Layout = () => {
  return (
    // <QueryClientProvider client={queryClient}>
    <MenuProvider>
      <View style={style.container}>

        <View style={style.info}>
          <Image source={logo} style={style.logo} />
        </View>
        
        <View  style={style.main}>
          <Stack>
            {/* <Slot/> */}
            <Stack.Screen name='register/index' options={{headerShown:false, presentation: 'card'}}/>
            <Stack.Screen name='verify/index' options={{headerShown:false}}/>
            
            {/* <Stack.Screen name='settings/create/index' options={{headerTitle: 'Créer un compte', 
              presentation: 'transparentModal', animation:'fade', headerShown:false}}/> */}
          </Stack>
        </View>
      </View>
    </MenuProvider>

    // </QueryClientProvider>
  )
}

export default Layout;

const style = StyleSheet.create({
  container: {
    display:  'flex',
    flexDirection:  'row',
    width:  '100%',
    height: '100%',
    backgroundColor : '#164B74',
    alignItems: 'center',
    justifyContent: 'center'
  },
  info:{
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo:{
    width: 200,
    height:  78,
    resizeMode:  'contain',
  },
  main:{
    width:  '50%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    // padding:  20,
  }
})