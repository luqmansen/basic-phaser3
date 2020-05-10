import Phaser from "phaser";
import CONFIG from "../config/config";
import PhaserText from "../prefabs/PhaserText";

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu", active: false });
  }

  init() {
    this.CONFIG = CONFIG;
  }

  create() {
    this.createBG();

    this.title = new PhaserText(
      this,
      this.CONFIG.width / 2,
      (this.CONFIG.height / 2) * 0.5,
      this.CONFIG.title,
      40 * this.CONFIG.gameScale
    );

    this.text = new PhaserText(
      this,
      this.CONFIG.width / 2,
      this.CONFIG.height / 2,
      "click to play",
      20 * this.CONFIG.gameScale
    );

    this.createMouseInput();
    this.createKeyboardInput();
  }

  createMouseInput() {
    this.input.on("pointerup", this.goPlay, this);
  }

  createKeyboardInput() {
    function handleKeyUp(e) {
      switch (e.code) {
        case "Enter":
          this.goPlay();
          break;
      }
    }
    this.input.keyboard.on("keyup", handleKeyUp, this);
  }

  goPlay() {
    this.scene.start("Play");
  }

  createBG() {
    this.bg = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, "menu-bg");
    this.bg.setOrigin(0, 0);
    this.bg.setDepth(0);
    this.bg.setScale(CONFIG.gameScale);
  }
}
