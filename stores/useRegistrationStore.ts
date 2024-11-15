import { create } from "zustand";
import { persist } from "zustand/middleware";


interface resgistrationType{
    phoneNumber: string,
    addPhoneNumber: (phonenumber: string) => void,
    removePhoneNumber: (phonenumber: string) => void,
}


export const useRegistrationStore = create<resgistrationType>()(persist((set)=>(
    {
        phoneNumber: '',
        addPhoneNumber: (phonenumber: string) => set({phoneNumber: phonenumber}),
        removePhoneNumber: (phonenumber: string) => set({phoneNumber: ''}),
    }
), {name: 'registration'}))