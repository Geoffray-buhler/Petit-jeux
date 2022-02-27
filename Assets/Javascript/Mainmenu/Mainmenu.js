import SceneDeJeux from "../Jeux/Jeux.js";

export default class Mainmenu extends Phaser.Scene {

    constructor ()
    {
        super('Mainmenu');
    }

    preload ()
    {
        // variable de pré chargement des differant assets que tu a besoin dans la scene
        this.load.image('sky', 'Assets/Images/Mainmenu/805177.png');
        this.load.image('logo', 'Assets/Images/Mainmenu/Satellith.png');
        this.load.image('btn', 'Assets/Images/Mainmenu/Jouer.png');
        this.load.audio('musique','Assets/Sounds/Plongee-Nocturne.mp3');
        this.load.image('red', 'Assets/Images/Mainmenu/red.png');
    }

    create ()
    {
        // ici tu crée tes objet et tu les disposes sur la scene
        this.add.image(window.innerWidth/2, window.innerHeight/3, 'sky').setScale(0.5);
        var logo = this.add.image(window.innerWidth/2.2, window.innerHeight/3.5, 'logo').setScale(window.innerHeight/5000);
        var button = this.add.image(window.innerWidth/2.22, window.innerHeight/1.5, 'btn').setScale(window.innerHeight/1500).setInteractive();
        var music = this.sound.add('musique').setVolume(0.2);
        music.play();

        var particles = this.add.particles('red');
        var emitter = particles.createEmitter({
            speed: window.innerWidth,
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