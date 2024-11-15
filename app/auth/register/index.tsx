import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { CircleAlert, CircleX } from 'lucide-react-native';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { View, Text, Pressable, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { TypeOf, z } from 'zod';

import {Picker} from '@react-native-picker/picker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchData, postData } from '@/services/services'
import { ToastMessage } from '@/services/toast';
import axios from 'axios';
import { useRegistrationStore } from '@/stores/useRegistrationStore';
import { baseUrl } from '@/stores/useStore';


const getRoles = async()=>{
  const req = await fetchData('/roles')
  return req.items
}


const schema = z.object({
  // fullname: z.string({message: ''}).min(2),
  phonenumber: z.string({message: ''}).min(2),
  // email: z.string({message: ''}),
  password: z.string({message: ''}).min(2,  {message: 'le mot de passe doit contenir au moins  8 caracteres'}),
  role: z.string({message: ''}),
})

interface RoleType {
  // id: number,
  name: string,
  description: string
}

// export const ListeItem = ({name, description}:  RoleType) => (
//   <View> <Text>{name}</Text> : <Text>{description}</Text></View>
// );

const index = () => {

  const addPhoneNumber = useRegistrationStore(s => s.addPhoneNumber)
  const queryClient = useQueryClient()

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      // fullname: '',
      // email: '',
      phonenumber: '',
      password: '',
      role: '',
      },
  })

  const [selectedRole, setSelectedRole] = useState<any>()

  const {data: roles, isLoading, isError} = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  })

  const createUser = async (data: z.infer<typeof schema>) =>{
    const req = await axios.post(`${baseUrl}/signup`, data)
    return req.data
  }

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']})
      new ToastMessage('Ajouter avec succès ').successToast()

      addPhoneNumber(form.getValues('phonenumber'))
      router.push('/auth/verify')
    },
    onError:(err) =>{ console.log('User Error :', err);
      new ToastMessage(err?.message).errorToast()
    }
  })

  const  onSubmit = async(data: any) => {

    // console.log('New User :', data)
    mutation.mutate(data)
  }

  useEffect(()=>{
    
  }, [])

  return (
    <View  style={styles.container}>

        <View  style={styles.main}>

        <Text style={styles.title}>Inscription</Text>

            <View style={styles.formGroup}>
                <View style={{display:  'flex', flexDirection: 'row', gap:  10, alignItems: 'center'}}>

                {/* <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nom et Prénoms <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput style={styles.input} placeholder='' onChangeText={data => form.setValue('fullname', data)}/>
                </View> */}

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>N° Téléphone <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput keyboardType='numeric' style={styles.input} placeholder='' onChangeText={data => form.setValue('phonenumber', data)} />
                </View>

                
                {/* {errors.phonenumber && <Text>{errors.phonenumber.message||''}</Text>} */}

                </View>
                <View style={{display:  'flex', flexDirection: 'row', gap:  10, alignItems: 'center'}}>

                {/* <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput keyboardType='email-address' style={styles.input} placeholder='' onChangeText={data => form.setValue('email', data)} />
                </View> */}

                    {/* {errors.phonenumber && <Text>{errors.phonenumber.message||''}</Text>} */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Mot de passe <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput style={styles.input} placeholder='*********' secureTextEntry={true} onChangeText={data => form.setValue('password', data)}/>
                </View>

                </View>
                <View style={{display:  'flex', flexDirection: 'row', gap:  10, alignItems: 'center'}}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Selectionnez le role <Text style={{color: 'red'}}>*</Text></Text>
                    <Picker
                    selectedValue={selectedRole}
                    onValueChange={
                    (value, index)=>{
                        form.setValue('role', value)

                        // const selectedRole = roles.find((role: any) => role.id = value)
                        // selectedRole && setSelectedRole()
                    }
                    }
                    style={styles.input}
                    >
                      <Picker.Item label={'choisissez un role'} value={''} />
                    {
                      roles && roles.filter((role: any) => role.slug === 'prestataire').map((role: any)=> <Picker.Item label={role.name} value={role._id}  key={role._id}/>)
                    }
                    
                    </Picker>
                </View>
                
                </View>
                

                {/* <TextInput multiline={true} numberOfLines={5} style={styles.textarea} placeholder='Description'/> */}
                <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                  <TouchableOpacity style={styles.btn} onPress={form.handleSubmit(onSubmit)} disabled={mutation.isPending}>
                      <Text style={{textAlign: 'center', color: "#fff", fontSize:26}}>Enregistrer</Text>
                  </TouchableOpacity>

                  <Pressable onPress={()=>router.push('/')} >
                    <Text style={{textAlign: 'center', fontSize:20}}>Connexion</Text>
                  </Pressable>
                </View>
            </View>

        </View>

    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    width:  '100%',
    height:   '100%',
    overflow:  'hidden',
    borderRadius: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  main:{
    flex: 1,
    padding:  40,
    gap: 40
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  
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
      fontSize:   18,
      padding:   10,
  },
  btn: {
      width: '100%',
      padding:  10,
      backgroundColor:   '#1C8973',
      color:   '#fff',
  },
  roleDescription: {
    width:  '100%',
    padding: 10,

    borderStyle: 'dashed',
    borderWidth: .5,
    borderColor: '#cfcfcf'

  }
})