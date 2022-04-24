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
  ViroFlexView,
  ViroAnimations,
  ViroARPlane,
  ViroImage,
} from '@viro-community/react-viro';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const hand = [1, 2, 3, 4];
const HelloWorldSceneAR = () => {
  const deck = [];

  for (let i = 1; i < 5; i++) {
    for (let j = 2; j < 15; j++) {
      deck.push(j);
    }
  }

  function shuffleArr(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]]
    }
  }

  const game = {
    red: {
      deck: [],
      takenDeck: [],
      placeholder: []
    },
    blue: {
      deck: [],
      takenDeck: [],
      placeholder: []
    }
  }

  function splitDeck(aDeck) {
    shuffleArr(aDeck);

    const half = Math.ceil(aDeck.length / 2);

    game.red.deck = aDeck.slice(0, half)
    game.blue.deck = aDeck.slice(-half)
  }

  function idw() {
    const bluePlaceholder = [];
    const redPlaceholder = [];
    for (let i = 0; i < 5; i++) {
      bluePlaceholder.push(game.blue.deck.shift());
      redPlaceholder.push(game.red.deck.shift());
    }
    return { bluePlaceholder, redPlaceholder }
  }

  function compare(a, b) {
    if (a === b) {
      //IDW
      // take 4 cards from each
      // compare the 2 last cards
      console.log('WAR!', a, '=', b)
      const placeholders = idw();
      game.blue.placeholder = placeholders.bluePlaceholder;
      game.red.placeholder = placeholders.redPlaceholder;

      compare(game.red.placeholder[3], game.blue.placeholder[3])
    } else if (a > b) {
      // add to game.blue.takenDeck
      const { takenDeck, placeholder: bluePlaceholder } = game.blue;
      const { placeholder: redPlaceholder } = game.red;
      game.blue.takenDeck = [...takenDeck, ...bluePlaceholder, ...redPlaceholder];
    } else {
      // add to game.red.takenDeck
      const { takenDeck, placeholder: redPlaceholder } = game.red;
      const { placeholder: bluePlaceholder } = game.blue;

      game.red.takenDeck = [...takenDeck, ...bluePlaceholder, ...redPlaceholder];

    }
  }

  function drawCard() {
    if (game.blue.deck.length === 0 || game.red.deck.length === 0) {
      // game over
      console.log('GAMEOVER')
    } else {
      const blueCard = game.blue.deck.shift();
      const redCard = game.red.deck.shift();
      game.blue.placeholder = [blueCard];
      game.red.placeholder = [redCard];
      compare(blueCard, redCard)

    }
  }

  splitDeck(deck)
  drawCard()

  console.log(game)




  const [flat, setFlat] = useState([0, 0, 0])
  const [text, setText] = useState('Initializing AR...');
  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    setTimeout(() => {
      console.log('settimeout')
      setFlat([-90, 0, 0])
    }, 3000);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Welcome!');
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
        position={[0, 0, -2]}
        style={styles.helloWorldTextStyle}
      // animation={{ name: "rotate", run: true, loop: true }}
      />
      {/* {hand.map((card, i) => (
        <ViroImage
          key={`${card}card`}
          height={0.15}
          width={0.1}
          placeholderSource={require("./assets/grid_bg.jpg")}
          source={require('./assets/ace.png')}
          position={[0.05 * i, -0.3, -0.3 + (0.01 * i)]}
        />
      ))} */}
      <ViroARPlane height={1} width={1} backgroundColor="pink" >
        {/* <ViroFlexView rotation={[-90, 0, 0]} width={1} height={1} style={{ backgroundColor: 'pink', opacity: 0.2 }}> */}
        <ViroImage
          height={0.15}
          width={0.1}
          placeholderSource={require("./assets/grid_bg.jpg")}
          source={require('./assets/ace.png')}
          position={[0.05, 0, 0.4]}
          rotation={[-90, 50, 0]}
        />

        <ViroImage
          height={0.15}
          width={0.1}
          placeholderSource={require("./assets/grid_bg.jpg")}
          source={require('./assets/ace.png')}
          position={[0.22, 0, 0.4]}
          rotation={[-90, 50, 0]}
        />
        {/* </ViroFlexView> */}
      </ViroARPlane>

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
    color: "blue",
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default App;
