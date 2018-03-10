import GameConfig from './GameConfig'
import { isPointInsideCircle, angleFromTwoPoint } from './helper'
import Store from './Store'
import BasketBall from './BasketBall'
import ScoreCounter from './ScoreCounter'

class GameScene extends Phaser.Scene {
  // constructor () {
  //   super()
  // }

  preload () {
    this.load.svg('ball', 'assets/images/ball.svg')
    this.load.svg('board', 'assets/images/board.svg')
    this.load.svg('boardRim', 'assets/images/boardRim.svg')
    this.load.svg('platform', 'assets/images/platform.svg')
    this.load.svg('platformBallShadow', 'assets/images/platfom-ball-shadow.svg')
    this.load.svg('arrow', 'assets/images/arrow.svg')
  }

  create () {
    /**
     * State helpers
     */
    this.pointerPosition = null
    this.swipeTimer = null
    this.winningThrow = false
    this.lastShotTime = null

    /**
     * Create Collision Categories
     */
    const category1 = this.matter.world.nextCategory()
    const category2 = this.matter.world.nextCategory()

    /**
     * Create Board
     */
    this.boardBackground = this.add.image(GameConfig.width / 2, GameConfig.height - 462, 'board')
    this.boardBackground.setDepth(-1)
    this.boardRimLeft = this.matter.add.circle(this.boardBackground.x - 50, this.boardBackground.y + 55, 5, {isStatic: true, collisionFilter: { mask: category2 }})
    this.boardRimRight = this.matter.add.circle(this.boardBackground.x + 50, this.boardBackground.y + 55, 5, {isStatic: true, collisionFilter: { mask: category2 }})
    this.boardRim = this.add.image(this.boardBackground.x, this.boardBackground.y + 55, 'boardRim')
    this.boardRim.setDepth(2)

    this.scoreCounter = new ScoreCounter(this, {positionOriginElement: this.boardBackground})

    /**
     * Create sensors
     */
    this.boardSensor = this.matter.add.rectangle(this.boardBackground.x, this.boardBackground.y - 76, GameConfig.width, 100, { id: 'boardSensor', isStatic: true, isSensor: true })
    this.winSensor = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y + 50, this.boardRim.width - 20, 40, { id: 'winSensor', isStatic: true, isSensor: true })
    this.fallSensor = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y + 100, GameConfig.width * 2, 100, { id: 'fallSensor', isStatic: true, isSensor: true })
    this.groundSensor = this.matter.add.rectangle(GameConfig.width / 2, GameConfig.height, GameConfig.width * 2, 100, { id: 'groundSensor', isStatic: true, isSensor: true })
    this.wallSensorLeft = this.matter.add.rectangle(-50, GameConfig.height / 2, 100, GameConfig.height * 2, { id: 'wallSensorLeft', isStatic: true, isSensor: true })
    this.wallSensorRight = this.matter.add.rectangle(GameConfig.width + 50, GameConfig.height / 2, 100, GameConfig.height * 2, { id: 'wallSensorRight', isStatic: true, isSensor: true })
    this.newBallSensor = this.matter.add.rectangle(GameConfig.width / 2, GameConfig.height - 130, 100, 50, { id: 'newBallSensor', isStatic: true, isSensor: true })

    this.ball = new BasketBall(this, {
      onResetCompleted: () => {
        this.newClick = true
      }
    })

    /**
     *  Create platform and platform object
     */
    this.platformBackground = this.add.image(GameConfig.width / 2, GameConfig.height, 'platform')
    this.platformBackground.setOrigin(0.5, 1)
    this.platformBallShadow = this.add.image(this.ball.defaultPosition.x, this.ball.defaultPosition.y + 52, 'platformBallShadow')
    this.platformBallShadow.alpha = 0

    /**
     * Collision handling
     */
    this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      console.log('Collision between ', bodyA.id, ' and ', bodyB.id, '. The this.ball.isFalling is set to: ', this.ball.isFalling)
      if ((bodyA.id === 'ball' && bodyB.id === 'boardSensor') || (bodyB.id === 'ball' && bodyA.id === 'boardSensor')) {
        this.ball.setCollisionCategory(category2)
        this.ball.isFalling = true
        this.ball.ballOverlay.setDepth(1)
      } else if ((bodyA.id === 'ball' && bodyB.id === 'fallSensor') || (bodyB.id === 'ball' && bodyA.id === 'fallSensor')) {
        this.ball.setCollisionCategory(category1)
        if (this.ball.isFalling) {
          this.ball.resetPosition()
          if (!this.winningThrow) {
            this.gameOver()
          } else {
            this.winningThrow = false
          }
        }
      } else if ((bodyA.id === 'ball' && bodyB.id === 'wallSensorLeft') || (bodyB.id === 'ball' && bodyA.id === 'wallSensorLeft') || (bodyA.id === 'ball' && bodyB.id === 'wallSensorRight') || (bodyB.id === 'ball' && bodyA.id === 'wallSensorRight')) {
        if (!this.winningThrow) {
          this.gameOver()
        }
      } else if ((bodyA.id === 'ball' && bodyB.id === 'newBallSensor') || (bodyB.id === 'ball' && bodyA.id === 'newBallSensor')) {
      } else if ((bodyA.id === 'ball' && bodyB.id === 'winSensor') || (bodyB.id === 'ball' && bodyA.id === 'winSensor')) {
        if (this.ball.isFalling) {
          Store.updateScore(Store.state.score + 1)
          this.scoreCounter.setScore()
          if (Store.state.score > Store.state.highScore) {
            this.scoreCounter.setHighScore()
          }
          this.winningThrow = true
        }
      } else if ((bodyA.id === 'ball' && bodyB.id === 'groundSensor') || (bodyB.id === 'ball' && bodyA.id === 'groundSensor')) {
        this.ball.resetPosition()
      }
    })

    /**
     * Cursor debuggin
     */
    // this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0x0000ff } })
    this.input.on('pointermove', (pointerMove) => {
      // Check if ball isn't already shooting or reseting, and if there is 'mousedown' present, and if time of click was later then last time that player shooted
      if (!this.ball.isShooting && !this.ball.isReseting && pointerMove.isDown && (pointerMove.downTime > this.lastShotTime)) {
        // If Clicked within Ball
        if (isPointInsideCircle(pointerMove.downX, pointerMove.downY, this.ball.defaultPosition.x, this.ball.defaultPosition.y, 56)) {
          // If player moved the ball outside of 55px perimeter
          if (pointerMove.x - pointerMove.downX > 55 || pointerMove.x - pointerMove.downX < -55 || pointerMove.y - pointerMove.downY < -55) {
            // Automaticaly shoot and set new time for lastShotTime + clear the potential reset
            this.shootBall(pointerMove.downX, pointerMove.downY, pointerMove.upX, pointerMove.upY)
            this.lastShotTime = pointerMove.downTime
            clearTimeout(this.swipeTimer)
          } else {
            // Else, just move the ball to the new position
            const newPositionX = this.ball.defaultPosition.x + (pointerMove.x - pointerMove.downX)
            let newPositionY = this.ball.defaultPosition.y + (pointerMove.y - pointerMove.downY)
            newPositionY = newPositionY > this.ball.defaultPosition.y ? this.ball.defaultPosition.y : newPositionY
            Phaser.Physics.Matter.Matter.Body.setPosition(this.ball.ball, {x: newPositionX, y: newPositionY})
          }
        }
      }
    })
    /**
     * Cursor handling
     */
    this.input.on('pointerdown', (pointerDown) => {
      // Clear previous timer
      clearTimeout(this.swipeTimer)
      // If click was inside the ball
      if (isPointInsideCircle(pointerDown.downX, pointerDown.downY, this.ball.position.x, this.ball.position.y, 56)) {
        // Give player 300ms to shoot, otherwise reset position
        this.swipeTimer = setTimeout(() => {
          this.ball.backToDefaultPosition()
          this.lastShotTime = pointerDown.downTime
        }, 300)
      }
    })
    this.input.on('pointerup', (pointerUp) => {
      clearTimeout(this.swipeTimer)
      if (isPointInsideCircle(pointerUp.downX, pointerUp.downY, this.ball.defaultPosition.x, this.ball.defaultPosition.y, 56)) {
        if (Math.hypot(pointerUp.upX - pointerUp.downX, pointerUp.upY - pointerUp.downY) > 30) {
          if (!this.ball.isShooting && (pointerUp.downTime > this.lastShotTime)) {
            console.log('PointerUP!')
            this.shootBall(pointerUp.downX, pointerUp.downY, pointerUp.upX, pointerUp.upY)
          }
        } else {
          this.ball.backToDefaultPosition()
        }
      }
    })
  }

  update () {
    this.ball.update()
    this.scoreCounter.update()
    this.platformBallShadow.x = this.ball.position.x
  }

  shootBall (downX, downY, upX, upY) {
    console.log('ShootBall!')
    // if (isPointInsideCircle(downX, downY, this.ball.position.x, this.ball.position.y, 56)) {
    console.log('Shooting Ball', '\ndownX: ', downX, '\ndownY: ', downY, '\nupX: ', upX, '\nupY: ', upY)
    this.scoreCounter.hideSwipeArrow()
    // let angle = angleFromTwoPoint(381.3999938964844, 666, 376.3999938964844, 574)
    let angle = angleFromTwoPoint(this.ball.defaultPosition.x, this.ball.defaultPosition.y, this.ball.position.x, this.ball.position.y)
    angle += 90
    if (angle > 180) {
      angle = -90
    } else if (angle > 90) {
      angle = 90
    }

    this.ball.shoot({force: {x: (angle / 0.9) / 50, y: -5.2}, mouse: {downX, downY, upX, upY}})
    // this.ball.shoot({x: (angle / 0.9) / 5, y: -35})
    // }
  }

  // resetBall () {
  //   let ballPosition = {x: this.ball.position.x, y: this.ball.position.y}
  //   this.context.tweens.add({
  //     targets: ballPosition,
  //     x: this.ball.defaultPosition.x,
  //     y: this.ball.defaultPosition.y,
  //     ease: 'Back',
  //     easeParams: [2],
  //     duration: 250,
  //     onUpdate: () => {
  //       Phaser.Physics.Matter.Matter.Body.setPosition(this.ball.ball, {x: ballPosition.x, y: ballPosition.y})
  //     },
  //     onComplete: () => {
  //     }
  //   })
  // }

  gameOver () {
    this.ball.resetPosition()
    this.scoreCounter.gameOver()
  }
}

export default GameScene
