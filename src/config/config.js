import Phaser from 'phaser'

export default {
    type            : Phaser.AUTO,
        parent          : 'phaser-app',
        title           : 'Phaser-Boilerplate', // CHANGE ME
        url             : 'https://github.com/luqmansen/phaser3-boilerplate', // CHANGE ME
        width           : 256,
        height          : 272,
        pixelArt        : true,
        physics         : {
            default : "arcade",
            arcade  :{
                debug : false
            }
        }
    }

  