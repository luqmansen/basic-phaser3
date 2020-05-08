
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

        // Spritesheets
        this.load.setPath(this.URL + 'src/assets/img')
        this.load.spritesheet('spr-cat', 'spr-cat.png', {frameWidth:16, frameHeight:16,endFrame:4, margin: 1, spacing: 2})
    }

    create(){
        this.time.addEvent({
            delay : 100,
            callback: () => {this.scene.start('Menu');},
            callbackScope : this
        });
    }

    createLoadingBar(){
        this.title = new Text();
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
}