import { View, Text, StyleSheet } from 'react-native'
import { Slot, Stack } from 'expo-router'
import React from 'react'
import SidebarComponent from '@/components/sidebar/SidebarComponent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {MenuProvider} from 'react-native-popup-menu'


// const queryClient =  new QueryClient();

const Layout = () => {
  return (
    // <QueryClientProvider client={queryClient}>
    <MenuProvider>
      <View style={style.container}>
        <SidebarComponent/>
        <View  style={style.main}>
          <Stack>
            {/* <Slot/> */}
            <Stack.Screen name='dashboard/index' options={{headerTitle: 'Dashboard'}}/>
            <Stack.Screen name='history/index' options={{headerTitle: 'Historique'}}/>
            <Stack.Screen name='home/index' options={{headerTitle: 'Accueil'}}/>
            <Stack.Screen name='invoices/index' options={{headerTitle: 'Factures'}}/>

            <Stack.Screen name='profil/index' options={{headerTitle: 'Mon Profil'}}/>
            <Stack.Screen name='qrcode/index' options={{headerTitle: 'QR-Code'}}/>
            <Stack.Screen name='profil/update/index' options={{headerTitle: 'Mettre à jour mon profil', 
              presentation: 'transparentModal', animation:'fade', headerShown:false}}/>

            <Stack.Screen name='settings/index' options={{headerTitle: 'Paramètres'}}/>

            <Stack.Screen name='settings/create/index' options={{headerTitle: 'Créer un compte',
              presentation: 'transparentModal', animation:'fade', headerShown:false}}/>

            <Stack.Screen name='settings/permissions/index' options={{headerTitle: 'Gérer les rôle et permissions',
              presentation: 'transparentModal', animation:'fade', headerShown:false}}/>
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
    backgroundColor: '#fff',
  },
  main:{
    width:  '85%',
    height: '100%',
    backgroundColor: '#fafafa',
    // padding:  20,
  }
})