class SceneDeJeux extends Phaser.Scene {

    constructor ()
    {
        super('SceneDeJeux');
    }

    preload ()
    {
        this.load.image('sky', 'Assets/Images/Mainmenu/805177.png');
          // load system 
    }

    create ()
    {
        this.add.image(500, 300, 'sky').setScale(0.3);
    }

}

export default SceneDeJeux