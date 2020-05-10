export default class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    // these number to make sure beam shots in front of player
    super(scene, x + 50, y + 26, "beam");

    scene.add.existing(this);
    scene.projectiles.add(this);
    scene.physics.world.enableBody(this);

    this.scene.sound.add("audio_beam").play();
    this.play("beam_anim");
    this.body.velocity.y = -250;
  }

  update() {
    if (this.y < 20) {
      this.destroy();
    }
  }
}
