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
        <Text>Profil</Text>
          <View style={styles.container}>
            <View style={styles.picture}>
              <Text></Text>
            </View>

            <View>
              <Text>Flavien DevOps</Text>
              <Text>Super administrateur</Text>
            </View>

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
  },

  container:{
    width: '100%',
    height: '100%'
  },

  picture:{
    width: 150,
    height: 150,
    borderStyle: 'solid',
    borderWidth: .5,
    borderColor: '#cfcfcf',
    backgroundColor: '#1c1c1c',
    borderRadius: '100%',
    overflow: 'hidden'

  }
})