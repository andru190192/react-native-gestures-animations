import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';

import StyleGuide from '../components/StyleGuide';
import Selection from '../components/Selection';
import { FlexibleCard as Card, cards } from '../components/Card';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    paddingTop: 35,
  },
});

const column = {
  id: 'column',
  name: 'Column',
  layout: {
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

const row = {
  id: 'row',
  name: 'Row',
  layout: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
};

const wrap = {
  id: 'wrap',
  name: 'Wrap',
  layout: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    child: {
      flex: 0,
      width: width / 2 - StyleGuide.spacing * 2,
    },
  },
};

const currentLayout = wrap.layout;
const layouts = [column, row, wrap];
const transition = (
  <Transition.Change durationMs={400} interpolation="easeInOut" />
);

export default () => {
  const ref = useRef(null);
  const [currentLayout, setCurrentLayout] = useState(layouts[0].layout);
  return (
    <>
      <Transitioning.View
        style={[styles.container, currentLayout.container]}
        {...{ ref, transition }}>
        {cards.map((card) => (
          <Card key={card.id} style={currentLayout.child} {...{ card }} />
        ))}
      </Transitioning.View>
      {layouts.map((layout) => (
        <Selection
          key={layout.id}
          name={layout.name}
          isSelected={layout.layout === currentLayout}
          onPress={() => {
            if (ref.current) {
              ref.current.animateNextTransition();
            }
            setCurrentLayout(layout.layout);
          }}
        />
      ))}
    </>
  );
};
