import React from 'react'
import { View, Image } from 'react-native'
import { array, object, string } from 'prop-types'
import Matter from 'matter-js'

const clouds = require('../../assets/clouds.png')

const Ceiling = (props) => {
  const width = props.size[1]
  const height = props.size[1]
  const x = props.body.position.x - width / 8
  const y = props.body.position.y - height / 8
  return (
    <Image
      style={{
        width: width,
        height: height,
        position: 'absolute',
        left: x - 50,
        top: y + 150,
      }}
      source={clouds}
      resizeMode="stretch"
    />
  )
}

export default (world, color, pos, size) => {
  const initialCeiling = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { isStatic: true, friction: 1 },
  )
  Matter.World.add(world, [initialCeiling])

  return {
    body: initialCeiling,
    size: [size.width, size.height],
    color: color,
    renderer: <Ceiling />,
  }
}

Ceiling.propTypes = {
  size: array,
  body: object,
  color: string,
}
