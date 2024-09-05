import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Screen1 = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData(data);
    setModalVisible(false); // Cierra el modal cuando se escanea un QR
  };

  if (hasPermission === null) {
    return <Text style={styles.permissionText}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.permissionText}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Escanea un código QR válido o ingresa el código manualmente para acceder a la reunión.
      </Text>
      <TextInput
        style={styles.input}
        value={scannedData}
        placeholder="Código QR escaneado aparecerá aquí"
        onChangeText={setScannedData} // Permite actualizar el estado con el texto ingresado
      />
      <Button
        title="Escanear QR"
        onPress={() => setModalVisible(true)}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.camera}
          />
          <TouchableOpacity style={styles.buttonTouchable} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Fondo blanco
  },
  instructionText: {
    fontSize: 24,
    color: '#000', // Texto negro
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 24,
    height: 60,
    borderColor: '#000', // Borde negro
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000', // Texto negro
    backgroundColor: '#fff', // Fondo blanco
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semitransparente negro para el modal
  },
  camera: {
    width: '90%',
    height: '80%',
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor: '#fff', // Fondo blanco
  },
  buttonText: {
    fontSize: 24,
    color: '#000', // Texto negro
  },
  permissionText: {
    fontSize: 24,
    color: '#000', // Texto negro
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 15,
  },
});

export default Screen1;
