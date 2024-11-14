import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from '/home/gabriel/Documentos/app_paroquia/src/routes'

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar backgroundColor='#031A35' barStyle='ligth-content' />
        <Routes/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    marginTop: 50,
  },
  top_bar: {
    flexDirection: 'row',
    alignSelf: 'top',
  },
  img: {
    width: 80,
    height: 80,
    margin: 10,
  },
  txt: {
    justifyContent: 'center',
    marginLeft: 50,
    marginTop: 40,
  },
  inputs: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    margin: 10,
  },
  Button: {
    backgroundColor: '#015CA2',
  },
})