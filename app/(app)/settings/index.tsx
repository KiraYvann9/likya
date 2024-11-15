import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'

import { globalStyle } from '@/styles/globa'
import { History, RefreshCcwDot, UserPlus } from 'lucide-react-native'
import { useRouter } from 'expo-router'


import { DataTable } from '@/components/table/data-table'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '@/services/services'


const index = () => {

  const getUsers = async() =>{
    const req = await fetchData('/users')
    return req.items
  }

  const {data: users, isLoading, isError} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  

  const router = useRouter()
  return (
    <View style={globalStyle.container}>

      <View style={[globalStyle.main]}>

        <View style={styles.cardContainer}>

          <Pressable  style={[styles.card, { backgroundColor: '#F36F21',}]} onPress={()=>router.push('/settings/create')}>
            <Text style={styles.text}><UserPlus/> Créer un compte</Text>
          </Pressable>
          
          <View  style={[styles.card, { backgroundColor: '#9656FC',}]}>
            <Text style={styles.text}><History/>Historique</Text>
          </View>
          <View  style={[styles.card, { backgroundColor: '#18937F',}]}>
            <Text style={styles.text}><RefreshCcwDot/> Rembourssement</Text>
          </View>

        </View>

        <View style={styles.tableContainer}>
          <DataTable  data={users} />
        </View>

      </View>
    </View>
  )
}

export default index;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    gap:  10,
  },
  card:{
    width: 250,
    height: 100,
    borderRadius: 10,
    borderStyle:  'solid',
    justifyContent:  'center',
    alignItems:  'center',
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity:   0.25,
    shadowRadius:  4,
  },
  text: {
    fontSize:  18,
    display:   'flex',
    flexDirection:   'row',
    justifyContent:  'center',
    alignItems:   'center',
    fontWeight:   'bold',
    color:   '#fff',
    gap:   5,
  },
  tableContainer: {
    width: '100%',
    height: 'auto',
    marginTop:  50,
    borderStyle: 'solid',
    borderWidth: .5,
    borderColor: '#cfcfcf',
    padding:   10,
    borderRadius: 5


  }
})