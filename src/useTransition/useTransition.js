import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTransition } from 'react-native-redash';

import StyleGuide from '../components/StyleGuide';
import Button from '../components/Button';
import { FlexibleCard as Card, cards } from '../components/Card';

const { multiply, interpolate, not } = Animated;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: StyleGuide.spacing * 4,
  },
});

const transformOrigin = -1 * (width / 2 - StyleGuide.spacing * 2);

export default () => {
  const [toggled, setToggled] = useState(0);
  const transition = useTransition(toggled, not(toggled), toggled);
  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const direction = interpolate(index, {
          inputRange: [0, 1, 2],
          outputRange: [-1, 0, 1],
        });
        const rotate = multiply(
          direction,
          interpolate(transition, {
            inputRange: [0, 1],
            outputRange: [0, Math.PI / 6],
          }),
        );
        return (
          <Animated.View
            key={card.id}
            style={[
              styles.overlay,
              {
                transform: [
                  { translateX: transformOrigin },
                  { rotate },
                  { translateX: -transformOrigin },
                ],
              },
            ]}>
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button
        label={toggled ? 'Reset' : 'Start'}
        primary
        onPress={() => setToggled(toggled ^ 1)}
      />
    </View>
  );
};
