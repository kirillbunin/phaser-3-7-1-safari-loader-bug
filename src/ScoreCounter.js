import GameConfig from './GameConfig'
import Store from './Store'

class ScoreCounter {
  constructor (context, config) {
    this.context = context
    this.config = config
    // config.positionOriginElement

    this.arrowImage = this.context.add.image(GameConfig.width / 2, this.config.positionOriginElement.y + (this.config.positionOriginElement.height / 2) + 20, 'arrow')
    this.arrowImage.setOrigin(0.5, 0)
    this.arrowImage.setDepth(-1)

    this.scoreText = this.context.add.text(GameConfig.width / 2, this.config.positionOriginElement.y + (this.config.positionOriginElement.height / 2) + 50, Store.state.score.toString(), { fontFamily: 'barlowblack', fontSize: 80, color: '#d9bd93', align: 'center' })
    this.scoreText.alpha = 0
    this.scoreText.setOrigin(0.5, 0)

    this.tryAgainText = this.context.add.text(GameConfig.width / 2, this.config.positionOriginElement.y + (this.config.positionOriginElement.height / 2) + 70, 'Try Again', { fontFamily: 'barlowblack', fontSize: 32, color: '#d9bd93', align: 'center' })
    this.tryAgainText.setOrigin(0.5, 0)
    this.tryAgainText.alpha = 0

    this.highScoreText = this.context.add.text(GameConfig.width / 2, this.scoreText.y + 80, 'New Highscore', { fontFamily: 'barlowblack', fontSize: 32, color: '#d9bd93', align: 'center' })
    this.highScoreText.setOrigin(0.5, 0)
    this.highScoreText.alpha = 0
    // console.log(this.scoreText)
  }

  update () {
    this.scoreText.setText(Store.state.score.toString())
  }

  hideSwipeArrow () {
    this.context.tweens.add({
      targets: this.arrowImage,
      alpha: 0,
      ease: 'Power1.easeOut',
      duration: 200
    })
  }

  setScore () {
    if (this.scoreText.alpha === 0) {
      this.context.tweens.add({
        targets: this.tryAgainText,
        alpha: 0,
        ease: 'Power1.easeIn',
        duration: 200,
        onComplete: () => {
          this.context.tweens.add({
            targets: this.scoreText,
            alpha: 1,
            ease: 'Power1.easeIn',
            duration: 200,
            onComplete: () => {
            }
          })
        }
      })
    }
  }

  gameOver () {
    this.context.tweens.add({
      targets: [this.scoreText, this.highScoreText],
      alpha: 0,
      ease: 'Power1.easeIn',
      duration: 300,
      onComplete: () => {
        this.context.tweens.add({
          targets: this.tryAgainText,
          alpha: 1,
          ease: 'Power1.easeIn',
          duration: 300,
          onComplete: () => {
            Store.updateScore(0)
          }
        })
      }
    })
  }

  setHighScore () {
    Store.updateHighScore()
    this.context.tweens.add({
      targets: this.highScoreText,
      alpha: 1,
      ease: 'Power1.easeIn',
      duration: 300,
      onComplete: () => {
      }
    })
  }
}

export default ScoreCounter
