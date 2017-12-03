var Environment = require('./Environment.js')

const environment = new Environment()
const numberOfEpisodes = 1000

const q_table = {}

const GAMMA = 0.8

for (let i = 0; i < numberOfEpisodes; i++) {

    environment.reset();

    while (!environment.isEpisodeEnd) {

        const actions = ['left', 'up', 'right', 'down']
        const selectedAction = actions[Math.floor(Math.random() * 4)]

        const currentPositionKey = JSON.stringify(environment.agentPosition)

        if (!q_table.hasOwnProperty(currentPositionKey)) {
            q_table[currentPositionKey] = {}
            for (const action of actions) {
                q_table[currentPositionKey][action] = 0
            }
        }

        // Here comes the agent action in environment
        const [reward, newPosition] = environment.action(selectedAction)

        // Magic Q calculation
        q_table[currentPositionKey][selectedAction] = reward + GAMMA * (maxQfromPosition(JSON.stringify(newPosition)))
        // console.log(reward, newPosition)
        // console.log(currentPosition, newPosition)
        // console.log(q_table[currentPositionKey][selectedAction])
    }
}

function maxQfromPosition (position) {

    let maxQValue = 0

    for (let action in q_table[position]) {
        if (q_table[position][action] > maxQValue) {
            maxQValue = q_table[position][action]
        }
    }

    return maxQValue
}

// console.log(JSON.stringify(q_table, null, 2))
console.log(countKeysInQTable())

playRandomGame()
playRandomGame()
playRandomGame()

function countKeysInQTable () {
    return Object.keys(q_table).length
}

function playRandomGame () {

    console.log(`The agentPosition: ${environment.agentPosition}`)
    console.log(`The targetPosition: ${environment.targetPosition}`)

    let getMaxValueAction = function () {
        const currentPositionKey = JSON.stringify(environment.agentPosition)
        const actions = ['left', 'up', 'right', 'down']
        let selectedAction = 'left'
        // What if the position is not initialized
        for (const action of actions) {
            if (q_table[currentPositionKey][action] > q_table[currentPositionKey][selectedAction]) {
                selectedAction = action
            }
        }

        return selectedAction
    }

    environment.reset()
    let stepCounter = 0


    while (!environment.isEpisodeEnd) {

        const selectedAction = getMaxValueAction()
        stepCounter++

        // Here comes the agent action in environment
        const [reward, newPosition] = environment.action(selectedAction)

        // Magic Q calculation
        console.log(reward, newPosition)
        // console.log(currentPosition, newPosition)
        // console.log(q_table[currentPositionKey][selectedAction])
    }

    console.log(`The SUM of steps: ${stepCounter}`)
}

