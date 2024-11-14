import * as React from 'react';
import { useState, } from 'react';
import { Image, StyleSheet, TextInput, Text, View, Button, Platform, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

import moment from 'moment';
import axios from 'axios';

export default function Cadastro() {
  //Nome
  const [nome, setNome] = useState('');

  //Sexo
  const [sexo, setSexo] = useState('');

  // Calendário
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  async function enviarForm() {
    try {
      const formData = {
        nome: nome,
        sexo: sexo,
        dt_recebimento: moment(date).format('DD/MM/YYYY'),
      };
  
      console.log('Form Data:', formData); // Log para ver os dados sendo enviados
  
      const response = await axios.post('https://script.google.com/macros/s/AKfycbwUrKbq8aQfD2v9UQhKfvgQ-bHBCfyzHMkRwyxL_Cz953FFMmAmEihtA1xb-jpi-6ZC/exec', formData);
  
      if (response.data.result === 'success') {
        Alert.alert('Sucesso!', 'Entrega registrada com sucesso!');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao enviar registro de entrega, contate o suporte!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar registro de entrega, contate o suporte!');
      console.error('Erro:', error);
    }
  }
  

  return (
    <View style={styles.container}>
        <View style={styles.top_bar}>
            <Image style={styles.img} source={require('/home/gabriel/Documentos/app_paroquia/src/img/brasao_paroquia.png')} />
            <Text style={styles.title_text}>Cadastro de Pessoas</Text>
        </View>
        <View style={styles.name}>
            <Text style={styles.name_text}>Nome</Text>
            <TextInput style={styles.label} placeholder='Digite o nome Completo' value={nome} onChangeText={setNome} />
        </View>
        <View style={styles.sexo}>
          <Text style={styles.sexo_text}>Sexo</Text>
          <RNPickerSelect
            onValueChange={(value) => setSexo(value)}
            items={[
              { label: 'Feminino', value: 'feminino' },
              { label: 'Masculino', value: 'masculino' },
            ]}
            placeholder={{
              label: 'Selecione o sexo',
              value: sexo,
              color: 'black',
            }}
          />
        </View>
        <View style={styles.date}>
            <Text style={styles.date_text}>Data de Recebimento</Text>
        </View>
        <View style={styles.date_btn}>
            <Text style={styles.date_label}>{moment(date).format('DD/MM/YYYY')}</Text>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
                <Icon name="calendar" size={20} color="white" />
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
        </View>
        <View style={styles.cadastrar}>
            <Button color='#015CA2' onPress={enviarForm} title='Registrar Entrega'/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFF',
  },
  top_bar: {
    flexDirection: 'row',
    justifyContent: 'top',
  },
  img: {
    width: 100,
    height: 150,
    marginLeft: 10,
  },
  title_text: {
    justifyContent: 'center',
    marginLeft: 25,
    marginTop: 75,
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    padding: 15,
    paddingTop:75,
  },
  name_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sexo: {
    padding: 15,
    paddingTop:25,
  },
  sexo_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#015CA2',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  date: {
    padding: 15,
    paddingTop:25,
  },
  date_btn: {
    flexDirection: 'row',
    paddingLeft: 15
  },
  date_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date_label: {
    fontSize: 18,
    paddingTop:13,
    paddingRight: 25,
    color: 'grey',
  },
  cadastrar: {
    padding: 15,
    paddingTop:100,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: 'grey',
  },
});