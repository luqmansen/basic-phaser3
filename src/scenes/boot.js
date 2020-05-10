import Phaser from 'phaser'
import {importAll} from '../prefabs/Helper'

const fonts = importAll(require.context('../assets/fonts', false, /\.(png|jpe?g|svg|xml)$/));
  

export default class Boot extends Phaser.Scene {

    constructor() {
        super({key: 'Boot', active: true})
    }


    preload(){
        this.load.bitmapFont('ClickPixel', fonts['ClickPixel.png'], fonts['click.xml'])
    }

    create(){
        this.scene.start('Preload')
    }
}