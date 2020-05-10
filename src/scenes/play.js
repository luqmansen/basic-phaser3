import Phaser from "phaser";
import CONFIG from "../config/config";
import Beam from "../prefabs/Beam";
import Explosion from "../prefabs/Explosion";
import { randInt } from "../prefabs/Helper";
import Player from "../prefabs/Player";

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: "Play", active: false });
  }

  init() {
    this.playerSpeed = 200;
    this.score = {
      current: 0,
      previous: 0,
    };
    this.level = 1;
  }

  create() {
    this.createBG();
    this.createLabel();
    this.createAudio();

    this.ship2 = this.add.sprite(
      CONFIG.width / 2 - 20,
      CONFIG.height / 2,
      "ship2"
    );
    this.ship1 = this.add.sprite(
      CONFIG.width / 2 + 50,
      CONFIG.height / 2,
      "ship"
    );
    this.ship3 = this.add.sprite(
      CONFIG.width / 2 - 80,
      CONFIG.height / 2,
      "ship3"
    );

    this.player = new Player(
      this,
      CONFIG.width / 2 - 8,
      CONFIG.height - 64,
      "cat"
    );

    this.powerUps = this.physics.add.group();

    var maxObjects = 4;
    for (var i = 0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, CONFIG.width, CONFIG.height);

      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    this.input.on("gameobjectdown", this.destroyShip, this);

    this.projectiles = this.add.group({
      classType: Beam,
      maxSize: 10,
      runChildUpdate: true,
    });

    this.physics.add.collider(this.projectiles, this.powerUps, function (
      projectile,
      powerUp
    ) {
      projectile.destroy();
    });


    this.player.createPhysics(this.powerUps, this.player.pickPowerUp);
    this.player.createPhysics(this.enemies, this.player.hurtPlayer);

    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );
  }

  update() {
    this.moveShip(this.ship1, randInt(1, 5) * this.level * 0.5);
    this.moveShip(this.ship2, randInt(2, 7) * this.level * 0.5);
    this.moveShip(this.ship3, randInt(3, 6) * this.level * 0.5);
    this.bg.tilePositionY -= 0.5;

    this.player.playerInputManager();

    for (var i; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }

    this.levelManager();
  }

  createBG() {
    this.bg = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, "bg");
    this.bg.setOrigin(0, 0);
    this.bg.setDepth(0);
    this.bg.setScale(CONFIG.gameScale);
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > CONFIG.height) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.y = 0;
    ship.x = Phaser.Math.Between(0, CONFIG.width);
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
    this.pickupSound.play();
  }

  hitEnemy(projectile, enemy) {
    var explosion = new Explosion(this, enemy.x, enemy.y).setScale(2);

    projectile.destroy();
    this.resetShipPos(enemy);
    this.score.current += 5;
    this.scoreLabel.text = "SCORE " + this.score.current;
  }

  levelManager() {
    if (this.score.current - this.score.previous >= 50) {
      this.score.previous = this.score.current;
      this.level++;
    }
    this.levelLabel.text = "LEVEL " + this.level;
  }

  createLabel() {
    this.scoreLabel = this.add.bitmapText(10, 5, "ClickPixel", "SCORE", 16);
    this.levelLabel = this.add.bitmapText(
      CONFIG.width * (3 / 4),
      5,
      "ClickPixel",
      "LEVEL",
      16
    );
  }


  createAudio() {
    this.music = this.sound.add("bgm");

    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.music.play(musicConfig);
  }
}
