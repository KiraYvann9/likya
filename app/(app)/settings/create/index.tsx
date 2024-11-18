import { zodResolver } from '@hookform/resolvers/zod';
import { router, useRouter } from 'expo-router';
import { CircleAlert, CircleX } from 'lucide-react-native';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { View, Text, Pressable, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { TypeOf, z } from 'zod';

import {Picker} from '@react-native-picker/picker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchData, postData } from '@/services/services'
import { ToastMessage } from '@/services/toast';


const getRoles = async()=>{
  const req = await fetchData('/roles')
  return req.items
}

const adressTyoe = z.object({
  address: z.string()
})

const schema = z.object({
  fullname: z.string({message: ''}).min(2),
  phonenumber: z.string({message: ''})
      .regex(/^\+\d{11,15}$/, "Le numéro de téléphone doit commencer par '+' suivi de 11 à 15 chiffres."),
  email: z.string({message: ''}),
  password: z.string({message: ''}).min(2,  {message: 'le mot de passe doit contenir au moins  8 caracteres'}),
  role: z.string({message: ''}),
  attributes: z.object({
    address: z.string({}).optional(),
    compte_bancaire: z.string({}).optional()
  }),

  //z.record(z.string(), z.any())
})

interface RoleType {
  // id: number,
  name: string,
  description: string
}


const index = () => {

  

  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: '',
      phonenumber: '',
      email: '',
      password: '',
      role: '',
      attributes: {
        address: '',
        compte_bancaire: '',
      }
    },
  })

  const [selectedRole, setSelectedRole] = useState<any>()

  const {data: roles, isLoading, isError} = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  })

  const createUser = async (data: z.infer<typeof schema>) =>{
    const req = await postData('/users', data)
    return req.data
  }

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']})
      new ToastMessage('Ajouter avec succès ').successToast()
      router.replace("/settings")
    },
    onError:(err) =>{ console.log('User Error :', err);
      new ToastMessage(err?.message).errorToast()
    }
  })

  const  onSubmit = async(data: any) => {
    mutation.mutate(data)
  }

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
          width: '70%',
          height: '80%',
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

            <Text style={styles.headerTitle}>Créer un compte</Text>

            <Pressable onPress={() => router.push("/settings")} >
              <CircleX  size={24} />
            </Pressable>
          </View>

          <View  style={styles.main}>

            <View style={styles.formGroup}>

              <View style={{display:  'flex', flexDirection: 'row', gap:  10, alignItems: 'center'}}>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nom et Prénoms <Text style={{color: 'red'}}>*</Text></Text>
                  <TextInput style={styles.input} placeholder='' onChangeText={data => form.setValue('fullname', data)}/>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>N° Téléphone <Text style={{color: 'red'}}>*</Text></Text>
                  <TextInput keyboardType='numeric' style={styles.input} placeholder='' onChangeText={data => form.setValue('phonenumber', data)} />
                  {form.formState.errors.phonenumber && <Text style={styles.error}>{form.formState.errors.phonenumber.message||''}</Text>}
                </View>

              </View>
              <View style={{display:  'flex', flexDirection: 'row', gap:  10, alignItems: 'center'}}>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>E-mail <Text style={{color: 'red'}}>*</Text></Text>
                  <TextInput keyboardType='email-address' style={styles.input} placeholder='' onChangeText={data => form.setValue('email', data)} />
                </View>

                    {/* {errors.phonenumber && <Text>{errors.phonenumber.message||''}</Text>} */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mot de passe <Text style={{color: 'red'}}>*</Text></Text>
                  <TextInput style={styles.input} placeholder='*********' secureTextEntry={true} onChangeText={data => form.setValue('password', data)}/>
                </View>

              </View>

              <View style={{display:  'flex', flexDirection: 'row', gap:  10, alignItems: 'center'}}>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Adresse (lieu) <Text style={{color: 'red'}}>*</Text></Text>
                  <TextInput keyboardType='email-address' style={styles.input} placeholder='' onChangeText={data => form.setValue('attributes.address', data)} />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>N° Compte bancaire <Text style={{color: 'red'}}>*</Text></Text>
                  <TextInput keyboardType='default' style={styles.input} placeholder='' onChangeText={data => form.setValue('attributes.compte_bancaire', data)} />
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
                    <Picker.Item label={'Selectionnez un rôle'} value={null}/>
                    {
                      roles && roles.map((role: any)=> <Picker.Item label={role.name} value={role._id}  key={role._id}/>)
                    }
                    
                  </Picker>
                </View>
                
              </View>
              

              {/* <TextInput multiline={true} numberOfLines={5} style={styles.textarea} placeholder='Description'/> */}
                <TouchableOpacity style={styles.btn} onPress={form.handleSubmit(onSubmit)} disabled={mutation.isPending}>
                    <Text style={{textAlign: 'center', color: "#fff", fontSize:26}}>Enregistrer</Text>
                </TouchableOpacity>

                <View style={styles.roleDescription}>
                  {/* <CircleAlert color={'#d4d4d4'}/> */}

                  <View style={{padding: 10}}>
                    {
                      roles && roles.map((role: any)=>  <View key={role._id} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2}}> <Text style={{fontStyle: 'italic', fontWeight: 500}}>{role.name}: </Text > <Text style={{fontSize: 12, color: '#4d4d4d'}}>{role?.description}</Text> </View>)
                    }
                  </View>
                  <Text></Text>
                </View>
            </View>

          </View>

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
  error:{
    fontSize: 12,
    color: 'red'
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