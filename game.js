import Phaser from 'phaser'
import SceneConnexion from './dist/scenes/connexion'

function preload() {
    this.load.image('sky', 'assets/backgrounds/805177.png')
    this.load.image('button', 'assets/mainpage/Play.png')
    this.load.image('Logojeux', 'assets/logos/satellith.png')
  }
  
  function create() {
    this.lights.addLight(500, 200, 1, 0xff0000, 1);
    this.add.image(500, 300, 'sky').setScale(0.3)
    this.add.image(500, 200, 'Logojeux').setScale(0.1)
    this.add.image(800, 500, 'button').setInteractive().setScale(0.3)
    this.input.on('pointerup', function (pointer) {
        this.scene.start('SceneConnexion');
    }, this);
  }
  
  const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      SceneConnexion
    }
  }
  
  const game = new Phaser.Game(config)