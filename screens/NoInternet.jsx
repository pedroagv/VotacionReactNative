// screens/NoInternet.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NoInternet = ({ navigation }) => {
  // Función para intentar nuevamente verificar la conexión a Internet
  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      navigation.replace('Bienvenido'); // Redirige si la conexión se restablece
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No hay conexión a Internet.</Text>
      <Text style={styles.description}>
        Verifica tu conexión a Internet y vuelve a intentar.
      </Text>
      <Button title="Intentar nuevamente" onPress={checkConnectivity} />
      <Button title="Salir" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#721c24',
    marginBottom: 20,
  },
});

export default NoInternet;
