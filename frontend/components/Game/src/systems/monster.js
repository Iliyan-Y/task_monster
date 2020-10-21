import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const UpdateMonster = (entities, { touches, time }) => {
  const engine = entities.physics.engine;
  let i = 0
  let z = 0
  
  
  // if (i < 10 && z == 0) {
  //   Matter.Body.setVelocity(entities.Monster.body, {
  //     x: -1,
  //     y: entities.Monster.body.velocity.y,
  //   });
  //   i++
  //   console.log(i)
  //   console.log(z);
  // } else if (i == 10 && z < 10) {
  //   Matter.Body.setVelocity(entities.Monster.body, {
  //     x: +1,
  //     y: entities.Monster.body.velocity.y,
  //   });
  //   z++
  // } else if (i == 10 && z == 10) {
  //   i = 0;
  //   z = 0;
  //   console.log('reset');
  // }

   touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Monster.body, {
        x: entities.Monster.body.velocity.x,
        y: -3,
      });
    });
  
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default UpdateMonster;
