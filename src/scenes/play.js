class Play extends Phaser.Scene{

    constructor() {
        super({key: 'Play', active: false});
    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;
        this.playerSpeed = 200
        this.score = 0
    }


    create(){
        this.bg = this.add.tileSprite(0, 0, this.CONFIG.width, this.CONFIG.height,"bg");
        this.bg.setOrigin(0,0)
        
        this.createLabel()


        this.ship2 = this.add.sprite(this.CONFIG.width/2 -20, this.CONFIG.height/2, "ship2")
        this.ship1 = this.add.sprite(this.CONFIG.width/2 +50, this.CONFIG.height/2, "ship")
        this.ship3 = this.add.sprite(this.CONFIG.width/2 -80, this.CONFIG.height/2, "ship3")

        
        this.player = this.physics.add.sprite(this.CONFIG.width /2-8, this.CONFIG.height -64, "cat")
        this.player.play("cat")
        this.player.setCollideWorldBounds(true)

        this.powerUps = this.physics.add.group()

        var maxObjects = 4;
        for (var i = 0; i<= maxObjects; i++){
            var powerUp = this.physics.add.sprite(16,16, "power-up")
            this.powerUps.add(powerUp)
            powerUp.setRandomPosition(0,0, this.CONFIG.width, this.CONFIG.height)

            if (Math.random() > 0.5){
                powerUp.play('red')
            } else {
                powerUp.play('gray')
            }

            powerUp.setVelocity(100,100)
            powerUp.setCollideWorldBounds(true)
            powerUp.setBounce(1)
        }


        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();


        this.enemies = this.physics.add.group()
        this.enemies.add(this.ship1)
        this.enemies.add(this.ship2)
        this.enemies.add(this.ship3)

        this.input.on('gameobjectdown', this.destroyShip, this);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
        this.projectiles = this.add.group({
            classType: Beam,
            maxSize: 10,
            runChildUpdate: true

        });

        this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
            projectile.destroy()
        })

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this)
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this)
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this)
    } 

    update(){
        this.moveShip(this.ship1, 1);
        this.moveShip(this.ship2, 1);
        this.moveShip(this.ship3, 1);
        this.bg.tilePositionY -= 0.5;
        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            if(this.player.active){
                this.shootBeam()
            }
        }

        for (var i; i < this.projectiles.getChildren().length; i++){
            var beam = this.projectiles.getChildren()[i];
            beam.update()
        }
    }

    moveShip(ship, speed){
        ship.y += speed
        if (ship.y > this.CONFIG.height) {
            this.resetShipPos(ship )
        }
    }

    resetShipPos(ship){
        ship.y = 0;
        ship.x = Phaser.Math.Between(0, this.CONFIG.width);
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
      }

    movePlayerManager(){
        if (this.cursorKeys.left.isDown){
            this.player.setVelocityX(-this.playerSpeed)
        } else if (this.cursorKeys.right.isDown){
            this.player.setVelocityX(this.playerSpeed)
        } else  if (this.cursorKeys.up.isDown){
            this.player.setVelocityY(-this.playerSpeed)
        } else if (this.cursorKeys.down.isDown){
            this.player.setVelocityY(this.playerSpeed)
        }else {
            this.player.setVelocityX(0)
            this.player.setVelocityY(0)
        }
    }

    shootBeam(){
        var beam = new Beam(this)
        beam.setScale(0.2)
    }

    pickPowerUp(player,powerUp){
        powerUp.disableBody(true, true)
    }

    hurtPlayer(player, enemy){
        this.resetShipPos(enemy);

        if(this.player.alpha < 1){
            return;
        }
        
        var explosion = new Explosion(this, player.x, player.y)
        player.disableBody(true,true)
        
        this.time.addEvent({
            delay:1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop:false
        })

    }

    resetPlayer(){
        var x = this.CONFIG.width / 2 - 8
        var y = this.CONFIG.height + 64
        this.player.enableBody(true,x,y, true, true);

        this.player.alpha = 0.5

        var tween = this.tweens.add({
            targets:this.player,
            y: y - 128,
            ease: "Power1",
            duration: 1500,
            repeat: 0,
            onComplete: function(){
                this.player.alpha = 1
            },
            callbackScope: this
        })
    }
    
    hitEnemy(projectile, enemy){

        var explosion = new Explosion(this, enemy.x, enemy.y)

        projectile.destroy()
        this.resetShipPos(enemy)
        this.score +=5
        this.scoreLabel.text = "SCORE " + this.score;
    }

    createLabel(){
        this.scoreLabel = this.add.bitmapText(10,5, "ClickPixel", "SCORE", 16)
    }
}