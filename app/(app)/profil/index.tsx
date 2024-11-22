import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";

import { globalStyle } from "@/styles/globa";
import { History, RefreshCcwDot, UserPlus } from "lucide-react-native";
import { useRouter } from "expo-router";

import { DataTable } from "@/components/table/data-table";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchData, updateData} from "@/services/services";
import { useUserStore } from "@/stores/useStore";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ToastMessage} from "@/services/toast";

const schema = z.object({
  fullname: z.string({message: ''}).min(2).optional(),
  phonenumber: z.string({message: ''}).regex(/^\+\d{11,15}$/, "Le numéro de téléphone doit commencer par '+' suivi de 11 à 15 chiffres.").optional(),
  attributes: z.record(z.string(), z.any()).optional(),
})

const index = () => {
  const {user, logOut, updateUser} = useUserStore();
  const queryClient = useQueryClient()

  const [isEdit, setIsEdit] = useState<boolean>(false);

  console.log("Connected user : ", user);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: '',
      email: '',
      attributes: {}
    },
  })

  const updateProfil = async ( data: any) =>{
    const response = await updateData(`/users/${user?.user?._id}`, data);
    return response.data
  }

  const updateMutation = useMutation({
    mutationFn: updateProfil,
    onSuccess: ()=>{
      new ToastMessage('Vos informations on été mis à jours').successToast()
      queryClient.invalidateQueries({queryKey: ['users']})
    },
    onError: (error)=>{
      if(error instanceof Error){
        new ToastMessage('Oups! Quelque chose s\'est mal passé').errorToast()
      }
    }
  })

  const onSubmit = (data: any) =>{
    updateMutation.mutate(data)
  }


  useEffect(()=>{
    if(user){
      form.setValue('fullname', user.user?.fullname);
      form.setValue('attributes', user.user?.attributes?.adress);
    }
  }, [])

  return (
    <View style={globalStyle.container}>
      <View
        style={[
          globalStyle.main,
          {
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "flex-start",
          },
        ]}
      >
        <View
          style={[
            styles.container,
            { display: "flex", flexDirection: "column", gap: 10, width: "50%" },
          ]}
        >
          <View style={styles.picture}>
            <Text></Text>
          </View>

          <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <View style={{}}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>Nom</Text>
              {isEdit ?

                <TextInput
                  editable={isEdit}
                  selectTextOnFocus={isEdit}
                  style={[
                    styles.input,
                    {
                      fontSize: 32,
                      fontWeight: "700",
                      backgroundColor: isEdit ? 'transparent':'#f5f5f5',
                      outline: isEdit ? "" : "none",
                    },
                  ]}

                  defaultValue={form.getValues('fullname')}
                  onChangeText={data => form.setValue('fullname', data)}
                /> :

                <Text style={{ fontSize: 32, fontWeight: "700" }}>{user.user?.fullname}</Text>
              }
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>Rôle</Text>
              <Text style={{ fontSize: 22, fontWeight: "400" }}>{user.user?.role?.name}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>Email</Text>
              <Text style={{ fontSize: 22, fontWeight: "400" }}>{user?.user.email}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>N° Téléphone</Text>
              <Text style={{ fontSize: 22, fontWeight: "400" }}>{user?.user.phonenumber}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                Adresse
              </Text>

              {isEdit ?

                <TextInput
                  editable={isEdit}
                  selectTextOnFocus={isEdit}
                  style={[styles.input, {
                    fontSize: 22,
                    fontWeight: "400",
                    backgroundColor: isEdit ? 'transparent':'#f5f5f5',
                    outline: isEdit ? "" : "none",
                  }]}
                  defaultValue={user.user?.attributes?.adresse || ''}
                  onChangeText={data => form.setValue('attributes', {'adress': data})}
                /> :
                <Text style={{ fontSize: 22, fontWeight: "400" }}>{user?.user?.attributes?.adress}</Text>
              }
            </View>

            {
              isEdit ?
              <View style={{display: 'flex', flexDirection: 'row', gap: 4, width: '100%'}}>
                <Button title={'Annuler'} onPress={()=>setIsEdit(false)} color={'lightgrey'} />
                <Button title={'Enregister'} onPress={form.handleSubmit(onSubmit)} color={'green'}/>
              </View>:
              <Button title="Modifier" onPress={() => setIsEdit(!isEdit)} />
            }

            {
              isEdit &&
              <View style={styles.info}>
                <Text>Après modifiction de vos information vous serez déconnecté</Text>
                <Text>Bien vouloir retenir ou noter les nouveau N° Téléphone et Mot de passe</Text>
              </View>
            }
          </View>
        </View>


      </View>
    </View>
  );
};


export default index;


const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    width: 250,
    height: 100,
    borderRadius: 10,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    color: "#fff",
    gap: 5,
  },
  tableContainer: {
    width: "100%",
    height: "auto",
    marginTop: 50,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#cfcfcf",
    padding: 10,
    borderRadius: 5,
  },

  container: {
    width: "100%",
    height: "100%",
  },

  picture: {
    width: 150,
    height: 150,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#cfcfcf",
    backgroundColor: "#1c1c1c",
    borderRadius: "100%",
    overflow: "hidden",
  },
  input: {
    // padding: 10,

    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#dedede'
  },
  button:{
    width: '100%'
  },
  info: {
    width:  '100%',
    padding: 10,
    marginTop: 10,
    borderStyle: 'dashed',
    borderWidth: .5,
    borderColor: '#cfcfcf'

  }
});
