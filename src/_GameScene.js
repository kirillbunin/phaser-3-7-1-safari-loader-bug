import GameConfig from './GameConfig'
import { isPointInsideCircle, angleFromTwoPoint } from './helper'
import Store from './Store'
import BasketBall from './BasketBall'

class GameScene extends Phaser.Scene {
  // constructor () {
  //   super()
  // }

  preload () {
    this.load.image('ball', 'assets/images/ball.svg')
    this.load.image('board', 'assets/images/board.svg')
    this.load.image('boardRim', 'assets/images/boardRim.svg')
    this.load.image('platform', 'assets/images/platform.svg')
    this.load.image('arrow', 'assets/images/arrow.svg')
  }

  create () {
    // this.matter.world.setBounds()

    // /**
    //  * Create Collision Categories
    //  */
    // const category1 = this.matter.world.nextCategory()
    // const category2 = this.matter.world.nextCategory()

    // /**
    //  *  Create platform and platform object
    //  */
    // this.platformBackground = this.add.image(GameConfig.width / 2, GameConfig.height, 'platform')
    // this.platformBackground.setOrigin(0.5, 1)
    // this.platformObject = this.matter.add.trapezoid(GameConfig.width / 2, GameConfig.height - 39 - 7, 230, 14, 0.3, {isStatic: true, collisionFilter: { mask: category1 }})

    // /**
    //  * Create Board
    //  */
    // this.boardBackground = this.add.image(GameConfig.width / 2, 200, 'board')
    // this.boardBackground.setDepth(-1)
    // this.boardRimLeft = this.matter.add.circle(this.boardBackground.x - 50, this.boardBackground.y + 55, 5, {isStatic: true, collisionFilter: { mask: category2 }})
    // this.boardRimRight = this.matter.add.circle(this.boardBackground.x + 50, this.boardBackground.y + 55, 5, {isStatic: true, collisionFilter: { mask: category2 }})
    // this.boardRim = this.add.image(this.boardBackground.x, this.boardBackground.y + 55, 'boardRim')

    // this.arrowImage = this.add.image(GameConfig.width / 2, this.boardBackground.y + (this.boardBackground.height / 2) + 20, 'arrow')
    // this.arrowImage.setOrigin(0.5, 0)
    // this.arrowImage.setDepth(-1)

    // this.ball2 = new BasketBall(this, {category1})
    // /**
    //  * Create ball
    //  */
    // // this.ball = this.matter.add.circle(GameConfig.width / 2, GameConfig.height - 75, 54, {id: 'ball', isStatic: true, fill: '#FF0000', collisionFilter: { category: category1 }})
    // // this.ball.collisionFilter = {category: category1}
    // this.ball = this.matter.add.circle(GameConfig.width / 2, GameConfig.height - 105, 36,
    //   {
    //     id: 'ball',
    //     isStatic: true
    //   }
    // )
    // this.ball.collisionFilter.category = category1
    // this.ballOverlay = this.add.image(this.ball.position.x, this.ball.position.y, 'ball')
    // // this.ball.setSize(108, 108)
    // // this.ball.setCollisionCategory(category1)
    // // this.ball.setFriction(0)
    // // this.ball.setBounce(0.6)
    // // this.ball.setMass(10)
    // // this.ball.setDepth(1)
    // console.log(this.ball)
    // console.log(this.ballOverlay)

    // /**
    //  * Create sensors
    //  */
    // this.boardSensor = this.matter.add.rectangle(this.boardBackground.x, this.boardBackground.y - 76, GameConfig.width, 100, { id: 'boardSensor', isStatic: true, isSensor: true })
    // this.winSensor = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y + 50, this.boardRim.width - 20, 30, { id: 'winSensor', isStatic: true, isSensor: true })
    // this.fallSensor = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y + 100, GameConfig.width * 2, 100, { id: 'fallSensor', isStatic: true, isSensor: true })
    // this.wallSensorLeft = this.matter.add.rectangle(-50, GameConfig.height / 2, 100, GameConfig.height * 2, { id: 'wallSensorLeft', isStatic: true, isSensor: true })
    // this.wallSensorRight = this.matter.add.rectangle(GameConfig.width + 50, GameConfig.height / 2, 100, GameConfig.height * 2, { id: 'wallSensorRight', isStatic: true, isSensor: true })
    // this.newBallSensor = this.matter.add.rectangle(GameConfig.width / 2, GameConfig.height - 130, 100, 50, { id: 'newBallSensor', isStatic: true, isSensor: true })

    /**
     * Cursor handling
     */
    // this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0x0000ff } })
    // this.input.on('pointermove', (pointerMove) => {
    //   this.graphics.clear()
    //   if (pointerMove.isDown) {
    //     // If Clicked within Ball
    //     if (isPointInsideCircle(pointerMove.downX, pointerMove.downY, this.ball.position.x, this.ball.position.y, 56)) {
    //       this.pointerMoveInsideCircle = true
    //       this.line = new Phaser.Geom.Line(pointerMove.downX, pointerMove.downY, pointerMove.x, pointerMove.y)
    //       this.graphics.strokeLineShape(this.line)
    //     }
    //   }
    // })
    this.input.on('pointerup', (pointerUp) => {
      if (isPointInsideCircle(pointerUp.downX, pointerUp.downY, this.ball.position.x, this.ball.position.y, 56)) {
        let angle = angleFromTwoPoint(pointerUp.downX, pointerUp.downY, pointerUp.upX, pointerUp.upY)
        angle += 90
        if (angle > 180) {
          angle = -90
        } else if (angle > 90) {
          angle = 90
        }
        // this.ball.body.render.sprite.xScale = 0.5
        // this.ball.setStatic(false)
        // this.ball.resizingToSmall = true
        // this.ball.applyForceFrom({x: pointerUp.downX, y: pointerUp.downY}, {x: (angle / 0.9) / 100, y: -0.7})
        // Phaser.Physics.Matter.Matter.Body.scale(this.ball.body, 0.7, 0.7, {x: this.ball.position.x, y: thi.positions.ball.y})
        // this.tweens.add({
        //   targets: this.ball,
        //   scaleX: 0.5,
        //   scaleY: 0.5,
        //   ease: 'Power1',
        //   duration: 400
        // })
        this.tweens.add({
          targets: this.ballOverlay,
          scaleX: 0.66,
          scaleY: 0.66,
          ease: 'Power1.easeIn',
          duration: 800
          // onComplete: () => {
          //   if (this.ballFalling) {
          //     this.tweens.add({
          //       targets: this.ballOverlay,
          //       scaleX: 0.62,
          //       scaleY: 0.62,
          //       ease: 'Power1.easeIn',
          //       duration: 150,
          //       yoyo: true
          //     })
          //   }
          // }
        })
        Phaser.Physics.Matter.Matter.Body.setStatic(this.ball, false)
        Phaser.Physics.Matter.Matter.Body.setMass(this.ball, 10)
        this.ball.restitution = 0.6
        this.ball.friction = 0
        Phaser.Physics.Matter.Matter.Body.applyForce(this.ball, {x: this.getForcePositionX(pointerUp.downX), y: this.ball.position.y}, {x: (angle / 0.9) / 100, y: -1.2})
      }
    })

    // /**
    //  * Collision handling
    //  */
    // this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
    //   if ((bodyA.id === 'ball' && bodyB.id === 'boardSensor') || (bodyB.id === 'ball' && bodyA.id === 'boardSensor')) {
    //     this.ball.collisionFilter.category = category2
    //     this.boardRim.setDepth(2)
    //     this.ballFalling = true
    //     // console.log(this.ball)
    //   } else if ((bodyA.id === 'ball' && bodyB.id === 'fallSensor') || (bodyB.id === 'ball' && bodyA.id === 'fallSensor')) {
    //     this.ball.collisionFilter.category = category1
    //     if (this.ballFalling) {
    //       this.resetBall()
    //     }
    //   } else if ((bodyA.id === 'ball' && bodyB.id === 'wallSensorLeft') || (bodyB.id === 'ball' && bodyA.id === 'wallSensorLeft') || (bodyA.id === 'ball' && bodyB.id === 'wallSensorRight') || (bodyB.id === 'ball' && bodyA.id === 'wallSensorRight')) {
    //     this.resetBall()
    //   } else if ((bodyA.id === 'ball' && bodyB.id === 'newBallSensor') || (bodyB.id === 'ball' && bodyA.id === 'newBallSensor')) {
    //     // this.ball.setDepth(1)
    //   } else if ((bodyA.id === 'ball' && bodyB.id === 'winSensor') || (bodyB.id === 'ball' && bodyA.id === 'winSensor')) {
    //     if (this.ballFalling) {
    //       Store.updateScore(Store.state.score + 1)
    //     }
    //   }
    // })

    //  These both do the same thing:
    // this.matter.add.pointerConstraint({ length: 1, stiffness: 0.6 });
    // this.matter.add.mouseSpring({ length: 1, stiffness: 0.6 })
  }

