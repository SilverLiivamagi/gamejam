const COIN_INTERVAL = 1500
const COIN_SPEED = 0.55
const COIN_WIDTH = 60

let coins = []
let timeSinceLastCoin
let passedCoinCount

const cloud = document.querySelector("[data-cloud]")

export function setupCoin() {
    coins.forEach(coin => coin.remove())
    timeSinceLastCoin = COIN_INTERVAL
    passedCoinCount = 0
}

export function removeCoin(cloud) {
    for (let i = 0; i < coins.length; i++){
        const coin = coins[i];
        if (isCollison(cloud, coin)) {
            console.log("collided")
            console.log("removeCoin", coin)
            console.log("removeCloud", cloud)
            coin.remove();
        }
    }
}

function isCollison(cloud, rect) {
    return !(
        ((cloud.y + cloud.height) < (rect.y)) ||
        (cloud.y > (rect.y + rect.height)) ||
        ((cloud.x + cloud.width) < rect.x) ||
        (cloud.x > (rect.x + rect.width))
    );

}

export function updateCoin(delta) {
    timeSinceLastCoin += delta

    if (timeSinceLastCoin > COIN_INTERVAL) {
        timeSinceLastCoin -= COIN_INTERVAL
        createCoin()
    }

    coins.forEach(enemy => {
        if (enemy.left + COIN_WIDTH < 0) {
            passedCoinCount++
            return enemy.remove()
        }
        enemy.left = enemy.left - delta * COIN_SPEED
    })
}

export function getCoinRects() {
    return coins.flatMap(coin => coin.rects())
}

function createCoin() {
    const coinElem = document.createElement("div")
    coinElem.classList.add("coin")

    const coin = {
        _left: 0,
        _top: 0,

        get left() {
            return this._left
        },
        set left(value) {
            console.log(value)
            this._left = value
            coinElem.style.setProperty("--coin-left", this._left)
        },

        set top(value) {
            this._top = value
            coinElem.style.setProperty("--coin-top", this._top)

        },
        remove() {
            coins = coins.filter(c => c !== coin)
            coinElem.remove()
        },

        rects() {
            return coinElem.getBoundingClientRect()
        }
    }

    coin.top = getRandomNumber()
    coin.left = window.innerWidth
    document.body.append(coinElem)
    coins.push(coin)
}

function getRandomNumber() {
    return Math.random() * (window.innerHeight);
}
