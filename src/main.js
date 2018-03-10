import 'phaser'
import GameConfig from './GameConfig'

let game = new Phaser.Game(GameConfig)

document.getElementById('header').style.width = GameConfig.width + 'px'
