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
    }

    create ()
    {
        this.add.image(500, 300, 'sky').setScale(0.3);
        this.add.image(500, 200, 'logo').setScale(0.1);
        var button = this.add.image(750, 500, 'btn').setScale(0.3).setInteractive();
        var music = this.sound.add('musique').setVolume(0.2);
        music.play();

        
        button.on('pointerover', function (event) {
            this.setTint(0xff0000);
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