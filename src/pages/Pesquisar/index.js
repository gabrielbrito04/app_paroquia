import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';

const SPREADSHEET_ID = '1SPglzyjnDvMnZB4n6agdCFcirTuL-RpBL74uXSv0CgU'; // ID da sua planilha
const RANGE = 'Pessoa!A1:C'; // Intervalo desejado
const API_KEY = 'AIzaSyBJjjZ599Aa2cA82TuNUxmXoiyNdjM6_jE'; // Sua chave de API

const SheetsData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const tableHead = ['Nome', 'Sexo', 'Data Recebimento'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );

        const rows = response.data.values.slice(1);
        setData(rows);
        setFilteredData(rows);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredData(data.filter(row => row[0].toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar por nome"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={tableHead} style={styles.header} textStyle={styles.headerText} widthArr={[175, 80, 100]} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Rows data={filteredData} textStyle={styles.text} widthArr={[175, 80, 100]} />
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default SheetsData;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff' 
  },
  header: { 
    height: 50, 
    backgroundColor: '#537791' 
  },
  headerText: { 
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  text: { 
    textAlign: 'center', 
    margin: 6 
  },
  dataWrapper: { 
    marginTop: -1 
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
