import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { getIdTagFromToken } from '@/utils/decodedTag';
import { useTotalDeposits } from '@/components/depositos/totalDepositos';
import axios from 'axios';

const CierreTurno = () => {
  const [tarjetas, setTarjetas] = useState<number>(0);
  const [miCopiloto, setMiCopiloto] = useState<number>(0);
  const [shellCard, setShellcard] = useState<number>(0);
  const [salidas, setSalidas] = useState<number>(0);
  const [orpack, setOrpack] = useState<number>(0);
  const [turno, setTurno] = useState<string>('');

  const { totalDepositos } = useTotalDeposits();
  const [deposits, setDeposits] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    loadDeposits();
  }, []);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const id_tag = getIdTagFromToken(token);
          console.log('id_tag:', id_tag); 
        }
      } catch (error) {
        console.error('Error loading token from AsyncStorage:', error);
      }
    };

    loadToken();
  }, []);

  const loadDeposits = async () => {
    try {
      const storedDeposits = await AsyncStorage.getItem('@deposits');
      if (storedDeposits) {
        setDeposits(JSON.parse(storedDeposits));
      }
    } catch (error) {
      console.error('Error loading deposits from AsyncStorage:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/Auth/login');
  };

  const handleCierreTurno = async () => {
    const token = await AsyncStorage.getItem('token');
  
    if (!token) {
      Alert.alert('Error', 'No se encontró el token.');
      return;
    }
  
    const id_tag = getIdTagFromToken(token);
    if (id_tag === null || id_tag === undefined) {
      Alert.alert('Error', 'No se pudo obtener el ID del token.');
      return;
    }
    
    const formatoFecha = new Date().toISOString().split('T')[0];

    const planillaData = {
      id_tag,
      turno,
      efectivo: totalDepositos,
      tarjeta: tarjetas,
      shellcard: shellCard,
      micopiloto: miCopiloto,
      salidas: salidas,
      total_venta: totalDepositos,
      total_orpack: orpack,
      fecha_subida: formatoFecha,
      
      depositos: deposits.map(deposit => ({
        monto_total: deposit.total,
        fecha_deposito: formatoFecha,
        detalleEfectivo: {
          billetes_20000: deposit.bills[20000] || 0,
          billetes_10000: deposit.bills[10000] || 0,
          billetes_5000: deposit.bills[5000] || 0,
          billetes_2000: deposit.bills[2000] || 0,
          billetes_1000: deposit.bills[1000] || 0,
          monedas_500: deposit.bills[500] || 0,
          monedas_100: deposit.bills[100] || 0,
          monedas_50: deposit.bills[50] || 0,
          monedas_10: deposit.bills[10] || 0,
        },
      })),
    };

    try {
      await axios.post('http://10.0.2.2:3000/cerrarTurno', planillaData);
      Alert.alert('Éxito', 'Planilla y depósitos subidos exitosamente');
      await AsyncStorage.removeItem('@deposits');
      setDeposits([]);
      handleLogout();
    } catch (error) {
      console.error('Error uploading planilla:', error);
      Alert.alert('Error', 'Hubo un error subiendo la planilla');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Total Efectivo: {totalDepositos}</Text>

      <View style={styles.inputContainer}>
        <Text>Tarjetas:</Text>
        <TextInput
          value={tarjetas.toString()}
          onChangeText={(text) => setTarjetas(parseInt(text, 10) || 0)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Mi Copiloto:</Text>
        <TextInput
          value={miCopiloto.toString()}
          onChangeText={(text) => setMiCopiloto(parseInt(text, 10) || 0)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Shellcard:</Text>
        <TextInput
          value={shellCard.toString()}
          onChangeText={(text) => setShellcard(parseInt(text, 10) || 0)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Salidas:</Text>
        <TextInput
          value={salidas.toString()}
          onChangeText={(text) => setSalidas(parseInt(text, 10) || 0)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Total Orpack:</Text>
        <TextInput
          value={orpack.toString()}
          onChangeText={(text) => setOrpack(parseInt(text, 10) || 0)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <Picker
        selectedValue={turno}
        onValueChange={(itemValue) => setTurno(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un turno" value="" />
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
        <Picker.Item label="C" value="C" />
        <Picker.Item label="V" value="V" />
        <Picker.Item label="P" value="P" />
      </Picker>

      <Button title="Cerrar Turno" onPress={handleCierreTurno} />
      <Button title="Salir" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  totalText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
});

export default CierreTurno;
