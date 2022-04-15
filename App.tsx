/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
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

// import {
//   ViroARScene,
//   ViroText,
//   ViroMaterials,
//   ViroBox,
//   Viro3DObject,
//   ViroAmbientLight,
//   ViroSpotLight,
//   ViroARPlane,
//   ViroARPlaneSelector,
//   ViroQuad,
//   ViroNode,
//   ViroAnimations,
//   ViroConstants
// } from 'react-viro';
import { HelloWorldSceneAR } from './demo'

import { Colors } from 'react-native/Libraries/NewAppScreen';

// const ARDemo = () => {
//   return (
//     <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>

//       {/* Text to show whether or not the AR system has initialized yet, see ViroARScene's onTrackingInitialized*/}
//       <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

//       <ViroBox position={[0, -.5, -1]}
//         animation={{ name: "rotate", run: true, loop: true }}
//         scale={[.3, .3, .1]} materials={["grid"]} />

//       <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />

//       <ViroSpotLight
//         innerAngle={5}
//         outerAngle={90}
//         direction={[0, -1, -.2]}
//         position={[0, 3, 1]}
//         color="#aaaaaa"
//         castsShadow={true}
//       />

//       {/* Node that contains a light, an object and a surface to catch its shadow
//             notice that the dragType is "FixedToWorld" so the object can be dragged
//             along real world surfaces and points. */}
//       <ViroNode position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={() => { }} >

//         {/* Spotlight to cast light on the object and a shadow on the surface, see
//               the Viro documentation for more info on lights & shadows */}
//         <ViroSpotLight
//           innerAngle={5}
//           outerAngle={45}
//           direction={[0, -1, -.2]}
//           position={[0, 3, 0]}
//           color="#ffffff"
//           castsShadow={true}
//           influenceBitMask={2}
//           shadowMapSize={2048}
//           shadowNearZ={2}
//           shadowFarZ={5}
//           shadowOpacity={.7} />

//         <Viro3DObject
//           source={require('./res/emoji_smile/emoji_smile.vrx')}
//           position={[0, .2, 0]}
//           scale={[.2, .2, .2]}
//           type="VRX"
//           lightReceivingBitMask={3}
//           shadowCastingBitMask={2}
//           transformBehaviors={['billboardY']}
//           resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
//           require('./res/emoji_smile/emoji_smile_specular.png'),
//           require('./res/emoji_smile/emoji_smile_normal.png')]} />

//         <ViroQuad
//           rotation={[-90, 0, 0]}
//           width={.5} height={.5}
//           arShadowReceiver={true}
//           lightReceivingBitMask={2} />

//       </ViroNode>

//       {/* Node that contains a light, an object and a surface to catch its shadow
//           notice that the dragType is "FixedToWorld" so the object can be dragged
//           along real world surfaces and points. */}
//       <ViroNode position={[.5, -.5, -.5]} dragType="FixedToWorld" onDrag={() => { }} >

//         {/* Spotlight to cast light on the object and a shadow on the surface, see
//               the Viro documentation for more info on lights & shadows */}
//         <ViroSpotLight
//           innerAngle={5}
//           outerAngle={45}
//           direction={[0, -1, -.2]}
//           position={[0, 3, 0]}
//           color="#ffffff"
//           castsShadow={true}
//           influenceBitMask={4}
//           shadowMapSize={2048}
//           shadowNearZ={2}
//           shadowFarZ={5}
//           shadowOpacity={.7} />

//         <Viro3DObject
//           source={require('./res/object_soccerball/object_soccer_ball.vrx')}
//           position={[0, .15, 0]}
//           scale={[.3, .3, .3]}
//           type="VRX"
//           lightReceivingBitMask={5}
//           shadowCastingBitMask={4}
//           transformBehaviors={['billboardY']}
//           resources={[require('./res/object_soccerball/object_soccer_ball_diffuse.png'),
//           require('./res/object_soccerball/object_soccer_ball_normal.png'),
//           require('./res/object_soccerball/object_soccer_ball_specular.png')]} />
//         <ViroQuad
//           rotation={[-90, 0, 0]}
//           width={.5} height={.5}
//           arShadowReceiver={true}
//           lightReceivingBitMask={4} />

//       </ViroNode>

//     </ViroARScene>
//   )
// }

const App: () => Node = () => {
  const [isARon, setIsARon] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
  ) : (<HelloWorldSceneAR />);
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
});

export default App;
