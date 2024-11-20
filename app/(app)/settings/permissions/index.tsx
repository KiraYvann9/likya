import { zodResolver } from '@hookform/resolvers/zod';
import { router, useRouter } from 'expo-router';
import {ArrowDown, ChevronDown, CircleAlert, CircleX} from 'lucide-react-native';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {View, Text, Pressable, StyleSheet, TextInput, TouchableOpacity, FlatList, Button, Switch} from 'react-native'
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { TypeOf, z } from 'zod';

import {Picker} from '@react-native-picker/picker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchData, postData } from '@/services/services'
import { ToastMessage } from '@/services/toast';
import CustomRadio from "@/components/CustomRadio/CustomRadio";

const getRoles = async()=>{
  const req = await fetchData('/roles')
  return req.items
}

const getPermissions = async()=>{
  const req = await fetchData('/permissions')
  return req
}

const adressTyoe = z.object({
  address: z.string()
})

const schema = z.object({
  name: z.string({message: ''}).min(2),
  description: z.string({message: ''}).min(2).optional(),

})

interface RoleType {
  // id: number,
  name: string,
  description: string
}


const index = () => {
  const [currentAccordionIndex, setCurrentAccordionIndex] = useState<number|null>()
  const queryClient = useQueryClient()

  const [checkedRole, setCheckedRole] = useState<string>()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const [selectedRoleDetail, setSelectedRoleDetail] = useState<any | undefined>()

  const {data: roles, isLoading, isError} = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  })

  const {data: permissions, isLoading: isPermissionsLoading, isError: isPermissionsError} = useQuery({
    queryKey: ['permissions'],
    queryFn: getPermissions,
  })


  const createRole = async (data: z.infer<typeof schema>) =>{
    const req = await postData('/roles', data)
    return req.data
  }




  const mutation = useMutation({
    mutationKey: ['roles'],
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['roles']})
      new ToastMessage('Role Ajouté avec succès ! ').successToast()
      form.reset()
    },
    onError:(err) =>{ console.log('Role Error :', err);
      new ToastMessage(err?.message).errorToast()
    }
  })

  const  onSubmit = async(data: any) => {
    mutation.mutate(data)
    console.log('New Role :', data)
  }

  console.log('Role :', selectedRoleDetail)

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000040',
      }}
    >
      <Animated.View
        entering={SlideInDown}
        style={{
          width: '90%',
          height: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
          position:  'relative',
          overflow: 'hidden'

        }}
      >

        <View  style={styles.container}>

          <View style={styles.header}>

            <Text style={styles.headerTitle}>Rôle et Permissions</Text>

            <Pressable onPress={() => router.push("/settings")} >
              <CircleX  size={24} />
            </Pressable>
          </View>

          <View  style={styles.main}>

            <View style={[styles.section, {paddingRight: 10}]}>
              <Text style={{fontSize: 22, fontWeight: "600"}}>Roles</Text>
              <View style={styles.formGroup}>
                <View style={{display:  'flex', flexDirection: 'column', gap:  10, width: '100%'}}>

                  <View style={{width: '100%', display:  'flex', flexDirection: 'column', gap:  10,}}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Role <Text style={{color: 'red'}}>*</Text></Text>
                      <TextInput style={styles.input} placeholder='' onChangeText={data => form.setValue('name', data)}/>
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Description <Text style={{color: 'red'}}>*</Text></Text>
                      <TextInput multiline={true} numberOfLines={4} style={[styles.textarea]} placeholder='' onChangeText={data => form.setValue('description', data)}/>
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Button title={'Ajouter le role'} color={"#4d4d4d"} onPress={form.handleSubmit(onSubmit)}/>
                  </View>

                </View>

                <View style={{display:  'flex', flexDirection: 'row', gap:  10, alignItems: 'center', marginTop: 20}}>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Selectionnez le role <Text style={{color: 'red'}}>*</Text> (<Text style={{fontSize: 12, color: '#4d4d4d'}}>Sélectionnez un rôle afin de lui assigner des permissions</Text>)</Text>
                    <CustomRadio setSelectedRoleDetail={setSelectedRoleDetail} options={roles || []} checkedValue={checkedRole} onChange={setCheckedRole}/>
                  </View>

                </View>


                {/* <TextInput multiline={true} numberOfLines={5} style={styles.textarea} placeholder='Description'/> */}

              </View>
            </View>

            <View style={[styles.section, {paddingLeft: 10, borderLeftWidth: .3, borderLeftColor: '#4d4d4d'}]}>
              <Text style={{fontSize: 22, fontWeight: "600", marginBottom: 20}}>Permission (<Text style={{fontSize: 14, color: '#4d4d4d'}}>Activez ou désactivez des permissions</Text>)</Text>

              <View style={{display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 15}}>
                {
                  permissions && permissions.map((permission: any, index: number)=>(
                      <View style={{display: 'flex', flexDirection: 'column'}} key={index}>
                        <TouchableOpacity
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              gap: 10,
                              padding: 10,
                              backgroundColor: '#164B74',
                              borderRadius: 5
                          }}
                        onPress={() => setCurrentAccordionIndex(index === currentAccordionIndex ? null : index)}>
                          <Text style={{fontSize: 16, fontWeight: '500', color: '#fff'}}>{permission?.title?.fr}</Text>
                          <ChevronDown size={20} color={'#fff'}/>
                        </TouchableOpacity>
                        {

                          index === currentAccordionIndex &&
                          <View style={{backgroundColor: '#f6f6f6', padding: 10}}>
                            {permission?.permissions?.map((item: any, index: number)=> {

                              selectedRoleDetail && selectedRoleDetail[0]?.permissions.map( (permission: any) => {

                                    let active = permission.code == item.code
                                    console.log('Active :', active)
                              })


                              return(
                                  <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 10,
                                    alignItems: 'center',
                                    padding: 5
                                  }} key={index}>
                                    <Switch
                                        trackColor={{false: '#767577', true: '#81b0ff'}}
                                        thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={(value) => {
                                          const action = value === true ? 'activate' : 'deactivate'
                                          //onStatusChange(item?._id, action)
                                        }}
                                        //value={''}
                                    />
                                    <Text>{item?.desc?.fr}</Text>
                                  </View>
                              )
                                }
                            )}
                          </View>

                        }

                      </View>

                    ))
                }
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.btn} onPress={form.handleSubmit(onSubmit)} disabled={mutation.isPending}>
              <Text style={{textAlign: 'center', color: "#fff", fontSize:26}}>Enregistrer</Text>
          </TouchableOpacity>


        </View>

      </Animated.View>

    </Animated.View>
  )
}

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:  '100%',
    height:   '100%',
    overflow:  'hidden',
    paddingBottom: 20,
    display: 'flex',
    flexDirection: "column",
    //alignItems: "center"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:  '100%',
    paddingVertical:   10,
    paddingHorizontal: 20,
    backgroundColor:  '#164B74',
    
    
  },
  headerTitle:{
    color:   '#fff',
    fontSize:   24,
    fontWeight: 'bold',
  },
  main:{
    flex: 1,
    width:  '100%',
    padding:  40,
    display: 'flex',
    flexDirection: "row",
    gap: 4
  },
  closeButton : {
    position: 'absolute',
    top: 10, 
    right: 10,
  },
  formGroup:{
    width: '100%',
    gap:  10,

  },
  label:{
    fontSize: 14,
    marginBottom: 2
  },
  inputGroup:{
    flex: 1,
  },
  section: {
    width: '50%'
  },
  input:{
      width: '100%',
      height: 40,
      borderStyle:  'solid',
      borderColor: '#1C8973',
      borderWidth:  1,
      borderRadius:   5,
      fontSize:   18,
      paddingLeft:   10,
      // outline:   'none',
  },


  textarea:{
    width: '100%',
    borderStyle:  'solid',
    borderColor: '#1C8973',
    borderWidth:  .5,
    borderRadius:   5,
    fontSize:   14,
    padding:   10,
  },
  error:{
    fontSize: 12,
    color: 'red'
  },
  btn: {
      width: '40%',
      padding:  10,
      backgroundColor:   '#1C8973',
      color:   '#fff',
      marginLeft: 20
  },
  roleDescription: {
    width:  '100%',
    padding: 10,

    borderStyle: 'dashed',
    borderWidth: .5,
    borderColor: '#cfcfcf'

  }
})