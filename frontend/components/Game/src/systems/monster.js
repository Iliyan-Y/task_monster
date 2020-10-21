import Matter from 'matter-js';
import { Dimensions } from 'react-native';
let i = 0;
let z = 0;

const UpdateMonster = (entities, { touches, time }) => {
  const engine = entities.physics.engine;

  if (i <= 130 && z == 0) {
    Matter.Body.setVelocity(entities.Monster.body, {
      x: -0.7,
      y: entities.Monster.body.velocity.y,
    });
    i++;
  }

  if (i == 129 && z < 130) {
    Matter.Body.setVelocity(entities.Monster.body, {
      x: +0.7,
      y: entities.Monster.body.velocity.y,
    });
    z++;
  }

  if (i == 129 && z == 129) {
    i = 0;
    z = 0;
  }

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
