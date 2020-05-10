export default class Entity {
  constructor(ctx, x, y, key) {
    this.ctx = ctx;
    this.key = key;
    this.x = x;
    this.y = y;

    this.states = {
      active: true,
      hurt: false,
      death: false,
      last: false,
    };

    this.health = {
      total: 1,
      current: 1,
    };

    this.speed = {
      base: 1,
      current: 1,
      max: 200,
    };

    this.createEntity();
  }

  createEntity() {
    this.spr = this.ctx.physics.add.sprite(this.x, this.y, this.key);
    this.spr.setOrigin(0.5);
  }

  createPhysics(otherObject, callback) {
    this.ctx.physics.add.overlap(this.spr, otherObject, callback, null, this);
  }

  scaleEntity(scale) {
    this.spr.setScale(scale);
  }

  createEntityAnims(
    animsKey,
    spriteKey,
    framerate = 20,
    repeat = -1,
    hideOnComplete = false
  ) {
    this.ctx.anims.create({
      key: animsKey,
      frames: this.ctx.anims.generateFrameNumbers(spriteKey),
      frameRate: framerate,
      repeat: repeat,
      hideOnComplete: hideOnComplete,
    });
  }

  destroyEntity() {
    if (this.spr) {
      this.spr.destroy();
    }
    this.spr = false;
  }

  createShadow() {
    this.shadow = this.ctx.add.graphics({ x: this.x, y: this.y });

    let alpha = 0.4;
    let radius = 8;

    this.shadow.fillStyle("0x000000", alpha);
    this.shadow.fillCircle(0, 0, radius);
  }

  setState(key) {
    if (!this.states.hasOwnProperty(key)) {
      console.log(this.key + "Invalid state");
    }

    if (this.states.last === key) {
      return;
    }

    this.resetStates();
    this.states[key] = true;
    this.states.last = key;
  }

  setCurrentSpeed(speed) {
    this.speed.current = speed;
  }

  resetStates() {
    for (let key in this.states) {
      this.states[key] = false;
    }
  }
}
