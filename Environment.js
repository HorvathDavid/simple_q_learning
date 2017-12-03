module.exports = class Environment {
    constructor() {

        this.directionPool = {
            left: [0, -1],
            up: [-1, 0],
            right: [0, 1],
            down: [1, 0]
        }

        this.mapSize = 40
        this.agentPosition = null
        this.targetPosition = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]

        this._resetAgentPosition()
        this.reset()
        console.log(`The agentPosition: ${this.agentPosition}`)
        console.log(`The targetPosition: ${this.targetPosition}`)
    }

    reset() {
        this.isEpisodeEnd = false
        this.outOfMap = false
        this._resetAgentPosition()
    }

    action(direction) {
        return this._calculateNextState(this.directionPool[direction])
    }

    _resetAgentPosition() {
        this.agentPosition = [Math.floor(Math.random() * this.mapSize), Math.floor(Math.random() * this.mapSize)]

        if (this.agentPosition[0] == this.targetPosition[0] && this.agentPosition[1] == this.targetPosition[1]) {
            this._resetAgentPosition()
        }
    }

    // direction should be = []
    _calculateNextState(direction) {
        // pl [5, 4]
        this.agentPosition = [this.agentPosition[0] + direction[0], this.agentPosition[1] + direction[1]]
        if (this.agentPosition[0] == this.mapSize || this.agentPosition[0] < 0 || this.agentPosition[1] == this.mapSize || this.agentPosition[1] < 0) {
            this.outOfMap = true
            this.isEpisodeEnd = true
        }

        return [this._calculateReward(this.agentPosition), this.agentPosition]
    }

    _calculateReward(nextPosition) {
        if (this.outOfMap) {
            return -100
        } else if (this.targetPosition[0] == nextPosition[0] && this.targetPosition[1] == nextPosition[1]) {
            this.isEpisodeEnd = true
            return 100
        }

        return -1
    }
}

const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]