  // update () {
  //   this.ballOverlay.x = this.ball.position.x
  //   this.ballOverlay.y = this.ball.position.y
  //   this.ballOverlay.rotation = this.ball.angle
  // }

  // resetBall () {
  //   console.log('reset')
  //   this.tweens.add({
  //     targets: this.ballOverlay,
  //     alpha: 0,
  //     ease: 'Power1',
  //     duration: 400,
  //     onComplete: () => {
  //       this.boardRim.setDepth(-1)
  //       this.ballFalling = false
  //       Phaser.Physics.Matter.Matter.Body.setStatic(this.ball, true)
  //       Phaser.Physics.Matter.Matter.Body.setPosition(this.ball, {x: GameConfig.width / 2, y: GameConfig.height})
  //       const ballPosition = {y: GameConfig.height}
  //       this.tweens.add({
  //         targets: ballPosition,
  //         y: GameConfig.height - 105,
  //         ease: 'Back',
  //         easeParams: [4],
  //         duration: 400,
  //         onUpdate: () => {
  //           Phaser.Physics.Matter.Matter.Body.setPosition(this.ball, {x: GameConfig.width / 2, y: ballPosition.y})
  //         }
  //       })
  //       this.tweens.add({
  //         targets: this.ballOverlay,
  //         alpha: 1,
  //         scaleX: 1,
  //         scaleY: 1,
  //         ease: 'Back',
  //         easeParams: [4],
  //         duration: 400
  //       })
  //     }
  //   })
  // }

  // toggleTouch () {
  //   this.touchControls.visible = !this.touchControls.visible
  //   if (this.touchControls.visible) {
  //     this.touchControls.dpad.alpha = 0
  //     this.touchControls.abutton.alpha = 0
  //   } else {
  //     this.touchControls.dpad.alpha = 0.5
  //     this.touchControls.abutton.alpha = 0.5
  //   }
  // }

  // getForcePositionX (clickPosition) {
  //   const ii = (clickPosition - this.ball.position.x) / (56 / 100)
  //   const i = ii * (36 / 100)
  //   const posX = i + this.ball.position.x
  //   return posX
  // }
}

export default GameScene
