import SceneDeJeux from "../Inventaires/Inventaire.js";

class Mainmenu extends Phaser.Scene {

    constructor ()
    {
        super('Mainmenu');
    }

    preload ()
    {
        this.load.image('sky', 'Assets/Images/Mainmenu/805177.png');
        this.load.image('logo', 'Assets/Images/Mainmenu/Satellith.png');
        this.load.image('btn', 'Assets/Images/Mainmenu/Jouer.png');
        this.load.audio('musique','Assets/Sounds/Plongee-Nocturne.mp3');

        this.load.image('red', 'Assets/Images/Mainmenu/red.png');
    }

    create ()
    {
        this.add.image(500, 300, 'sky').setScale(0.3);
        var logo = this.add.image(500, 200, 'logo').setScale(0.1);
        var button = this.add.image(750, 500, 'btn').setScale(0.3).setInteractive();
        var music = this.sound.add('musique').setVolume(0.2);
        music.play();

        var particles = this.add.particles('red');
        var emitter = particles.createEmitter({
            speed: 800,
            scale: { start: 0, end: 0.2 },
            blendMode: 'ADD'
        });
        
        button.on('pointerover', function (event) {
            this.setTint(0x0099ff);
        });

        button.on('pointerout', function (event) {
            this.clearTint();
        });

        button.on('pointerdown', function (pointer) {
            this.scene.start('SceneDeJeux');
        },this);

        button.on('pointerup', function (event) {
            this.clearTint();
        });

        emitter.startFollow(logo);
    }
}

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [
        Mainmenu,
        SceneDeJeux
    ]

};

var game = new Phaser.Game(config);

game.loadFile = function(){
    var file = JSON.parse(localStorage.getItem('saveFile'));
    game.scene.score = file.score;
    game.scene.visits = file.visits;
};

setInterval(() => {
    game.saveFile = function(){
      var file = {
          score: 1000,
          visits: 0
      };
      localStorage.setItem('saveFile',JSON.stringify(file));
  };
}, 1000);