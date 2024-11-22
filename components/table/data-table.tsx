import { View, Text, StyleSheet, Switch, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ellipsis } from 'lucide-react-native'

import {Menu, MenuProvider, MenuTrigger, MenuOptions, MenuOption, } from 'react-native-popup-menu'
import alert from '@/services/alert'
import {changeStatus, deleData} from '@/services/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastMessage } from '@/services/toast'
import id from "ajv/lib/vocabularies/core/id";
import {useUserUpdate} from "@/stores/useUserUpdateStore";
import {router} from "expo-router";
type userType = {
  fullname: string,
  role: string,
  email: string,
  phonenumber:  string,
}

// interface TableType {
//     data: userType[],
// }


export const DataTable = ({data}: {data:userType[]}) => {

  const {setISEdit, setIsShow} = useUserUpdate()

  const queryClient = useQueryClient()

  const deletUser = async(id: string) =>{
    console.log('User ID :', id)
    const response = await deleData(`/users/${id}`)
    return response.data
  }

  const activeUserToggle = async({id, action}:{id: string, action: string}) =>{
    const response = await changeStatus(`/users/${id}/activate?action=${action}`)
    return response.data
  }

  
  const changeStatusMutation = useMutation({
    mutationFn: activeUserToggle,
    onSuccess: ()=>{
      console.log('Delete Success')
      new ToastMessage('Status mise à jour avec succès !').successToast()
      queryClient.invalidateQueries({queryKey: ['users']})
    },
    onError: ()=>{
      new ToastMessage('Oups! Quelque chose s\'est mal passé').errorToast()
    }
  })

  const onStatusChange = (id: string, action: string) =>{
    changeStatusMutation.mutate({id, action})
  }

  return (
    <View style={styles.tbContainer}>
      <View style={styles.tbHeader}>
        <View style={{width: '5%'}}>
          <Text style={styles.tbHeaderText}>ID</Text>
        </View>
        <View style={{width: '25%'}}>
          <Text style={styles.tbHeaderText}>Name et Prénoms</Text>
        </View>
        <View style={{width: '20%'}}>
          <Text style={styles.tbHeaderText}>N° Téléphone</Text>
        </View>
        <View style={{width: '30%'}}>
          <Text style={styles.tbHeaderText}>E-mail</Text>
        </View>
        <View style={{width: '10%'}}>
          <Text style={styles.tbHeaderText}>Status</Text>
        </View>
        <View style={{width: '10%', }}>
          <Text style={[styles.tbHeaderText, {textAlign: 'center'}]}>Action</Text>
        </View>
      </View>
      {/* Tbody */}
      <View>
        {data && data.map((item: any, index:  number) => (
          <View key={index} style={styles.tbRow}>
            <View style={{width: '5%', paddingLeft: 5}}>{index+1}</View>
            <View style={{width: '25%'}}><Text>{item.fullname}</Text></View>
            <View style={{width: '20%'}}><Text>{item.phonenumber}</Text></View>
            <View style={{width: '30%'}}><Text>{item.email}</Text></View>
            <View style={{width: '10%'}}>

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={item?.is_active ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value)=> {
                  const action = value === true ? 'activate' : 'deactivate'
                  onStatusChange(item?._id, action)
                }}
                value={item?.is_active}
              />

            </View>

            <View style={{width: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <Menu>
                <MenuTrigger style={{zIndex: 1000, overflow: 'visible'}}>
                  <Ellipsis  size={16} color={'#4D4D4D'} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuOption}>
                  <MenuOption onSelect={()=> {
                    setIsShow(item)
                    router.push("/settings/create")
                  }}><Text>Détail</Text></MenuOption>
                  <MenuOption onSelect={()=> {
                    setISEdit(item)
                    router.push("/settings/create")
                  }}><Text>Editer</Text></MenuOption>
                </MenuOptions>
              </Menu>
                
              </View>

          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tbContainer: {
      width: '100%',
      height: '100%'

  },
  tbHeader: {
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    borderStyle: 'solid',
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: .3,
    paddingVertical: 15
  },
  tbHeaderText: {
    fontWeight: '700',
  },
  tbBody: {
    width:  '100%',

  },
  
  tbRow: {
    display: 'flex',
    flexDirection:  'row',
    justifyContent:  'space-between',
    alignItems:  'center',
    paddingVertical: 10,
    borderStyle: 'solid',
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: .3,
    width:   '100%',
    overflow:  'visible',
  },
  menuOption: {
    backgroundColor: '#fafafa',
    borderRadius:  10,
    padding:  10,
    width:   150,

  }
})