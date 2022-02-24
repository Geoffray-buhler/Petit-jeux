// import Phaser from "phaser";
// import LoadingScene from './loadingScene'

let player, ball, blueBrick, greenBrick, redBrick, orangeBrick, cursors
let gameStart = false;
let score = 0;
let life = 3;
let scoreText;
let lifeText;
let rick;
let first = true;

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  debug: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false
    }
  }
}

const game = new Phaser.Game(config)

function preload() {

  this.load.audio('rick', './assets/streams.ogg')
  this.load.image('background', './assets/sky.png')
  this.load.image('ball', './assets/ball.png')
  this.load.image('brick1', './assets/brick-blue.png')
  this.load.image('brick2', './assets/brick-green.png')
  this.load.image('brick3', './assets/brick-red.png')
  this.load.image('brick4', './assets/brick-orange.png')
  this.load.image('paddle', './assets/paddle.png')
}

function create() {

    //background
    this.add.sprite(0,0, 'background').setOrigin(0,0).setScale(1.40)

    //Rick roll 'em
    this.rickRolled = this.sound.add('rick')
    this.rickRolled.play()

  //setting up scoreboard
  scoreText = this.add.text(5, 5, 'Score: 0', { fontSize: '28px', fill: '#fff' });
  lifeText = this.add.text(700, 5, 'Vie: 3', { fontSize: '28px', fill: '#fff' });

  //creating player via paddle
  player = this.physics.add.sprite(
    400, //x position
    600, //y position
    'paddle'
  ).setScale(.15),
  player.setImmovable(true)
  player.body.collideWorldBounds = true;

      // Pointer lock will only work after an 'engagement gesture', e.g. mousedown, keypress, etc.
      this.input.on('pointerdown', function (pointer) {

        this.input.mouse.requestPointerLock();

    }, this);

    // When locked, you will have to use the movementX and movementY properties of the pointer
    // (since a locked cursor's xy position does not update)
    this.input.on('pointermove', function (pointer) {

        if (this.input.mouse.locked)
        {
            player.x += pointer.movementX;

            // Force the sprite to stay on screen
            player.x = Phaser.Math.Wrap(player.x, 0, game.renderer.width);

            if (pointer.movementX > 0) { player.setRotation(0.1); }
            else if (pointer.movementX < 0) { player.setRotation(-0.1); }
            else { player.setRotation(0); }

            updateLockText(true);
        }
    }, this);

    // Exit pointer lock when Q is pressed. Browsers will also exit pointer lock when escape is
    // pressed.
    this.input.keyboard.on('keydown-Q', function (event) {
        if (this.input.mouse.locked)
        {
            this.input.mouse.releasePointerLock();
        }
    }, this);

    // Optionally, you can subscribe to the game's pointer lock change event to know when the player
    // enters/exits pointer lock. This is useful if you need to update the UI, change to a custom
    // mouse cursor, etc.
    this.input.on('pointerlockchange', function (event) {

        console.log(event);

        updateLockText(event.isPointerLocked, sprite.x, sprite.y);

    }, this);

  //create ball
  ball = this.physics.add.sprite(
    400,
    565,
    'ball'
  ).setScale(.007)

  ball.body.collideWorldBounds = true;
  ball.body.setBounce(1)

  //add bricks
  blueBricks = this.physics.add.group({
    key: 'brick1',
    repeat: 8,
    immovable: true,
    setXY: {
      x: 120,
      y: 45,
      stepX:70
    },
    setScale: {
      x: .3,
      y: .3
    }
  })
  greenBricks = this.physics.add.group({
    key: 'brick2',
    repeat: 7,
    immovable: true,
    setXY: {
      x: 150,
      y: 80,
      stepX:70
    },
    setScale: {
      x: .3,
      y: .3
    }
  })
  redBricks = this.physics.add.group({
    key: 'brick3',
    repeat: 9,
    immovable: true,
    setXY: {
      x: 87,
      y: 115,
      stepX:70
    },
    setScale: {
      x: .3,
      y: .3
    }
  })
  orangeBricks = this.physics.add.group({
    key: 'brick4',
    repeat: 8,
    immovable: true,
    setXY: {
      x: 120,
      y: 150,
      stepX:70
    },
    setScale: {
      x: .3,
      y: .3
    }
  })

  //add keyboard movement - up, down, left, right, shift, space
  cursors = this.input.keyboard.createCursorKeys()

  //COLLISIONS

  //create collisions between brick and ball
  this.physics.add.collider(ball, blueBricks, brickCollision, null, this)
  this.physics.add.collider(ball, greenBricks, brickCollision, null, this)
  this.physics.add.collider(ball, redBricks, brickCollision, null, this)
  this.physics.add.collider(ball, orangeBricks, brickCollision, null, this)

  //create collision between paddle and ball
  this.physics.add.collider(ball, player, playerCollision, null, this)

  //GAME STATUS START/WIN/LOSE
  startGameText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'Appuyer sur espace pour lancer',
    {
      fontFamily: 'Courier',
      fontSize: '40px',
      fill: '#fff'
    }
  )

  startGameText.setOrigin(0.5)
  startGameText.setVisible(true)

  lostText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'Recommencer ?',
    {
      fontFamily: 'Courier',
      fontSize: '50px',
      fill: '#fff'
    }
  )

  lostText.setOrigin(0.5)
  lostText.setVisible(false)

  winText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'GG!',
    {
      fontFamily: 'Courier',
      fontSize: '50px',
      fill: '#fff'
    }
  )
  winText.setOrigin(0.5)
  winText.setVisible(false)
}

