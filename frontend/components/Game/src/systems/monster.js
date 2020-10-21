import Matter from 'matter-js';
import { Dimensions } from 'react-native';
let leftValue = 0;
let rightValue = 0;

const UpdateMonster = (entities, { touches, time }) => {
  const engine = entities.physics.engine;

  if (leftValue < 130 && rightValue == 0) {
    Matter.Body.setVelocity(entities.Monster.body, {
      x: -0.7,
      y: entities.Monster.body.velocity.y,
    });
    leftValue++;
  }

  if (leftValue == 129 && rightValue < 130) {
    Matter.Body.setVelocity(entities.Monster.body, {
      x: +0.7,
      y: entities.Monster.body.velocity.y,
    });
    rightValue++;
  }

  if (leftValue == 129 && rightValue == 129) {
    leftValue = 0;
    rightValue = 0;
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
