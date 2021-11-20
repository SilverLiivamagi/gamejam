const cloud = document.querySelector("[data-cloud]")
const CLOUD_SPEED = 0.5
const JUMP_DURATION = 125
let timeSinceLastJump = Number.POSITIVE_INFINITY

export function setupCloud() {
    setTop(window.innerHeight / 2)
    document.removeEventListener("keydown", handleJump)
    document.addEventListener("keydown", handleJump)
}

export function updateCloud(delta) {
    if (timeSinceLastJump < JUMP_DURATION) {
        setTop(getTop() - CLOUD_SPEED * delta)
    } else {
        setTop(getTop() + CLOUD_SPEED * delta)
    }

    timeSinceLastJump += delta
}

export function getCloudRect() {
    return cloud.getBoundingClientRect()
}

function setTop(top) {
    cloud.style.setProperty("--cloud-top", top)
}

function getTop() {
    return parseFloat(getComputedStyle(cloud).getPropertyValue("--cloud-top"))
}

function handleJump(e) {
    if (e.code !== "Space") return

    timeSinceLastJump = 0
}