function update(){
  //GameStart on space
  if (!gameStart) {
    ball.setX(player.x)
    ball.setVelocityY(0) //prevents ball from floating up
    ball.setVelocityX(0) //prevents ball from floating left or right

    if(cursors.space.isDown) {
      gameStart = true;
      if(first){
        life === 3;
        first = false;
      }
      startGameText.setVisible(false)
      ball.setVelocityY(-250)
    }
  }

  if (gameOver(this.physics.world)) {
      if (life === 0) {
        lostText.setVisible(true);
        ball.disableBody(true, true)
        if(cursors.shift.isDown) {
          gameStart = false
          this.scene.restart()
          score = 0
        }
    }else{
        gameStart = false
        ball.setX(player.x)
        ball.setVelocityY(0) //prevents ball from floating up
        ball.setVelocityX(0) //prevents ball from floating left or right
    }
  
  } else if (win()) {
    winText.setVisible(true)
    ball.disableBody(true, true)
  } else {
    //while the game is live
    player.body.setVelocityX(0) //keeps player still if not pressing keyboard

    //controls the paddle left and right at px/s
    if(cursors.left.isDown) {
      player.body.setVelocityX(-450) //num is px per second to the left
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(450) //num is px per second to the right
    }
  }

}

// object collision functions
function brickCollision(ball, brick) {
  brick.disableBody(true, true)
  score += 10
  scoreText.setText('score:' + score)

  if (ball.body.velocity.x === 0) {
    num = Math.random()
    if (num >= 0.5) {
      ball.body.setVelocityX(250)
    } else {
      ball.body.setVelocityY(-250)
    }
  }
}

function playerCollision(ball, player) {
  ball.setVelocityY(ball.body.velocity.y - 30)

  let newVelX = Math.abs(ball.body.velocity.x) + 0;

  if (ball.x < player.x) {
    ball.setVelocityX(-newVelX)
  } else {
    ball.setVelocityX(newVelX)
  }
}


//Game Status functions
function gameOver(world){
    return ball.body.y >= world.bounds.height - 40
}

function win(){
  return blueBricks.countActive() + greenBricks.countActive() + redBricks.countActive() + orangeBricks.countActive() === 0
}