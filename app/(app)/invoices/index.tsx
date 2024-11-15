import { View, Text } from 'react-native'
import React from 'react'


import { globalStyle } from '@/styles/globa'

const index = () => {
  return (
    <View  style={globalStyle.container}>
        <View style={[globalStyle.main]}>
            <Text>index</Text>
        </View>
    </View>
  )
}

export default index