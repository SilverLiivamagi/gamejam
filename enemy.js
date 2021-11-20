const ENEMY_INTERVAL = 1000
const ENEMY_SPEED = 0.80
const ENEMY_WIDTH = 60

let enemies = []
let timeSinceLastEnemy
let passedEnemyCount

const cloud = document.querySelector("[data-cloud]")

export function setupEnemy() {
    enemies.forEach(enemy => enemy.remove())
    timeSinceLastEnemy = ENEMY_INTERVAL
    passedEnemyCount = 0
}

export function updateEnemy(delta) {
    timeSinceLastEnemy += delta

    if (timeSinceLastEnemy > ENEMY_INTERVAL) {
        timeSinceLastEnemy -= ENEMY_INTERVAL
        createEnemy()
    }

    enemies.forEach( enemy => {
        if (enemy.left + ENEMY_WIDTH < 0) {
            passedEnemyCount++
            return enemy.remove()
        }
        enemy.left = enemy.left - delta * ENEMY_SPEED
    })
}

export function getPassedEnemyCount() {
    return passedEnemyCount
}

export function getEnemyRects() {
    return enemies.flatMap( enemy => enemy.rects())
}

function createEnemy() {
    const enemyElem = document.createElement("div")
    enemyElem.classList.add("enemy")

    const enemy = {
        _left: 0,
        _top: 0,

        get left(){
            return this._left
        },
        set left(value){
            console.log(value)
            this._left = value
            enemyElem.style.setProperty("--enemy-left", this._left)
        },

        set top(value) {
            this._top = value
            enemyElem.style.setProperty("--enemy-top", this._top)

        },
        remove() {
            enemies = enemies.filter(e => e !== enemy)
            enemyElem.remove()
        },

        rects() {
            return enemyElem.getBoundingClientRect()
        }
    }

    enemy.top = getRandomNumber()
    enemy.left = window.innerWidth
    document.body.append(enemyElem)
    enemies.push(enemy)
}

function setTop(top) {
    cloud.style.setProperty("--enemy-top", top)
}

function getTop() {
    return parseFloat(getComputedStyle(cloud).getPropertyValue("--enemy-top"))
}

function getRandomNumber() {
    return Math.random() * (window.innerHeight-60);
}
