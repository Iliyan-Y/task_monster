import React, { PureComponent } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Entities from './src/entities';
import { GameEngine } from 'react-native-game-engine';
import Systems from './src/systems';

export default class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      running: true,
    };
    this.gameEngine = null;
    console.disableYellowBox = true;
  }

  restart = () => {
    this.setState({ running: true });
    this.gameEngine.swap(Entities());
  };

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          style={styles.gameContainer}
          running={this.state.running}
          systems={Systems}
          entities={Entities()}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});