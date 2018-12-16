
game.player = {
		x: 54,
		y: 0,
		height: 24,
		highestY: 0,
		direction: "left",
		isInAir: false,
		moveInterval: null,
		fallInterval: null, // The intervalest of intervals
		animationFrameNumber: 0,
		collidesWithGround: true,
		animations: {
			// Describe coordinates of consecutive animation frames of objects in textures
			left: [{tileColumn: 4, tileRow: 0}, {tileColumn: 5, tileRow: 0}, {tileColumn: 4, tileRow: 0}, {tileColumn: 6, tileRow: 0}],
			right: [{tileColumn: 9, tileRow: 0}, {tileColumn: 8, tileRow: 0}, {tileColumn: 9, tileRow: 0}, {tileColumn: 7, tileRow: 0}]
		},
		jump: function (type) {
			if (!this.isInAir) {
				clearInterval(this.fallInterval)
				this.isInAir = true
				var startingY = this.y
				var time = 1
				maxHeight = 121
				if (type == "fall") {
					time = 30
					maxHeight = 0
				}
				this.fallInterval = setInterval(function() {
					if (this.isInAir) {
						this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2)
						if (this.y < this.highestY) {
							this.highestY = this.y
						}
						if (time > 30) {
							game.checkCollisions()
						}
						if (time > 150) {
							game.isOver = true
						}
						game.requestRedraw()
					}
					time++
				}.bind(this), 9)
			}
		}
	}