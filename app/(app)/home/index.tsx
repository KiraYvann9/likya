import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { globalStyle } from '@/styles/globa'

const index = () => {
  return (
    <View style={globalStyle.container}>
      <View style={[globalStyle.main, {justifyContent: 'center'}]}>
        <Image source={require('@/assets/img/empty.webp')} width={40} height={100} style={style.image} />
        <Text style={style.text}>Aucune facture en attente</Text>
      </View>
    </View>
  )
}

export default index


const style = StyleSheet.create({
  image:{
    width: 250,
    height: 250,
    resizeMode: 'contain'
  },
  text:{
    fontSize:  18,
  }

})
