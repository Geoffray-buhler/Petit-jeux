import game from "../System/config.js";

class SceneDeJeux extends Phaser.Scene {

    constructor ()
    {
        super('SceneDeJeux');
    }

    preload ()
    {
        this.load.image('sky', 'Assets/Images/Mainmenu/805177.png');
        this.load.image('hudInventaire','Assets/Images/Jeux/Hudinventaire.png')
    }

    create ()
    {
        this.add.image(window.innerWidth/2, window.innerHeight/3, 'sky').setScale(0.5);
        this.add.image(window.innerWidth/1.35, window.innerHeight/3, 'hudInventaire').setScale(1.5);
    }

}

export default SceneDeJeux