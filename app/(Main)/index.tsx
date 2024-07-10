import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Boxes from '@/components/Boxes'

const index = () => {

  return (
    <View style={styles.container}>
      <Boxes title="Depositos" ir="depositos" />
      <Boxes title="Cuadratura" ir="cuadratura" />
      <Boxes title="Cierre" ir="cierreTurno" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default index;