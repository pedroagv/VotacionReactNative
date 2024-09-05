// screens/Screen2.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Screen2 = () => (
  <View style={styles.container}>
    <Text>Screen 2</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen2;
