import Phaser from "phaser";

export default {
  VERSION: "0.0.1",
  type: Phaser.AUTO,
  parent: "phaser-app",
  title: "SPACE\nCADE",
  url: "https://github.com/luqmansen/space-cade",
  width: 500,
  centerX: 500 / 2,
  height: 600,
  centerY: 600 / 2,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  gameScale: 2,
  IS_DEV: true,
  sound_on: true,
};
