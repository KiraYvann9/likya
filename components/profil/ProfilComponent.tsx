import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { ExternalLink, LogOut } from 'lucide-react-native'
import React from 'react'

import { useRouter } from 'expo-router'
import { useUserStore } from '@/stores/useStore'
import { useMutation, useQuery } from '@tanstack/react-query'

const ProfilComponent = () => {

  const {  user, logOut } = useUserStore()

  console.log('USER DATA :', user);


    const router = useRouter()
  return (
    <View  style={styles.profileCard}>
      <Image source={require('@/assets/img/wave.jpg')} style={styles.image} />
      <Text style={styles.name}>{user.user.fullname}</Text>
      <Text>{user.user.role.name}</Text>
      <hr />

      <View  style={{gap: 10, width:  '100%', alignItems: 'center'}}>
        <Text style={styles.showProfil}><ExternalLink/> Mon profil</Text>
        <Pressable onPress={logOut}>
            <Text style={styles.logOut}> <LogOut/> Se déconnecter</Text>
        </Pressable>
      </View>
      <hr />
    </View>
  )
}

export default ProfilComponent;

const styles = StyleSheet.create({
    profileCard:  {
        padding: 10,
        width: '100%',
        backgroundColor:  '#fff',
        borderRadius: 10,
        borderStyle:  'solid',
        borderWidth:  1,
        justifyContent:   'center',
        alignItems:   'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    showProfil: {
        fontSize: 15,
        display:  'flex',
        alignItems:  'center',
        gap:   10,

    },
    logOut: {
        fontSize: 15,
        display:  'flex',
        alignItems:  'center',
        gap:   10,
        color: "#F22A2D"
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 100   
    }

})
