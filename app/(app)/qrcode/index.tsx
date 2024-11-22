import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useState } from 'react'

import { globalStyle } from '@/styles/globa'
import {Printer, Download, Camera, QrCode} from 'lucide-react-native'
import { useRouter } from 'expo-router'

import QRCode from 'react-native-qrcode-svg';


import { DataTable } from '@/components/table/data-table'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '@/services/services'



const index = () => {

    let logo = require('@/assets/images/favicon.png')

  const router = useRouter()

  return (
    <View style={globalStyle.container}>

      <View style={[globalStyle.main, {display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center'}]}>

        <View style={styles.cardContainer}>

          {/* <Pressable  style={[styles.card, { backgroundColor: '#F36F21',}]} onPress={()=>router.push("/settings/create")}>
            <Text style={styles.text}><QrCode/> Générer un QR-Code </Text>
          </Pressable> */}
          
          <Pressable  style={[styles.card, { backgroundColor: '#9656FC',}]} onPress={()=>console.log('')}>
            <Text style={styles.text}><Printer/>Imprimer le QR-Code</Text>
          </Pressable>
          <View  style={[styles.card, { backgroundColor: '#18937F',}]}>
            <Text style={styles.text}><Download/> Télécharger le QR-Code</Text>
          </View>
        </View>

        <View style={styles.qrcode_container}>

            <View style={styles.pdf}>

            <Image source={require('@/assets/logo-white.svg')} style={styles.image} width={100}/>

                <View style={styles.qrcode_border}>

                    <QRCode
                        value='juste a test'
                        size={220}
                        // logo={logo}
                        
                    />
                </View>

                <View style={{width: '60%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10}}>
                    <Camera size={48} color='#fff'/>
                    <Text style={{fontSize: 32, fontWeight: '700', color:'#fff'}}>Scanner le QR Code pour payer</Text>
                </View>
            </View>

          
        </View>

      </View>
    </View>
  )
}

export default index;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    gap:  10,
  },
  card:{
    width: 250,
    height: 60,
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
    fontSize:  16,
    display:   'flex',
    flexDirection:   'row',
    justifyContent:  'center',
    alignItems:   'center',
    fontWeight:   'bold',
    color:   '#fff',
    gap:   5,
  },
  qrcode_container:{

    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  qrcode_border:{
    borderRadius: 5, 
    overflow: 'hidden', 
    width: 280, 
    height: 280,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },


  pdf: {
    width: '80%',
    height: '100%',
    maxHeight: 700,
    maxWidth: 600,
    borderStyle: 'solid',
    borderWidth: .5,
    borderColor: '#cfcfcf',
    borderRadius: 10,
    backgroundColor: '#164B74',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
    padding: 40,
  },
  image:{
    width:   200,
    height:  100,
    resizeMode:   'contain',
  }
})