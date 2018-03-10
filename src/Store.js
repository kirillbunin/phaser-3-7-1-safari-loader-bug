class Store {
  constructor () {
    this.state = {
      score: 0,
      highScore: 3
    }
    this.mutations = {}
  }
  updateScore (i) {
    this.state.score = i
  }
  updateHighScore (i) {
    if (i) {
      this.state.highScore = i
      document.getElementById('highScore').innerHTML = i
    } else {
      this.state.highScore = this.state.score
      document.getElementById('highScore').innerHTML = this.state.score
    }
  }
}

export default new Store()
