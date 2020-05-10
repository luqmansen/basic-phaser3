import Phaser from 'phaser'
import CONFIG from '../config/config'
import PhaserText from '../prefabs/PhaserText'


export default class Menu extends Phaser.Scene {

    constructor() {
        super({key:'Menu', active: false})
    }

    init() {
        this.CONFIG = CONFIG;
    }

    create(){
        this.createBackground();

        this.title = new PhaserText(
            this,
            this.CONFIG.width/2,
            this.CONFIG.height/2 * 0.3,
            'Phaser 3\nBoilerplate',
            'title'
        )

        this.text = new PhaserText(
            this,
            this.CONFIG.width/2,
            this.CONFIG.height/2,
            'click to play',
            'standard'
        );

        this.createMouseInput();
        this.createKeyboardInput();

    }

    createMouseInput(){
        this.input.on('pointerup', this.goPlay, this);
    }

    createKeyboardInput(){
        function handleKeyUp(e) {
            switch (e.code) {
                case 'Enter':
                    this.goPlay();
                    break;
            }

        }
        this.input.keyboard.on('keyup', handleKeyUp, this);
    }

    goPlay(){
        this.scene.start('Play');
    }

    createBackground() {
        this.bg = this.add.graphics({x: 0, y:0})
        this.bg.fillStyle('0xF4CCA1',1)
        this.bg.fillRect(0,0, this.CONFIG.width,this.CONFIG.height)
    }
}