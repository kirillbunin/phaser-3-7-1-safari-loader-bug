import GameConfig from './GameConfig'
import Store from './Store'
const pica = require('pica')()

class BasketBall {
  constructor (context, config) {
    // super()
    // super(config.world, config.x, config.y, config.texture, config.frame, config.options)
    this.context = context

    this.mode = 'casual'

    this.defaultPosition = {x: GameConfig.width / 2, y: GameConfig.height / 2}

    this.ball = this.context.matter.add.circle(this.defaultPosition.x, this.defaultPosition.y, 36,
      {
        id: 'ball',
        isStatic: true
      }
    )
    this.ballOverlay = this.context.add.image(this.ball.position.x, this.ball.position.y, 'ball')
    this.setDepth(18)

    this.ballOverlayChallenger = this.context.add.image(this.ballOverlay.x, this.ballOverlay.y, 'ball-placeholder')
    this.ballOverlayChallenger.setAlpha(0)

    this.ballOverlayChallengerNet = this.context.add.image(this.ballOverlay.x, this.ballOverlay.y, 'ballChallengerOverlay')
    this.ballOverlayChallengerNet.setAlpha(0)

    this.ballMask = this.context.add.graphics(false)
    this.ballMask.fillCircle(0, 0, 52)
    this.ballOverlayChallenger.setMask(this.ballMask.createGeometryMask())
  }

  targetOverlay () {
    console.log('Called targetOverlay')
    if (this.mode === 'casual') {
      return this.ballOverlay
    } else {
      return [this.ballOverlayChallenger, this.ballOverlayChallengerNet]
    }
  }

  update () {
    this.ballOverlay.x = this.ball.position.x
    this.ballOverlay.y = this.ball.position.y
    this.ballOverlay.rotation = this.ball.angle

    this.ballOverlayChallenger.x = this.ball.position.x
    this.ballOverlayChallenger.y = this.ball.position.y
    this.ballOverlayChallenger.rotation = this.ball.angle

    this.ballOverlayChallengerNet.x = this.ball.position.x
    this.ballOverlayChallengerNet.y = this.ball.position.y
    this.ballOverlayChallengerNet.rotation = this.ball.angle

    this.ballMask.alpha = this.ballOverlayChallengerNet.alpha
    this.ballMask.x = this.ball.position.x
    this.ballMask.y = this.ball.position.y
    this.ballMask.setScale(this.ballOverlayChallenger.scaleX, this.ballOverlayChallenger.scaleY)
  }

  resetPosition (type, hardReset) {
    this.changeBall()
      .then(() => { this.finishResetPosition() })
  }

  finishResetPosition () {
    this.state = 'reseting'
    this.setDepth(18)
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
      }
    })
    this.context.tweens.add({
      targets: this.targetOverlay(),
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      ease: 'Back',
      easeParams: [2],
      duration: 250
    })
  }

  setDepth (i) {
    if (this.mode === 'casual') {
      this.ballOverlay.setDepth(i)
    } else {
      this.ballOverlayChallenger.setDepth(i)
      this.ballOverlayChallengerNet.setDepth(i)
    }
  }

  async changeBall () {
    return new Promise((resolve) => {
      this.mode = 'challenger'
      fetch(Store.state.socialData[0].avatar)
        .then(
          (response) => {
            if (response.status !== 200) {
              console.log('response.status', response.status)
              this.ballOverlayChallenger.setTexture('challengerPlaceholder')
              this.ballOverlay.setAlpha(0)
              this.ballOverlayChallenger.setAlpha(1)
              this.ballOverlayChallengerNet.setAlpha(1)
              resolve()
            }
            response.blob().then((res) => {
              console.log('Successful img load')
              let myURL = (window.URL || window.webkitURL).createObjectURL(res)
              // Canvas for resizing
              let finalSizeCanvas = document.createElement('canvas')
              finalSizeCanvas.width = 102
              finalSizeCanvas.height = 102

              // Image to resize
              const sourceImage = new Image()
              sourceImage.onload = () => {
                console.log('sourceImage onload')
                pica.resize(sourceImage, finalSizeCanvas, {
                  unsharpAmount: 80,
                  unsharpRadius: 0.6,
                  unsharpThreshold: 2
                })
                  // .then((result) => {
                  //   return result.getContext('2d').drawImage(document.getElementById('ballOverlaySVG'), 0, 0)
                  // })
                  .then(result => pica.toBlob(result, 'image/jpeg', 1))
                  .then((blob) => {
                    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                    myURL = (window.URL || window.webkitURL).createObjectURL(blob)
                    this.context.load.image(randomString, myURL)
                    this.context.load.once('complete', (e) => {
                      // Replace texture
                      this.ballOverlayChallenger.setTexture(randomString)
                      // You can try also
                      // this.ballOverlayChallenger.setTexture('ball-purple')

                      // Switch between overlays
                      if (this.ballOverlay && this.ballOverlay.tween && typeof this.ballOverlay.tween.stop === 'function') {
                        this.ballOverlay.tween.stop()
                      }
                      this.ballOverlay.setAlpha(0)
                      this.ballOverlayChallenger.setAlpha(1)
                      this.ballOverlayChallengerNet.setAlpha(1)
                      resolve('success')
                    })
                    this.context.load.start()
                  })
              }
              sourceImage.src = myURL
            })
          }
        )
        .catch(function (err) {
          console.log('COULDNT FETCH')
          console.error(err)
          this.ballOverlayChallenger.setTexture('challengerPlaceholder')
          if (this.ballOverlay.tween && typeof this.ballOverlay.tween.stop === 'function') {
            this.ballOverlay.tween.stop()
          }
          this.ballOverlay.setAlpha(0)
          this.ballOverlayChallenger.setAlpha(1)
          this.ballOverlayChallengerNet.setAlpha(1)
          alert(err)
          resolve(err)
        })
    })
  }
}

export default BasketBall
