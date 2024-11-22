import {create} from 'zustand'


interface userType {
    user: any | null,
    isEdit: boolean,
    isShow: boolean,
    setISEdit: (data: any)=>void,
    setIsShow: (data: any)=>void,
    closeModal: () => void,
}


export const useUserUpdate = create<userType>()((set)=>({
    user : {},
    isEdit: false,
    isShow: false,
    setIsShow: (data)=>set({isShow: true, isEdit: false, user: data}),
    setISEdit: (data)=>set({isShow: false, isEdit: true, user: data}),
    closeModal: () => set({user: null}),
}))