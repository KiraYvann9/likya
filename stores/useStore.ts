import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware';

import axios from 'axios'
import { router } from 'expo-router';
import { ToastMessage } from '@/services/toast';

interface user {
    user: any,
    login:(data: {phonenumber: string, password: string})=>any;
    logOut: ()=>any;
}

export const baseUrl = process.env.EXPO_PUBLIC_API_URL

export const useUserStore = create<user>()(persist((set, get)=>({
    user:  null,
    login: async (data) => {

        try{
            const request  = await axios.post(`${baseUrl}/login`, data)
            const response = await request.data
            set({user: response})


            return response

        }catch(err: any){
            throw err
        }
    },
    logOut: async() => {
        const {user} = get()

        try{
            const request = await axios.get(`${baseUrl}/logout`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.access_token}`
                }
            })
            set({user: null})
            router.push('/')
            return request.data
        }catch(err: any){
            new ToastMessage(err?.message).errorToast()
        }
    }

}), {name: 'user'}))