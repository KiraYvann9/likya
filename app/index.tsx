import { View, Text, StyleSheet, Image, TextInput, Pressable, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

import { useMutation } from '@tanstack/react-query'

import {useForm} from 'react-hook-form'
import {zodResolver}  from '@hookform/resolvers/zod'

import {z} from 'zod'

import { useUserStore } from '@/stores/useStore'
import { ToastMessage } from '@/services/toast'
import { useRegistrationStore } from '@/stores/useRegistrationStore'

const logo = require("../assets/logo2.svg")

const schema = z.object({
    phonenumber: z.string({message: ''}).min(8),
    password: z.string({message: ''}).min(8,  {message: 'le mot de passe doit contenir au moins  8 caracteres'}),
})

const index = () => {

    const addPhoneNumber = useRegistrationStore(state => state.addPhoneNumber)

    const router = useRouter()
    const {login} = useUserStore()

    const {register, setValue, getValues, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
    })

    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: {phonenumber: string, password:string}) => login(data),
        onSuccess: () => {
            router.push("/home")
        },
        onError: (error: {status: number}) => {
            console.log('Login Error', error)
            console.log(error?.status === 403);
            
            if(error instanceof Error){

                if( error?.status === 403) {
                    addPhoneNumber(getValues('phonenumber'))
                    new ToastMessage('Votre compte n\'a pas été activé.Veuillez contacter l\'adminstrateur pour l\'activation.', 10000).errorToast()
                    // router.push('/auth/verify')
                    
                }else{
                    error instanceof Error && new ToastMessage('Email ou Mot de passe incorrecte').errorToast()
                }
            }
                
            
        }
    })

    const onSubmit  = async (data: any) => {
        console.log('Datas', data);
        mutation.mutate(data)
    }

  return (
    <View style={style.container} >
        
        <View style={style.form}>
            <Image source={logo} style={style.logo} />

            <View style={style.formGroup}>
                <TextInput style={style.input} placeholder='Email ou Numéro de téléphone' onChangeText={data => setValue('phonenumber', data)} />
                    {/* {errors.phonenumber && <Text>{errors.phonenumber.message}</Text>} */}
                <TextInput style={style.input} placeholder='Mot de passe' secureTextEntry={true} onChangeText={data => setValue('password', data)}/>
                {/* ()=>router.push('/home') */}
                <Pressable style={style.btn} onPress={handleSubmit(onSubmit)} disabled={mutation.isPending}>
                    <Text style={{textAlign: 'center', color: "#fff", fontSize:26}}>Connexion</Text>
                </Pressable>

            </View>

            <Pressable 
            onPress={()=>router.push('/auth/register')}
            >
                <Text style={{textAlign: 'center', color: "#164B74", fontSize:18}}>S'inscrire</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default index


const style = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        display:  'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'#18937F',
        // backgroundColor:'#164B74',

    },
    logo:{
        width: 200,
        height:  78,
        resizeMode:  'contain',


    },
    form:{
        width: '30%',
        height: '50%',
        display:  'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        alignItems:  'center',
        gap: 40
    },
    formGroup:{
        width: '100%',
        gap:  10,

    },
    input:{
        width: '100%',
        height: 50,
        borderStyle:  'solid',
        borderColor: '#1C8973',
        borderWidth:  1,
        borderRadius:   5,
        fontSize:   18,
        paddingLeft:   10,
        // outline:   'none',

    },
    btn: {
        width: '100%',
        padding:  10,
        backgroundColor:   '#1C8973',
        color:   '#fff',
    }

})
