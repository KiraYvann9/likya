import { View, Text } from 'react-native'
import React from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient =  new QueryClient();



const ReactQueryProvider = ({children}:{children: React.ReactNode}) => {

  return (
    <QueryClientProvider  client={queryClient}>
      {children}
      <ReactQueryDevtools  initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider

