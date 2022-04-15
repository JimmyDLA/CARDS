'use strict';

import React, { PureComponent } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroQuad,
  ViroNode,
  ViroAnimations,
} from '@viro-community/react-viro';


export class HelloWorldSceneAR extends PureComponent {
  constructor() {
    super();
    this.state = {
      hasARInitialized: false,
      text: "Initializing AR...",
    }
  }


  _onTrackingUpdated(state, reason) {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    if (!this.state.hasARInitialized && state == 3) {
      this.setState({
        hasARInitialized: true,
        text: "Hello World!"
      });
    }
  }
  getInitialState() {
    return {
      hasARInitialized: false,
      text: "Initializing AR...",
    };
  };
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>

        {/* Text to show whether or not the AR system has initialized yet, see ViroARScene's onTrackingInitialized*/}
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

        <ViroBox position={[0, -.5, -1]}
          animation={{ name: "rotate", run: true, loop: true }}
          scale={[.3, .3, .1]} materials={["grid"]} />

        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -.2]}
          position={[0, 3, 1]}
          color="#aaaaaa"
          castsShadow={true}
        />


      </ViroARScene>
    );
  };
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./grid_bg.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

// module.exports = HelloWorldSceneAR;