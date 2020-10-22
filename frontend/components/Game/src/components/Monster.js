import React, { useState, useContext, useEffect } from 'react';
import { Image, Animated, Easing } from 'react-native';
import { array, object, string } from 'prop-types';
import Matter from 'matter-js';
import { TasksContext } from '../../../../context';
const monster0 = require('../../assets/monster0.png');
const monster1 = require('../../assets/monster1.png');
const monster2 = require('../../assets/monster2.png');
const monster3 = require('../../assets/monster3.png');
const monster4 = require('../../assets/monster4.png');

const Monster = (props) => {
  const [scaleValue] = useState(new Animated.Value(1));
  let { score } = useContext(TasksContext);
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;
  const monsterSprite = getSprite();
  function getSprite() {
    if (score >= 0 && score <= 3) {
      return monster1;
    } else if (score >= 4 && score <= 7) {
      return monster2;
    } else if (score >= 8 && score <= 11) {
      return monster3;
    } else if (score >= 12) {
      return monster4;
    } else if (score < 0) {
      return monster0;
    }
  }
  function getWidth() {
    if (monsterSprite == monster0) {
      return width + 50
    } else {
      return width + 10 + score * 10
    }
  }
  function getHeight() {
    if (monsterSprite == monster0) {
      return height + 50;
    } else {
      return height + 10 + score * 10;
    }
  }
  function getTop() {
    if (monsterSprite == monster0) {
      return y - 30;
    } else {
      return y - 10 - score * 10;
    }
  }
const monsterAnimation = () => {
  Animated.sequence([
    Animated.timing(scaleValue, {
      toValue: 1.05,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ]).start(() => monsterAnimation());
};

  React.useEffect(() => {
    monsterAnimation();
  }, []);

    return (
      <Animated.Image
        style={{
          position: 'relative',
          left: x,
          top: getTop(),
          width: getWidth(),
          height: getHeight(),
          transform: [
            {
              scale: scaleValue,
            },
          ],
        }}
        resizeMode="stretch"
        source={monsterSprite}
      />
    );
};

export default (world, color, pos, size) => {
  const initialMonster = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height
  );
  Matter.World.add(world, [initialMonster]);

  return {
    body: initialMonster,
    size: [size.width, size.height],
    color: color,
    renderer: <Monster />,
  };
};

Monster.propTypes = {
  size: array,
  body: object,
  color: string,
};
