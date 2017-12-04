var Environment = require('./Environment.js')

const environment = new Environment()
const numberOfEpisodes = 3000

const q_table = {}

const GAMMA = 0.8
const E_BOUNDARY = 1000
let EPSILON = 0.7
let stepNumber = 0
const actions = ['left', 'up', 'right', 'down']

const EPS_STEP = EPSILON / E_BOUNDARY

for (let i = 0; i < numberOfEpisodes; i++) {

    environment.reset();

    while (!environment.isEpisodeEnd) {
        EPSILON = (EPSILON - EPS_STEP) > 0.01 ? (EPSILON - EPS_STEP) : 0.01
        stepNumber++

        const currentPositionKey = JSON.stringify(environment.agentPosition)
        
        if (!q_table.hasOwnProperty(currentPositionKey)) {
            q_table[currentPositionKey] = {}
            for (const action of actions) {
                q_table[currentPositionKey][action] = 0
            }
        }
        
        const selectedAction = policy()
        // Here comes the agent action in environment
        const [reward, newPosition] = environment.action(selectedAction)

        // Magic Q calculation
        q_table[currentPositionKey][selectedAction] = reward + GAMMA * (maxQfromPosition(JSON.stringify(newPosition)))
        // console.log(reward, newPosition)
        // console.log(currentPosition, newPosition)
        // console.log(q_table[currentPositionKey][selectedAction])
    }
}

function policy () {
    if (Math.random() < EPSILON) {
        return actions[Math.floor(Math.random() * 4)]
    }

    return getMaxValueAction()
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

function countKeysInQTable () {
    return Object.keys(q_table).length
}

function getMaxValueAction () {
    const currentPositionKey = JSON.stringify(environment.agentPosition)
    let selectedAction = 'left'
    let maxList = [selectedAction]

    // What if the position is not initialized
    for (const action of actions.slice(1)) {
        if (q_table[currentPositionKey][action] > q_table[currentPositionKey][selectedAction]) {
            maxList = []
            maxList.push(action)
            selectedAction = action
        } else if (q_table[currentPositionKey][action] == q_table[currentPositionKey][selectedAction]) {
            maxList.push(action)
        }
    }

    return maxList[Math.floor(Math.random() * maxList.length)]
}

function playRandomGame () {

    console.log(`The agentPosition: ${environment.agentPosition}`)
    console.log(`The targetPosition: ${environment.targetPosition}`)

    

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

