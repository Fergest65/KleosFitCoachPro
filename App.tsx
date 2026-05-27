import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#B6FF00',
          fontSize: 32,
          fontWeight: '900',
        }}>
        KLEOS OK
      </Text>
    </View>
  );
}