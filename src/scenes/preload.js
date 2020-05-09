
class Preload extends Phaser.Scene {

    constructor() {
        super({key: 'Preload', active: false})
    }

    init(){
        this.URL = this.sys.game.URL
        this.CONFIG = this.sys.game.CONFIG
    }

    preload(){
        this.createBackground();
        this.createLoadingBar()

        // Image
        this.load.setPath(this.URL + 'src/assets/img')
        this.load.spritesheet('spr-cat', 'spr-cat.png', {frameWidth:31, frameHeight:33,endFrame:11, margin: 0, spacing: 0})
        this.load.image('sky',   'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.image('bg', 'background.png');

        this.load.setPath(this.URL + 'src/assets/spr')
        this.load.spritesheet('ship', 'ship.png', {frameWidth:16, frameHeight: 16});
        this.load.spritesheet('ship2', 'ship2.png', {frameWidth:32, frameHeight: 16});
        this.load.spritesheet('ship3', 'ship3.png', {frameWidth:32, frameHeight: 32});
        this.load.spritesheet('explosion', 'explosion.png', {frameWidth:16, frameHeight: 16});
        this.load.spritesheet('power-up', 'power-up.png', {frameWidth:16, frameHeight: 16});
        this.load.spritesheet('beam', 'ball.png', {frameWidth:99, frameHeight: 94});

        this.load.setPath(this.URL + 'src/assets/audio')
        this.load.audio('audio_beam', 'laserfire01.ogg')
        this.load.audio('audio_pickup', 'SFX_Pickup_44.mp3')
        this.load.audio('audio_explosion', 'explosion.wav')
        this.load.audio('bgm', 'platformer-level-08.mp3')



    }

    create(){
        this.scene.start('Play');
        this.createAnimation()

    }

    createLoadingBar(){
        // this.title = new Text();
        //Progress text
        this.txt_progress = new PhaserText(
            this,
            this.CONFIG.centerX,
            75,
            'Loading Game',
            'preload',
            0.5
        )
        //Progress text
        this.txt_progress = new PhaserText(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY - 5,
            'Loading...',
            'preload',
            {x: 0.5, y : 1}
        )
        //Progress bar
        let x= 10
        let y = this.CONFIG.centerY + 5;
        this.progress = this.add.graphics({x:x, y:y})
        this.border = this.add.graphics({x:x, y:y});

        // Progress callback
        this.load.on('progress', this.onProgress, this )
    }

    onProgress(value){
        let w = this.CONFIG.width - 2*this.progress.x;
        let h = 36;

        this.progress.clear();
        this.progress.fillStyle('0xFFFFFF', 1)
        this.progress.fillRect(0,0, w*value, h)

        this.border.clear()
        this.border.lineStyle(4, '0x4D5699')
        this.border.strokeRect(0,0, w*value, h);

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