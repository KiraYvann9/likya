import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
import { Ellipsis } from 'lucide-react-native'

import {Menu, MenuProvider, MenuTrigger, MenuOptions, MenuOption, } from 'react-native-popup-menu'

type userType = {
  fullname: string,
  role: string,
  email: string,
  phonenumber:  string,
}

// interface TableType {
//     data: userType[],
// }
export const DataTable = ({data}: {data:userType[]}) => {
  return (
    <View style={styles.tbContainer}>
      <View style={styles.tbHeader}>
        <View style={{width: '5%'}}>
          <Text style={styles.tbHeaderText}>ID</Text>
        </View>
        <View style={{width: '30%'}}>
          <Text style={styles.tbHeaderText}>Name et Prénoms</Text>
        </View>
        <View style={{width: '30%'}}>
          <Text style={styles.tbHeaderText}>N° Téléphone</Text>
        </View>
        <View style={{width: '30%'}}>
          <Text style={styles.tbHeaderText}>E-mail</Text>
        </View>
        <View style={{width: '5%'}}>
          <Text style={styles.tbHeaderText}>Action</Text>
        </View>
      </View>
      {/* Tbody */}
      <View>
        {data && data.map((item: any, index:  number) => (
          <View key={index} style={styles.tbRow}>
            <View style={{width: '5%'}}></View>
            <View style={{width: '30%'}}><Text>{item.fullname}</Text></View>
            <View style={{width: '30%'}}><Text>{item.phonenumber}</Text></View>
            <View style={{width: '30%'}}><Text>{item.email}</Text></View>

            <View style={{width: '5%'}}>
              <Menu>
                <MenuTrigger style={{zIndex: 1000, overflow: 'visible'}}>
                  <Ellipsis  size={16} color={'#4D4D4D'} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuOption}>
                  <MenuOption><Text>Détail</Text></MenuOption>
                  <MenuOption><Text>Editer</Text></MenuOption>
                  <MenuOption><Text>Suprimer</Text></MenuOption>
                </MenuOptions>
              </Menu>
                
              </View>

          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tbContainer: {
      width: '100%',
      height: '100%'

  },
  tbHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
  },
  tbHeaderText: {
    fontWeight: '700',
  },
  tbBody: {
    width:  '100%',

  },
  
  tbRow: {
    display: 'flex',
    flexDirection:  'row',
    justifyContent:  'space-between',
    alignItems:  'center',
    paddingVertical: 10,
    borderStyle: 'solid',
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: .3,
    width:   '100%',
    overflow:  'visible',
  },
  menuOption: {
    backgroundColor: '#fafafa',
    borderRadius:  10,
    padding:  10,
    width:   150,

  }
})