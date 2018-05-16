// import 'whatwg-fetch'
import 'babel-polyfill'
import 'phaser'
import GameConfig from './GameConfig'

window.onload = () => {
  let game = new Phaser.Game(GameConfig)
}
