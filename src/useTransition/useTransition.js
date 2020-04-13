import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Transition, Transitioning } from 'react-native-reanimated';

import StyleGuide from '../components/StyleGuide';
import Button from '../components/Button';
import { FlexibleCard as Card, cards } from '../components/Card';

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

export default () => {
  const [toggled, setToggled] = useState(0);
  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const rotate = toggled ? Math.PI / 6 : 0;
        return (
          <Animated.View
            key={card.id}
            style={[
              styles.overlay,
              {
                transform: [{ rotate: `${rotate}rad` }],
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
