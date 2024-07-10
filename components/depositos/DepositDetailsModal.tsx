import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useDeposits } from './proveedorDepositos';

interface DepositDetailsModalProps {
  onSave: (details: any) => void;
  onCancel: () => void;
}

const denominations = [20000, 10000, 5000, 2000, 1000, 500, 100, 50, 10] as const;
type Denomination = typeof denominations[number];

const DepositDetailsModal: React.FC<DepositDetailsModalProps> = ({ onSave, onCancel }) => {
  const { deposits, setDeposits } = useDeposits(); // Obtener depósitos y función setDeposits desde el contexto

  const [bills, setBills] = useState<Record<Denomination, number>>({
    20000: 0,
    10000: 0,
    5000: 0,
    2000: 0,
    1000: 0,
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  });

  const increment = (denomination: Denomination) => {
    setBills(prevBills => ({ ...prevBills, [denomination]: prevBills[denomination] + 1 }));
  };

  const decrement = (denomination: Denomination) => {
    setBills(prevBills => ({
      ...prevBills,
      [denomination]: prevBills[denomination] > 0 ? prevBills[denomination] - 1 : 0,
    }));
  };

  const handleInputChange = (text: string, denomination: Denomination) => {
    const value = parseInt(text, 10) || 0;
    setBills(prevBills => ({ ...prevBills, [denomination]: value }));
  };

  const calculateTotal = () => {
    return denominations.reduce((total, denomination) => {
      return total + denomination * bills[denomination];
    }, 0);
  };

  const handleSave = () => {
    const total = calculateTotal();
    if (total === 0) {
      Alert.alert('Error', 'El total del depósito debe ser mayor que 0');
    } else {
      const depositDetails = {
        total,
        bills,
      };
      setDeposits(prevDeposits => [...prevDeposits, depositDetails]); 
      onSave(depositDetails); 
    }
  };

  return (
    <View style={styles.container}>
      {denominations.map(denomination => (
        <View key={denomination} style={styles.row}>
          <TouchableOpacity onPress={() => decrement(denomination)} style={styles.button}>
            <Text>-</Text>
          </TouchableOpacity>
          <View style={styles.billContainer}>
            <Text style={styles.billText}>{denomination}</Text>
          </View>
          <TextInput
            value={bills[denomination].toString()}
            onChangeText={(text) => handleInputChange(text, denomination)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity onPress={() => increment(denomination)} style={styles.button}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text>Total: {calculateTotal()}</Text>
      <View style={styles.buttonRow}>
        <Button title="Guardar" onPress={handleSave} />
        <Button title="Cancelar" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  billContainer: {
    flex: 1,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  billText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginHorizontal: 10,
    flex: 1,
  },
});

export default DepositDetailsModal;
