import { View, Text, StyleSheet } from 'react-native'
import { Slot, Stack } from 'expo-router'
import React, { Children } from 'react'

import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Toast from 'react-native-toast-message';
const queryClient =  new QueryClient();

const RouteLayout = ({children}:  {children: React.ReactNode}) => {


  return (
      <QueryClientProvider client={queryClient}>
        <View style={{height:  '100%',  width: '100%'}}>
            <Slot/>
            <Toast />
        </View>
        <ReactQueryDevtools  initialIsOpen={false} />
      </QueryClientProvider>
  )
}

export default RouteLayout;

