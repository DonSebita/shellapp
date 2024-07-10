import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PressBox = ({ title, ir }:any) => {
  return (
    <Link href={ir} asChild>
      <TouchableOpacity  style={styles.box}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 100,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PressBox;
