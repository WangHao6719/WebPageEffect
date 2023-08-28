const imgs = [
    './img/1.webp',
    './img/2.webp',
    './img/3.webp',
    './img/4.webp',
    './img/5.webp',
]
const lorems = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, omnis!',
    'Dolore dolor a eum eos blanditiis architecto dolorem quas eaque!',
    'Repellat nostrum officia atque impedit numquam commodi delectus, est error?',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, totam?',
    'Animi eum non perferendis. Consectetur inventore vero consequatur totam eius!',
]
const container = document.querySelector('.container')
let currentIndex = 0
function createImg(index) {
    const item = document.createElement('div')
    item.classList.add('item')
    item.innerHTML = `<section style="background:url('${imgs[index]}')">
    <h1>${lorems[index]}</h1>
</section>`
    container.appendChild(item)
    return item
}
function resetElements() {
    container.innerHTML = '';
    const prevIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1
    const nextIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1
    createImg(prevIndex).classList.add('prev')
    createImg(currentIndex).classList.add('cur')
    createImg(nextIndex).classList.add('next')
}
resetElements()
let isAnimating = false
container.addEventListener('wheel', function (e) {
    if (!e.deltaY) {
        return
    }
    if (isAnimating) {
        return
    }
    isAnimating = true
    if (e.deltaY > 0) {
        container.classList.add('scroll-down')
        currentIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1
    } else {
        container.classList.add('scroll-up')
        currentIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1
    }
})
container.addEventListener('transitionend', function () {
    isAnimating = false
    container.classList.remove('scroll-down')
    container.classList.remove('scroll-up')
    resetElements()
})