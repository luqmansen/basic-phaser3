class Boot extends Phaser.Scene {

    constructor() {
        super({key: 'Boot', active: true})
    }

    init(){
        this.URL = this.sys.game.URL
        this.CONFIG = this.sys.game.CONFIG
    }

    preload(){
        // Bitmap font for preload scenes
        this.load.setPath(this.URL + 'src/assets/fonts')
        this.load.bitmapFont('ClickPixel', 'ClickPixel.png', 'click.xml')
    }

    create(){
        this.scene.start('Preload')
    }
}