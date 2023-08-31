const n = 8
const bubbles = document.querySelector('.bubbles')
bubbles.addEventListener('animationend', e => {
    e.target.remove()
})
function createBubbles() {
    const vw = document.documentElement.clientWidth
    for (let i = 0; i < n; i++) {
        const bubble = document.createElement('div')
        bubble.classList.add('bubble')
        const s = Math.random() * 100 + 50
        const x = Math.random() * (vw - s)
        const d = Math.random() * 2 + 1
        bubble.style.setProperty('--s', `${s}px`)
        bubble.style.setProperty('--x', `${x}px`)
        bubble.style.setProperty('--d', `${d}s`)
        bubbles.appendChild(bubble)
    }
}
createBubbles()
setInterval(createBubbles, 500)