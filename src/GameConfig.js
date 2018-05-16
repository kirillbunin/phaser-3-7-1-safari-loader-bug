import GameScene from './GameScene'

export default {
  type: Phaser.WEBGL,
  parent: 'content',
  // backgroundColor: '#fdf1d2',
  transparent: true,
  width: window.innerWidth > 667 ? 667 : window.innerWidth,
  height: 667,
  resolution: window.devicePixelRatio * (window.innerHeight / 667),
  autoResize: true,
  fps: {
    min: 30,
    target: 60,
    forceSetTimeOut: false,
    deltaHistory: 60
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        x: 0,
        y: 4.5
      }
    }
  },
  scene: [
    GameScene
  ]
}
