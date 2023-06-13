import { AggregateRoot } from '@nestjs/cqrs';

export class Pokemon extends AggregateRoot {
  constructor(
    private readonly name: string,
    private readonly sprites: {
      front_default: string;
    },
    private readonly types: {
      type: {
        name: string;
      };
    }[],
  ) {
    super();
  }

  getName() {
    return this.name;
  }

  getFrontSprite() {
    return this.sprites.front_default;
  }

  getTypes() {
    return this.types.map(({ type: { name } }) => name);
  }
}
