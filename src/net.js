
    // Top left
    this.boardNet1 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 3, 40, {render: {fillStyle: '#000000'}, collisionFilter: { mask: category2 }})
    // Top left/middle
    this.boardNet2 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 3, 30, {isSensor: true, render: {fillStyle: '#000000'}})
    // Top right/middle
    this.boardNet3 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 3, 30, {isSensor: true, render: {fillStyle: '#000000'}})
    // Top right
    this.boardNet4 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 3, 40, {render: {fillStyle: '#000000'}, collisionFilter: { mask: category2 }})
    this.matter.add.joint(this.boardNet1, this.boardRimLeft, 0, 0.132, {
      pointA: { x: 0, y: -20 }
    })
    this.matter.add.joint(this.boardNet2, this.boardRimLeft, 0, 0.132, {
      pointA: { x: 0, y: -15 },
      pointB: { x: 30, y: 0 }
    })
    this.matter.add.joint(this.boardNet3, this.boardRimRight, 0, 0.132, {
      pointA: { x: 0, y: -15 },
      pointB: { x: -30, y: 0 }
    })
    this.matter.add.joint(this.boardNet4, this.boardRimRight, 0, 0.132, {
      pointA: { x: 0, y: -20 }
    })

    // Connecting top left with top left/middle
    this.boardNet5 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 30, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet5, this.boardNet1, 0, 0.132, {
      pointA: { x: -15, y: 0 },
      pointB: { x: 0, y: 20 }
    })
    this.matter.add.joint(this.boardNet5, this.boardNet2, 0, 0.132, {
      pointA: { x: 15, y: 0 },
      pointB: { x: 0, y: 15 }
    })

    // Connecting top right/middle with top right
    this.boardNet6 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 30, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet6, this.boardNet3, 0, 0.132, {
      pointA: { x: 15, y: 0 },
      pointB: { x: 0, y: 15 }
    })
    this.matter.add.joint(this.boardNet6, this.boardNet4, 0, 0.132, {
      pointA: { x: -15, y: 0 },
      pointB: { x: 0, y: 20 }
    })

    // Bottom left
    this.boardNet7 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 40, 3, {render: {fillStyle: '#000000'}, collisionFilter: { mask: category2 }})
    this.matter.add.joint(this.boardNet7, this.boardNet1, 0, 0.132, {
      pointA: { x: -20, y: 0 },
      pointB: { x: 0, y: 20 }
    })

    // Bottom left, first top diagonal
    this.boardNet8 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet8, this.boardNet1, 0, 0.132, {
      pointA: { x: -12, y: 0 },
      pointB: { x: 0, y: 20 }
    })

    // Bottom left, first bottom diagonal
    this.boardNet9 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet9, this.boardNet7, 0, 0.132, {
      pointA: { x: -12, y: 0 },
      pointB: { x: 20, y: 0 }
    })
    this.matter.add.joint(this.boardNet9, this.boardNet8, 0, 0.132, {
      pointA: { x: 12, y: 0 },
      pointB: { x: 12, y: 0 }
    })

    // Bottom left, second bottom diagonal
    this.boardNet11 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet11, this.boardNet2, 0, 0.132, {
      pointA: { x: 12, y: 0 },
      pointB: { x: 0, y: 15 }
    })

    this.boardNet12 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet12, this.boardNet8, 0, 0.132, {
      pointA: { x: -12, y: 0 },
      pointB: { x: 12, y: 0 }
    })
    this.matter.add.joint(this.boardNet12, this.boardNet11, 0, 0.132, {
      pointA: { x: 12, y: 0 },
      pointB: { x: -12, y: 0 }
    })

    this.boardNet13 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet13, this.boardNet8, 0, 0.132, {
      pointA: { x: 12, y: 0 },
      pointB: { x: 12, y: 0 }
    })

    this.boardNet14 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet14, this.boardNet11, 0, 0.132, {
      pointA: { x: -12, y: 0 },
      pointB: { x: -12, y: 0 }
    })
    this.matter.add.joint(this.boardNet14, this.boardNet3, 0, 0.132, {
      pointA: { x: 12, y: 0 },
      pointB: { x: 0, y: 15 }
    })

    this.boardNet15 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet15, this.boardNet11, 0, 0.132, {
      pointA: { x: -12, y: 0 },
      pointB: { x: -12, y: 0 }
    })

    this.boardNet16 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet16, this.boardNet13, 0, 0.132, {
      pointA: { x: -12, y: 0 },
      pointB: { x: -12, y: 0 }
    })
    this.matter.add.joint(this.boardNet16, this.boardNet15, 0, 0.132, {
      pointA: { x: 12, y: 0 },
      pointB: { x: 12, y: 0 }
    })

    // Bottom right
    this.boardNet17 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 40, 3, {render: {fillStyle: '#000000'}, collisionFilter: { mask: category2 }})
    this.matter.add.joint(this.boardNet17, this.boardNet4, 0, 0.132, {
      pointA: { x: -20, y: 0 },
      pointB: { x: 0, y: 20 }
    })

    this.boardNet18 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet18, this.boardNet15, 0, 0.132, {
      pointA: { x: -12, y: 0 },
      pointB: { x: 12, y: 0 }
    })
    this.matter.add.joint(this.boardNet18, this.boardNet4, 0, 0.132, {
      pointA: { x: 12, y: 0 },
      pointB: { x: 0, y: 20 }
    })

    this.boardNet19 = this.matter.add.rectangle(this.boardRim.x, this.boardRim.y, 24, 3, {isSensor: true, render: {fillStyle: '#000000'}})
    this.matter.add.joint(this.boardNet19, this.boardNet15, 0, 0.132, {
      pointA: { x: -12, y: 0 },
      pointB: { x: 12, y: 0 }
    })
    this.matter.add.joint(this.boardNet19, this.boardNet17, 0, 0.132, {
      pointA: { x: 12, y: 0 },
      pointB: { x: 20, y: 0 }
    })