const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

function init() {
    cvs.width = window.innerWidth * devicePixelRatio;
    cvs.height = window.innerHeight * devicePixelRatio;

}
init();
const fontSize = 20 * devicePixelRatio;
ctx.font = `${fontSize}px Arial`;
const columeCount = Math.floor(cvs.width / fontSize);
const charIndex = new Array(columeCount).fill(0);
function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = '#6BE445';
    ctx.textBaseline = 'top';
    for (let i = 0; i < columeCount; i++) {
        ctx.fillText(getRandomChar(), i * fontSize, charIndex[i] * fontSize);
        if (charIndex[i] * fontSize > cvs.height && Math.random() > 0.99) {
            charIndex[i] = 0;
        } else {
            charIndex[i]++;
        }
    }
}
setInterval(draw, 1000 / 30);
//获取随机字符
function getRandomChar() {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return str[Math.floor(Math.random() * str.length)];
}
window.addEventListener('resize', init);
