import { View, Text, StyleSheet, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { router } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRegistrationStore } from '@/stores/useRegistrationStore'
import axios from 'axios'
import { baseUrl } from '@/stores/useStore'
import { useMutation } from '@tanstack/react-query'
import { ToastMessage } from '@/services/toast'
// import {Nullable} from 'lib/type'
type otpInputProps ={
  length: number,
  value : Array<string>,
  onChangeText: (value: Array<string>) => void,
  onEndEditing: (value: Array<string>) => void,
  disabled: boolean
}

const schema = z.object({
  phonenumber: z.string({message: ''}).min(8),
  otp_code: z.string({message: ''}).min(4).max(4),
})

const index = ({length,value, onChangeText, onEndEditing, disabled}: otpInputProps) => {

  const otpRef = useRef<Array<TextInput>>([])

  const phone = useRegistrationStore(s => s.phoneNumber)
  const [OTP, setOTP] = useState(Array(4).fill(''))

  const {register, setValue, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(schema),
  })

  const verify = async(data: {phonenumber: string, otp_code: string}) => {
    const resp = await axios.post(`${baseUrl}/verify-otp`, data)
    return resp.data
  }

  const resendOTP = async (data: {phonenumber: string}) =>{
    const resp = await axios.post(`${baseUrl}/resend-otp`, data)
    return resp.data
  }

  const mutation = useMutation({
    mutationFn: verify,
    onSuccess: ()=>{
      new ToastMessage('Compte vérifier avec succès !').successToast()
      router.push('/')
    },
    onError: (error : {status: number})=>{  

      console.log('Verification error :', error);
      
      if(error instanceof Error){
        if( error?.status === 400) {
          new ToastMessage('Le code à Expiré, renvoyez s\il vous plait !', 5000).errorToast()
        }else{
          error instanceof Error && new ToastMessage('Code invalide').errorToast()
        }
      }

    }
  })


  const resendOTPmutation = useMutation({
    mutationFn: resendOTP,
    onSuccess: ()=>{
      new ToastMessage('Nouveau code envoyer par SMS', 5000).successToast()
    },
    onError: (error : {status: number})=>{  

      console.log('Verification error :', error);
      
      new ToastMessage('Oups ! Quelque chose s\'est mal passé !', 5000).errorToast()

    }
  })
  





  const handleChange = (text: string, index: number) => {
    console.log('Text :', text);
    

    // Vérifie s'il y a au moins un caractère dans le champ
    if(text.length !== 0){
      //Si oui focus le champ suivant
      const newOTP = [...OTP];
      newOTP[index] = text;

      setOTP(newOTP)
      return otpRef?.current[index+1]?.focus()
    }
    
    //Si non focus le champ précédent
    return otpRef?.current[index - 1]?.focus()
    
  }
  
  const handleBackspacePress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) =>{
    const {nativeEvent} = event
    
    if(nativeEvent.key === 'Backspace'){
      handleChange('', index)
    }
  }
  
  const onSubmit = () =>{
    
    const data = {
      phonenumber: phone,
      otp_code: OTP.join().replaceAll(",",''),
    }

    mutation.mutate(data)
  }

  const handleResendOTP = () =>{
    const data = {
      phonenumber: phone
    }

    resendOTPmutation.mutate(data)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vérification</Text>

      <View>
        <Text style={styles.text}>Un code de confirmation vous a été envoyer par SMS au numéro.</Text>
        <Text style={styles.text}>Veuillez s'il vous plait renseigner le code dans le champ ci-dessous.</Text>
        <Text style={styles.text}>Ce code est à usage unique.</Text>
      </View>

      <View style={styles.otpContainer}>
        {
          [...new Array(4)].map((item, index)=>(
            <TextInput 
            key={index} 
            style={styles.otpField} 
            maxLength={1}
            contextMenuHidden
            selectTextOnFocus
            editable={!disabled}
            keyboardType='decimal-pad'
            testID={`$OTPinput-${index}`}
            ref={ref => {

              //je vérifie si la ref existe déjà dans la liste, sinon je l'ajoute
              if(ref && !otpRef.current.includes(ref)){
                otpRef.current = [...otpRef.current, ref]
              }
            }}

            onChangeText={text => handleChange(text, index)}
            onKeyPress={event => handleBackspacePress(event, index)}
            />
          ))
        }
      </View>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text>Vous n'avez reçu de code ? </Text>
        <Pressable onPress={()=>handleResendOTP()}>
            <Text style={{color: "#00f", fontSize:16}}>Renvoyer</Text>
        </Pressable>
      </View>
      {/* console.log('OTP', OTP.join().replaceAll(",",'')) */}
        <View style={{display: 'flex', flexDirection: 'column', gap: 20, width: '60%'}}>
          <Pressable style={styles.btn} onPress={() => onSubmit()} disabled={mutation.isPending}>
              <Text style={{textAlign: 'center', color: "#fff", fontSize:26}}>{mutation.isPending ? 'Vérification en cour...' : 'Vérifier'}</Text>
          </Pressable>
          <Pressable onPress={()=>router.push('/')} >
              <Text style={{textAlign: 'center', fontSize:20}}>Connexion</Text>
          </Pressable>
        </View>
    </View>
  )
}

export default index


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        gap: 40
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center'
    
    },
    text: {
      fontSize: 16,
      textAlign: 'center'
    },
    otpContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8
    },
    otpField:{
      height: 60,
      width: 60,
      fontSize: 30,
      textAlign: 'center',
      borderStyle: 'solid',
      borderWidth: .5,
      borderColor: '#cfcfcf',
      borderRadius: 5,
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
    btn: {
      width: '100%',
      padding:  10,
      backgroundColor:   '#1C8973',
      color:   '#fff',
  }
})