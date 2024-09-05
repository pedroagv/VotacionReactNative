// screens/SplashScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, Animated, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const SplashScreen = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(true); // Estado para la conectividad
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Verificar la conectividad al cargar la pantalla
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Definir la animación de rotación
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Limpiar el evento de escucha
    return () => unsubscribe();
  }, [spinValue]);

  useEffect(() => {
    if (isConnected === null) return; // Esperar hasta que se determine la conectividad

    if (isConnected) {
      setTimeout(() => {
        navigation.replace('Bienvenido');
        setTimeout(() => {
          navigation.replace('Main');
        }, 5000);
      }, 5000);
    } else {
      // Manejar la falta de conectividad, por ejemplo, mostrar un mensaje o redirigir a una pantalla de error
      setTimeout(() => {
        navigation.replace('NoInternet'); // Reemplaza con tu pantalla de falta de conexión
      }, 5000);
    }
  }, [isConnected, navigation]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      {!isConnected ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Animated.Image
          source={require('../assets/loading.gif')} // Reemplaza con la ruta a tu imagen
          style={[styles.image, { transform: [{ rotate: spin }] }]}
        />
      )}
      <Text style={styles.text}>Cargando sistema REACTVOTE...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#4A90E2', // Fondo azul
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: 'black', // Texto blanco
    fontWeight: 'bold',
  },
});

export default SplashScreen;
