
/*************/
/* SCENE     */
/*************/

function init() {
    this.player = new Player(this);
}

// Preload function to load assets
function preload() {
    this.player.preload();
}

// Create function to set up the initial state of the game
function create() {
  // Add background image
  this.cameras.main.setBackgroundColor('#000');

  this.player.create();
}



// Update function called every frame
function update() {
  const deltaTime = this.game.loop.delta;

  this.player.update(deltaTime);
}


/*************/
/* APP MAIN  */
/*************/

// Configuration object for Phaser
const config = {
    parent: 'game-container',
    type: Phaser.AUTO,
    width: GAME_X_BOUNDS,
    height: GAME_Y_BOUNDS,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      init: init,
      preload: preload,
      create: create,
      update: update
    }
  };
  
// Create a new Phaser Game instance with the configuration
const game = new Phaser.Game(config);
  