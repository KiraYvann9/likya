import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'

import {sidebarItems} from './sidebarItems'
import { useRouter , Link, usePathname} from 'expo-router'
import ProfilComponent from '../profil/ProfilComponent'
import { useUserStore } from '@/stores/useStore'

const SidebarComponent = () => {

  const {user} = useUserStore(s => s.user)

  const router = useRouter()
  const pathname = usePathname()

  return (
    <View style={style.sidebar}>
      <Image source={require('@/assets/logo-white.svg')} style={style.image} width={100}/>
      <View style={style.items}>
        {
          sidebarItems.filter((item)=>item.permission?.includes(user.role.slug)).map((item, index) => {
            return (
              <Pressable onPress={()=>router.push(item.link)} key={index}>
                <Text style={[style.item, pathname===item.link &&{backgroundColor: 'rgba(24, 147, 127, .7)', borderColor: "#18937F"}]}> <item.icon/> {item.title}</Text>
              </Pressable>
              )
            })
        }
      </View>
      <ProfilComponent/>
    </View>
  )
}

export default SidebarComponent;

const style = StyleSheet.create({
  sidebar: {
    display:  'flex',
    flexDirection:  'column',
    justifyContent:   'center',
    alignItems:      'center',
    padding:   10,
    width:  '15%',
    height: '100%',
    backgroundColor: '#164B74',
    gap:   100,

  },
  items: {
    gap:   10,
    width:   '100%',

  },
  item:  {
    display: "flex",
    flexDirection:  "row",
    alignItems: "center",
    width:  "100%",
    gap:  10,
    color:  "#fff",
    padding: 10,
    borderStyle:   "solid",
    borderWidth:   0.3,
    borderColor:   "#fff",
    borderRadius:   10,
  },

  image:{
    width:   150,
    resizeMode:   'contain',
  }

})