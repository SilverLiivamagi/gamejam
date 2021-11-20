import {getCloudRect, setupCloud, updateCloud} from "./cloud.js"
import {getEnemyRects, getPassedEnemyCount, setupEnemy, updateEnemy} from "./enemy.js";
import {getCoinRects, setupCoin, updateCoin, removeCoin} from "./coin.js";

document.addEventListener("keypress", handleStart, {once: true})
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")
const subtitle_coin = document.querySelector("[data-subtitle-coin]")
const subtitle_score = document.querySelector("[data-subtitle-score]")

let lastTime
let coins = 0

function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }

    const delta = time - lastTime
    updateCloud(delta)
    updateEnemy(delta)
    updateCoin(delta)
    if (checkLose()) { return handleLose()}
    checkCoinCollected()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function checkCoinCollected() {
    console.log("checkCoinCollected")
    const cloud = getCloudRect()
    const coin = getCoinRects().some(coin => isCollison(cloud, coin))

    if (coin) {
        console.log("coinerino", coin)
        coins = Number(coins) + 1
        removeCoin(cloud)
    }

}

function checkLose() {
    const cloud = getCloudRect()
    const insideEnemy = getEnemyRects().some(rect => isCollison(cloud, rect))
    const outsideWorld = cloud.top < 0 || cloud.bottom > window.innerHeight
    return outsideWorld || insideEnemy
}

function handleStart() {
    title.classList.add("hide")
    setupCloud()
    setupEnemy()
    setupCoin()
    lastTime = null
    coins = 0
    window.requestAnimationFrame(updateLoop)
}

function isCollison(cloud, rect) {
    console.log("cloud", cloud)
    console.log("rect", rect)

    return !(
        ((cloud.y + cloud.height) < (rect.y)) ||
        (cloud.y > (rect.y + rect.height)) ||
        ((cloud.x + cloud.width) < rect.x) ||
        (cloud.x > (rect.x + rect.width))
    );

}

function handleLose() {
    console.log("HANDLE LOSE")
    setTimeout(() => {
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle_coin.classList.remove("hide")
        subtitle_score.classList.remove("hide")
        subtitle.textContent = `Avoided ${getPassedEnemyCount()} enemies`
        subtitle_coin.textContent = `Coins collected: ${coins}`
        subtitle_score.textContent = `Score:  ${Math.round(Number(coins) * Number(getPassedEnemyCount() * 0.8))}`
        document.addEventListener("keypress", handleStart, { once: true })
    }, 100)
}