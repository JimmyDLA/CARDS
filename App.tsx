/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroBox,
  ViroAnimations,
} from '@viro-community/react-viro';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');
  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking

    }
  }

  // [x, y, z]
  ViroAnimations.registerAnimations({
    rotate: {
      properties: {
        rotateY: '+=45'
      },
      duration: 250
    },
    bounce: {
      properties: {
        positionX: '+=0.1',
      },
      duration: 250,
      // easing: 'bounce',
    }
  });

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[-0.5, 0, -2]}
        style={styles.helloWorldTextStyle}
        animation={{ name: "bounce", run: true, loop: true }}
      />
      <ViroBox
        position={[3, -4.5, -10]}
        height={2}
        width={2}
        length={2}
        animation={{ name: "rotate", run: true, loop: true }}
      // scale={[.3, .3, .1]} materials={["grid"]} 
      />

    </ViroARScene>
  );
};

const App: () => Node = () => {
  const [isARon, setIsARon] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: !isDarkMode ? Colors.darker : Colors.lighter,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return !isARon ? (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={backgroundStyle}>
        <Text style={styles.title}>Welcome to CARDS</Text>
        <Button title="AR Demo" onPress={() => setIsARon(true)} />
      </View>
    </SafeAreaView>
  ) : (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={{ flex: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  title: {
    color: Colors.dark,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: "green",
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default App;
