import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTotalDeposits } from '@/components/depositos/totalDepositos';

const CuadraturaScreen = () => {
  
  const [efectivo, setEfectivo] = useState<number>(0);
  const [tarjetas, setTarjetas] = useState<number>(0);
  const [miCopiloto, setMiCopiloto] = useState<number>(0);
  const [shellcard, setShellcard] = useState<number>(0);
  const [orpack, setorpack] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const { totalDepositos } = useTotalDeposits();

  const handleCalculateTotal = () => {
    const sumaTotal = efectivo + tarjetas + miCopiloto + shellcard + totalDepositos - orpack ;
    setTotal(sumaTotal);
  };

  return (
    <View style={styles.container}>
      <Text>Total en depositos: {totalDepositos}</Text>
      <View style={styles.inputContainer}>
        <Text>Efectivo:</Text>
        <TextInput
          value={efectivo.toString()}
          onChangeText={(text) => setEfectivo(parseInt(text, 10) || 0)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

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
          value={shellcard.toString()}
          onChangeText={(text) => setShellcard(parseInt(text, 10) || 0)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Total Orpack:</Text>
        <TextInput
          value={orpack.toString()}
          onChangeText={(text) => setorpack(parseInt(text, 10) || 0)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <Button title="Cuadrarse" onPress={handleCalculateTotal} />

      <Text style={styles.totalText}>Diferencia: {total}</Text>
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
});

export default CuadraturaScreen;
