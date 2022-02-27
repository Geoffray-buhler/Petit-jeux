import Mainmenu from '../Mainmenu/Mainmenu.js'
import SceneDeJeux from '../Jeux/Jeux.js';

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth - 100,
    height: window.innerHeight - 100,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [
        Mainmenu,
        SceneDeJeux,
        // Niveaux = [
        //     Level1,
        //     Level2
        // ]
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

export default {game,config}