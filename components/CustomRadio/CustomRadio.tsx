import {View, StyleSheet, TouchableOpacity, Text, Pressable} from "react-native";
import {MaterialIcons} from '@expo/vector-icons'
import {deleData, fetchOneData, postData} from "@/services/services";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ToastMessage} from "@/services/toast";
import {Trash} from "lucide-react-native";
interface RadioProps {
    options: Array<{ _id: string, name: string , permissions: Array<any>}>,
    checkedValue: string|undefined,
    onChange?: (value: any) => void,
    setSelectedRoleDetail?: (value: any) => void,
    style?: any,
}

export default function CustomRadio({onChange, checkedValue, setSelectedRoleDetail, options, style}: RadioProps){
    const queryClient = useQueryClient()


    const deleRole = async (id: string)=>{
        const response = await deleData(`/roles/${id}`)
        return response.data
    }


    const deleRoleMutation = useMutation({
        mutationFn: deleRole,
        onSuccess: ()=>{
            new ToastMessage('Role supprimé !').successToast()
            queryClient.invalidateQueries({queryKey: ['roles']})
        }
    })

    const onSubmit = (id: string) =>{
        deleRoleMutation.mutate(id)
    }



    return(
        <View style={[styles.container, style]}>
            {
                options && options.map((option, index) => {
                    let active = checkedValue == option?._id

                    return(

                        < TouchableOpacity
                            onPress = {() => {
                                onChange(option?._id)
                                setSelectedRoleDetail(option?.permissions)
                            } }
                            style = {[styles.radio, {backgroundColor: !active ?'#f5f5f5':'#d4d4d4',}]} >
                            <View style={{display: 'flex', flexDirection: 'row', gap: 4}}>
                                < MaterialIcons
                                    name = {!active ?'radio-button-unchecked':'radio-button-checked'}
                                    size = {24}
                                    color = {"#4d4d4d"}

                                    key={index}
                                />
                                <Text style={{fontSize: 18}}>{option?.name}</Text>
                            </View>

                            <Pressable
                                onPress={() => onSubmit(option?._id)}
                                style={{padding: 5, backgroundColor: 'red', height: '100%', width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .6}}>
                                <Trash size={18} color={'#fff'}/>
                            </Pressable>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    radio:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        height: 40,
        overflow: 'hidden',
        paddingLeft: 15,
        justifyContent: 'space-between',
        borderRadius: 5,
    }
})