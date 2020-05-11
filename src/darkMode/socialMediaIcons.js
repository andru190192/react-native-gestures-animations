import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import StyleGuide from '../components/StyleGuide';

const size = 64;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: StyleGuide.palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default () => {
  return (
    <View style={styles.container}>
      {['github', 'twitter', 'facebook'].map((name) => (
        <View key={name} style={styles.icon}>
          <Icon name="github" color="white" size={32} {...{ name }} />
        </View>
      ))}
    </View>
  );
};
