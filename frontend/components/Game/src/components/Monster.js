import React, { useContext } from 'react';
import { Image } from 'react-native';
import { array, object, string } from 'prop-types';
import Matter from 'matter-js';
import { TasksContext } from '../../../../context';
const monster0 = require('../../assets/monster0.png');
const monster1 = require('../../assets/monster1.png');
const monster2 = require('../../assets/monster2.png');
const monster3 = require('../../assets/monster3.png');
const monster4 = require('../../assets/monster4.png');

const Monster = (props) => {
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
    
  }
  function getHeight() {

  }

    return (
      <Image
        style={{
          position: 'relative',
          left: x,
          top: y - score * 10,
          width: width + score * 10,
          height: height + score * 10,
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
