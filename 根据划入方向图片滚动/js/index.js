const container = document.querySelector('.container');
const content = document.querySelector('.content');
const rect = container.getBoundingClientRect();
const theta = Math.atan(rect.height / rect.width);

container.addEventListener('mouseenter', (e) => {
    const x = e.offsetX - rect.width / 2;
    const y = rect.height / 2 - e.offsetY;
    const deg = Math.atan2(y, x);
    let dire;
    if (deg < theta && deg >= -theta) {
        dire = 'right';
    } else if (deg >= theta && deg < Math.PI - theta) {
        dire = 'top';
    } else if (deg >= Math.PI - theta || deg <= -(Math.PI - theta)) {
        dire = 'left';
    } else if (deg <= -theta && deg > -(Math.PI - theta)) {
        dire = 'bottom';
    }
    content.classList.add(dire);
});
container.addEventListener('mouseleave', () => {
    content.className = 'content';
});