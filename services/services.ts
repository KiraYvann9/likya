import axios from "axios";
import { useUserStore } from "@/stores/useStore";

const baseUrl = process.env.EXPO_PUBLIC_API_URL

export const fetchData = async(endpoint: string) =>{
    const {user} = useUserStore.getState();
    try {
        const req = await axios.get(`${baseUrl}${endpoint}`, {
            headers: {
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${user?.access_token}`
            }
        })
        return req.data
    }catch(err){
        console.log('Fecth error', err);
        
    }
}

export const postData = async(endpoint: string, data: any) =>{
    const {user} = useUserStore.getState();
    try {
        const req = await axios.post(`${baseUrl}${endpoint}`, data, {
            headers: {
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${user?.access_token}`
            }
        })
        return req.data
    }catch(err){
        console.log('Fecth error', err);
        
    }
}