import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button} from 'react-native';

const ResultsScreen = ({ route }) => {
    const { totalPoints } = route.params;
  
    return (
      <View>
        <Text>RESULTS SCREEN</Text>
        <Text>Total Points: {totalPoints}</Text>
      </View>
    );
  };

export default ResultsScreen;