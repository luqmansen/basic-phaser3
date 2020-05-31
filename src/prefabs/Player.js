import Entity from "./Entity";
import Beam from "../prefabs/Beam";
import Explosion from "../prefabs/Explosion";
import CONFIG from "../config/config";

export default class Player extends Entity {
  constructor(ctx, x, y, key) {
    super(ctx, x, y, key);

    this.spr.setCollideWorldBounds(true);
    this.createEntityAnims("cat", "spr-cat");
    this.spr.play("cat");
    this.cursorKeys = this.ctx.input.keyboard.createCursorKeys();

    this.speed = {
      base: 1,
      current: 200,
      max: 400,
    };

    this.alpha = 1;

    this.spacebar = this.ctx.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  playerInputManager() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.states.active) {
        this.shootBeam();
      }
    } else if (this.cursorKeys.left.isDown) {
      this.spr.setVelocityX(-this.speed.current);
    } else if (this.cursorKeys.right.isDown) {
      this.spr.setVelocityX(this.speed.current);
    } else if (this.cursorKeys.up.isDown) {
      this.spr.setVelocityY(-this.speed.current);
    } else if (this.cursorKeys.down.isDown) {
      this.spr.setVelocityY(this.speed.current);
    } else {
      this.spr.setVelocityX(0);
      this.spr.setVelocityY(0);
    }
  }

  shootBeam() {
    var beam = new Beam(this.ctx, this.spr.x, this.spr.y);
    beam.setScale(0.2);
  }

  resetPlayerPos() {
    this.spr.y = CONFIG.height + 20;
    this.spr.x = CONFIG.width / 2;
  }

  hurtPlayer(player) {
    if (this.alpha < 1) {
      return;
    }
    var x = this.spr.x;
    var y = this.spr.y;
    this.resetPlayerPos();

    var explosion = new Explosion(this.ctx, x, y);
    explosion.setScale(5);
    this.spr.disableBody(true, true);
    this.ctx.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false,
    });
    if (this.ctx.live == 0) {
      this.ctx.level = 1;
    }
    if (this.ctx.live >= 1) {
      this.ctx.live -= 1;
    }
  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
    this.ctx.sound.add("audio_pickup").play();
    this.ctx.live++;
    this.pickupNotif();
    this.ctx.time.addEvent({
      delay: 300,
      callback: this.removePickupNotif,
      callbackScope: this,
      loop: false,
    });
  }

  removePickupNotif() {
    this.ctx.pickupNotif.destroy();
  }

  pickupNotif() {
    this.ctx.pickupNotif = this.ctx.add.bitmapText(
      (CONFIG.width * 1) / 3,
      (CONFIG.height * 1) / 3,
      "ClickPixel",
      "LIVE +1",
      50
    );
  }

  resetPlayer() {
    var x = CONFIG.width / 2 - 8;
    var y = CONFIG.height + 64;
    this.spr.enableBody(true, x, y, true, true);

    this.alpha = 0.5;

    var tween = this.ctx.tweens.add({
      targets: this.spr,
      y: y - 128,
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: function () {
        this.alpha = 1;
      },
      callbackScope: this,
    });
  }
}
