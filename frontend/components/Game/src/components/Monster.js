import React, {useContext} from 'react';
import { Image } from 'react-native';
import { array, object, string } from 'prop-types';
import Matter from 'matter-js';
import { TasksContext } from '../../../../context';

const monster = require('../../assets/monster.png');

const Monster = (props) => {
  let { score } = useContext(TasksContext);
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;  

  return (
    <Image
      style={{
        position: 'relative',
        left: x,
        top: y,
        width: width,
        height: height,
      }}
      resizeMode="stretch"
      source={monster}
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
  color: string
};
