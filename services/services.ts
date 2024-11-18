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

export const fetchOneData = async(endpoint: string) =>{
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

export const updateData = async(endpoint: string, data: any) =>{
    const {user} = useUserStore.getState();
    try {
        const req = await axios.patch(`${baseUrl}${endpoint}`, data, {
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
export const deleData = async(endpoint: string) =>{
    const {user} = useUserStore.getState();
    try {
        const req = await axios.delete(`${baseUrl}${endpoint}`, {
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


export const changeStatus = async(endpoint: string) =>{
    const {user} = useUserStore.getState();
    try {
        const req = await axios.put(`${baseUrl}${endpoint}`, {}, {
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