const App = function()
{
    'use strict'

    this.VERSION = '0.0.1';
    this.IS_DEV = true;
};

App.prototype.start = function () 
{
    'use strict'
    
    let scenes = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);
    scenes.push(Play);

    const config = {
        type            : Phaser.AUTO,
        parent          : 'phaser-app',
        title           : 'Phaser-Boilerplate', // CHANGE ME
        url             : 'https://github.com/luqmansen/phaser3-boilerplate', // CHANGE ME
        width           : 256,
        height          : 272,
        scene           : scenes,
        pixelArt        : true,
        physics         : {
            default : "arcade",
            arcade  :{
                debug : false
            }
        }
    }

    let game = new Phaser.Game(config)
    
    game.IS_DEV = this.IS_DEV;
    game.VERSION = this.VERSION;

    game.URL = '';

    game.CONFIG = {
        width : config.width,
        height : config.height,
        centerX : Math.round(0.5 * config.width),
        centerY : Math.round(0.5 * config.height),
        tile : 32
    }

    // Sound
    game.sound_on = true;


};