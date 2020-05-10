import Phaser from 'phaser'
import CONFIG from '../config/config'
import PhaserText from '../prefabs/PhaserText'
import { importAll } from "../prefabs/Helper";

const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));
const sprites = importAll(require.context('../assets/sprites', false, /\.(png|jpe?g|svg)$/));
const sfx = importAll(require.context('../assets/audio/sfx', false, /\.(wav|ogg|mp3)$/));
const bgm = importAll(require.context('../assets/audio/bgm', false, /\.(wav|ogg|mp3)$/));


export default class Preload extends Phaser.Scene {

    constructor() {
        super({key: 'Preload', active: false})
    }

    init(){
        this.CONFIG = CONFIG
    }

    preload(){
        this.createBackground();
        this.createLoadingBar();

        // this.load.image('sky', images['sky.png']);
        // this.load.image('ground', images['platform.png']);
        // this.load.image('star', images['star.png']);
        // this.load.image('bomb', images['bomb.png']);
        this.load.image('bg', images['background.png']);
        this.load.image('menu-bg', images['space-cade.jpg']);

        this.load.spritesheet('spr-cat', sprites['spr-cat.png'], {frameWidth:31, frameHeight:33,endFrame:11, margin: 0, spacing: 0})
        this.load.spritesheet('ship', sprites['ship.png'], {frameWidth:16, frameHeight: 16});
        this.load.spritesheet('ship2', sprites['ship2.png'], {frameWidth:32, frameHeight: 16});
        this.load.spritesheet('ship3', sprites['ship3.png'], {frameWidth:32, frameHeight: 32});
        this.load.spritesheet('explosion', sprites['explosion.png'], {frameWidth:16, frameHeight: 16});
        this.load.spritesheet('power-up', sprites['power-up.png'], {frameWidth:16, frameHeight: 16});
        this.load.spritesheet('beam', sprites['ball.png'], {frameWidth:99, frameHeight: 94});

        this.load.audio('audio_beam', sfx['laserfire01.ogg'])
        this.load.audio('audio_pickup', sfx['SFX_Pickup_44.mp3'])
        this.load.audio('audio_explosion', sfx['explosion.wav'])
        this.load.audio('bgm', bgm['platformer-level-08.mp3'])
    }

    create(){
        this.createAnimation()
        this.scene.start('Menu');
    }

    createLoadingBar(){
        this.txt_progress = new PhaserText(
            this,
            this.CONFIG.centerX,
            75,
            'Loading Game',
            30 * CONFIG.gameScale,
            0.5
        )
        this.txt_progress = new PhaserText(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY - 5,
            'Loading...',
            25 * CONFIG.gameScale,
            {x: 0.5, y : 1}
        )
        
        //Progress 
        let x= CONFIG.centerX
        let y = this.CONFIG.centerY + 5;
        this.load.on('progress', this.onProgress, this )
    }

    onProgress(value){
        this.txt_progress.setText(Math.round(value * 100) + '%')
    }

    createBackground() {
        this.bg = this.add.graphics({x: 0, y:0})
        this.bg.fillStyle('0xF5CCA1',1)
        this.bg.fillRect(0,0, this.CONFIG.width,this.CONFIG.height)
    }

    createAnimation(){
        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate:20,
            repeat: -1
        });

        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate:20,
            repeat: -1
        });


        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate:20,
            repeat: -1
        });     


        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate:20,
            repeat: 0,
            hideOnComplete: true
        })

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up",
            {
                start: 0,
                end : 1
            }),
            frameRate:20,
            repeat: -1,
        })

        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 2,
                end : 3
            }),
            frameRate:20,
            repeat: -1,
        })

        this.anims.create({
            key: "cat",
            frames: this.anims.generateFrameNumbers("spr-cat",
            {
                start:9,
                end:11
            }),
            frameRate:5,
            repeat: -1,
        })

        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam",
            {
                start:0,
                end:8
            }),
            frameRate:5,
            repeat: -1,
        })
    }
}