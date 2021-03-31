import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { MainStackParamList } from '../navigation/Stack';

type PartnerProfileScreenRouteProp = RouteProp<
  MainStackParamList,
  'PartnerProfile'
>;

interface Props {
  route: PartnerProfileScreenRouteProp;
}

function PartnerProfile({ route }: Props) {
  const { name, age, gender, sexuality } = route.params.profile;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{name}</Text>
      <Text style={styles.label}>{age}</Text>
      <Text style={styles.label}>{gender}</Text>
      <Text style={styles.label}>{sexuality}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default PartnerProfile;
