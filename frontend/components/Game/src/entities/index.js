import Monster from '../components/Monster'
import Matter from 'matter-js'
import Ceiling from '../components/Ceiling'
import Floor from '../components/Floor'
import { height, width, heightRatio, widthRatio } from '../utils/styleSheet'

Matter.Common.isElement = () => false //-- Overriding this function because the original references HTMLElement

export default (restart) => {
  //-- Cleanup existing entities..
  if (restart) {
    Matter.Engine.clear(restart.physics.engine)
  }

  let engine = Matter.Engine.create({ enableSleeping: false })
  let world = engine.world
  world.gravity.y = 0.25
  const boxSize = 50

  return {
    physics: { engine: engine, world: world },
    Monster: Monster(
      world,
      'pink',
      { x: 220, y: 400 },
      { height: boxSize, width: boxSize },
    ),
    Floor: Floor(
      world,
      'pink',
      { x: width / 2, y: height - heightRatio * 40 },
      { height: heightRatio * 90, width: width },
    ),

    Ceiling: Ceiling(
      world,
      'pink',
      { x: width / 2, y: -heightRatio * 120 },
      { height: heightRatio * 120, width: width },
    ),
  }
}
