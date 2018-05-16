import BasketBall from './BasketBall'

class GameScene extends Phaser.Scene {
  // constructor () {
  //   super()
  // }

  initialize () {
    Phaser.Scene.call(this, {key: 'GameScene'})
  }

  preload () {
    this.load.svg('ball', 'assets/images/ball3.svg')
    this.load.svg('ball-green', 'assets/images/ball3-green.svg') 
    this.load.svg('ball-purple', 'assets/images/ball3-purple.svg')
    this.load.svg('ball-blue', 'assets/images/ball3-blue.svg')
    this.load.svg('ballChallengerOverlay', 'assets/images/Ball-player-overlay.svg')
  }

  create () {

    /**
     * Create Ball
     */
    this.ball = new BasketBall(this)
    
    this.ball.resetPosition('challenger')
  }

  update () {
    this.ball.update()
  }
}

export default GameScene
