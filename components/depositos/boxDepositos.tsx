import React, { useState, useEffect } from 'react';
import { View, Button, Text, FlatList, Alert, Modal, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTotalDeposits } from '@/components/depositos/totalDepositos';
import DepositDetailsModal from './DepositDetailsModal';

const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const InputDepositos = () => {
  const [deposits, setDeposits] = useState<string[]>([]);
  const { totalDepositos, setTotalDepositos } = useTotalDeposits();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [depositDetails, setDepositDetails] = useState<any[]>([]);

  useEffect(() => {
    loadDeposits();
  }, []);

  const loadDeposits = async () => {
    try {
      const storedDeposits = await AsyncStorage.getItem('@deposits');
      if (storedDeposits) {
        setDeposits(JSON.parse(storedDeposits));
      }

      const storedTotalDepositos = await AsyncStorage.getItem('@totalDepositos');
      if (storedTotalDepositos) {
        setTotalDepositos(parseInt(storedTotalDepositos, 10));
      }
    } catch (error) {
      console.error('Error loading deposits from AsyncStorage:', error);
    }
  };

  const saveDeposits = async (updatedDeposits: string[]) => {
    try {
      await AsyncStorage.setItem('@deposits', JSON.stringify(updatedDeposits));
    } catch (error) {
      console.error('Error saving deposits to AsyncStorage:', error);
    }
  };

  const saveTotalDepositos = async (total: number) => {
    try {
      await AsyncStorage.setItem('@totalDepositos', total.toString());
    } catch (error) {
      console.error('Error saving totalDepositos to AsyncStorage:', error);
    }
  };

  const handleAddDeposit = () => {
    setModalVisible(true);
  };

  const handleSaveDepositDetails = async (details: any) => {
    const { total, ...rest } = details;
    const newDeposits = [...deposits, formatNumber(total.toString())];
    setDeposits(newDeposits);
    await saveDeposits(newDeposits);

    const newTotal = newDeposits.reduce((sum, deposit) => sum + parseInt(deposit.replace(/\./g, ''), 10), 0);
    setTotalDepositos(newTotal);
    await saveTotalDepositos(newTotal);

    setDepositDetails([...depositDetails, rest]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Añadir Depósito" onPress={handleAddDeposit} />
      <FlatList
        data={deposits}
        renderItem={({ item, index }) => (
          <Text key={index}>{`D${index + 1} = ${item}`}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatList}
        keyboardShouldPersistTaps="handled"
      />
      <Text style={styles.totalText}>Total de Depósitos: {formatNumber(totalDepositos.toString())}</Text>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <DepositDetailsModal
              onSave={handleSaveDepositDetails}
              onCancel={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  flatList: {
    flexGrow: 1,
  },
  totalText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
});

export default InputDepositos;
