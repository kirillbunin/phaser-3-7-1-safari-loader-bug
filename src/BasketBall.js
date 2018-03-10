import GameConfig from './GameConfig'
import { isFunction } from './helper'

class BasketBall {
  constructor (context, config) {
    // super()
    // super(config.world, config.x, config.y, config.texture, config.frame, config.options)
    this.config = config
    this.context = context

    this.isReseting = false
    this.isFalling = false
    this.defaultPosition = {x: GameConfig.width / 2, y: GameConfig.height - 105}

    this.ball = this.context.matter.add.circle(this.defaultPosition.x, this.defaultPosition.y, 36,
      {
        id: 'ball',
        isStatic: true
      }
    )
    // this.ball.collisionFilter.category = config.category1
    this.ballOverlay = this.context.add.image(this.ball.position.x, this.ball.position.y, 'ball')
    this.ballOverlay.setDepth(3)

    this.position = this.ball.position
  }

  update () {
    this.ballOverlay.x = this.ball.position.x
    this.ballOverlay.y = this.ball.position.y
    this.ballOverlay.rotation = this.ball.angle
    // this.ballOverlay.alpha = 0
  }

  resetPosition () {
    if (!this.isReseting) {
      this.isReseting = true
      this.context.tweens.add({
        targets: this.ballOverlay,
        alpha: 0,
        ease: 'Power1',
        duration: 300,
        onComplete: () => {
          this.ballOverlay.setDepth(3)
          this.isFalling = false
          Phaser.Physics.Matter.Matter.Body.setStatic(this.ball, true)
          Phaser.Physics.Matter.Matter.Body.setPosition(this.ball, {x: GameConfig.width / 2, y: GameConfig.height})
          const ballPosition = {y: GameConfig.height}
          this.context.tweens.add({
            targets: ballPosition,
            y: this.defaultPosition.y,
            ease: 'Back',
            easeParams: [2],
            duration: 250,
            onUpdate: () => {
              Phaser.Physics.Matter.Matter.Body.setPosition(this.ball, {x: GameConfig.width / 2, y: ballPosition.y})
            },
            onComplete: () => {
              this.isReseting = false
              this.isShooting = false
              if (isFunction(this.config.onResetCompleted)) {
                this.config.onResetCompleted()
              }
            }
          })
          this.context.tweens.add({
            targets: this.ballOverlay,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            ease: 'Back',
            easeParams: [2],
            duration: 250
          })
        }
      })
    }
  }

  backToDefaultPosition () {
    if (!this.isReseting) {
      this.isReseting = true
      const ballPosition = {x: this.position.x, y: this.position.y}
      this.context.tweens.add({
        targets: ballPosition,
        y: this.defaultPosition.y,
        x: this.defaultPosition.x,
        ease: 'Power1.ease',
        duration: 150,
        onUpdate: () => {
          Phaser.Physics.Matter.Matter.Body.setPosition(this.ball, {x: ballPosition.x, y: ballPosition.y})
        },
        onComplete: () => {
          this.isReseting = false
        }
      })
    }
  }

  setCollisionCategory (category) {
    this.ball.collisionFilter.category = category
  }

  shoot (props) {
    if (!this.isShooting && !this.isReseting) {
      this.isShooting = true
      this.context.tweens.add({
        targets: this.ballOverlay,
        scaleX: 0.66,
        scaleY: 0.66,
        ease: 'Power4.easeIn',
        duration: 600
        // onComplete: () => {
        //   if (this.isFalling) {
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
      Phaser.Physics.Matter.Matter.Body.setMass(this.ball, 40)
      this.ball.restitution = 0.7
      this.ball.friction = 0
      // this.getForcePositionX(pointerUp.downX)
      Phaser.Physics.Matter.Matter.Body.applyForce(this.ball, {x: this.getForcePositionX(props.mouse.downX), y: this.ball.position.y}, props.force)
      // console.log(this.ball.velocity)
      // Phaser.Physics.Matter.Matter.Body.setVelocity(this.ball, props)
    }
  }

  getForcePositionX (clickPosition) {
    const ii = (clickPosition - this.ball.position.x) / (56 / 100)
    const i = ii * (9 / 100)
    const posX = i + this.ball.position.x
    return posX
  }
}

export default BasketBall
