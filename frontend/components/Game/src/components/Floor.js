import React from 'react';
import { View, Image } from 'react-native';
import { array, object, string } from 'prop-types';
import Matter from 'matter-js';

const ground = require('../../assets/ground.png');

const Floor = (props) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - width + 275;
  return (
    // <View
    /* style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: props.color || 'pink',
        },
      ]}
    > */
    <Image
      style={{
        width: width + 200,
        height: height,
        position: 'absolute',
        left: x - 100,
        top: y
      }}
      source={ground}
      resizeMode="stretch"
    />
    // </View>
  );
};

export default (world, color, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { isStatic: true, friction: 1 }
  );
  Matter.World.add(world, [initialFloor]);

  return {
    body: initialFloor,
    size: [size.width, size.height],
    color: color,
    renderer: <Floor />,
  };
};

Floor.propTypes = {
  size: array,
  body: object,
  color: string,
};