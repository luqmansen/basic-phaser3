const App = function()
{
    'use strict'

    this.VERSION = '0.0.1';
    this.IS_DEV = true;
};

App.prototype.start = function () 
{
    'use strict'
    

    // Scenes
    let scenes = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);

    // Game config
    const config = {
        type            : Phaser.AUTO,
        parent          : 'phaser-app',
        title           : 'Phaser-Boilerplate', // CHANGE ME
        url             : 'https://github.com/luqmansen/phaser3-boilerplate', // CHANGE ME
        width           : 360,
        height          : 640,
        scene           : scenes,
        pixelArt        : true,
        backgroundColor : '0x000000'
    }

    // Game app
    let game = new Phaser.Game(config)
    
    // Globals
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