// screens/WelcomeScreen.js
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido a REACTVOTE!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#6C63FF', // Fondo morado
  },
  text: {
    fontSize: 28,
    color: 'black', // Texto blanco
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
