import GameScene from './GameScene'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  // backgroundColor: '#fdf1d2',
  transparent: true,
  width: window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth,
  height: 667,
  resolution: window.devicePixelRatio,
  autoResize: true,
  fps: {
    min: 60,
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
      // debug: true,
      // debugShowBody: true,
      // isFixed: true,
      // debugBodyColor: 0xff0000,
      // wireframes: true,
      // showSleeping: true,
      // showDebug: true,
      // showBroadphase: true,
      // showBounds: true,
      // showVelocity: true,
      // showCollisions: true,
      // showSeparations: true,
      // showAxes: true,
      // showPositions: true,
      // showAngleIndicator: true,
      // showIds: true,
      // showShadows: true,
      // showVertexNumbers: true,
      // showConvexHulls: true,
      // showInternalEdges: true,
      // showMousePosition: true
    }
  },
  scene: [
    GameScene
  ]
}
