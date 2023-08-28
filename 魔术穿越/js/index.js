const card = document.querySelector('.card');
card.onmousedown = function (e) {
    const x = e.pageX - card.offsetLeft;
    const y = e.pageY - card.offsetTop;
    window.onmousemove = function (e) {
        const cx = e.pageX - x;
        const cy = e.pageY - y;
        card.style.left = cx + 'px';
        card.style.top = cy + 'px';
        console.log('onmousemove')
        channel.postMessage(getScreenPoint(cx, cy))
    }
    window.onmouseup = function () {
        window.onmousemove = null;
        window.onmouseup = null;
    }
}
function getClientPoint(screenx, screeny) {
    const BAR = 79
    const x = screenx - window.screenX
    const y = screeny - window.screenY - BAR
    return { x, y }
}
function getScreenPoint(clientx, clienty) {
    const BAR = 79
    const x = clientx + window.screenX
    const y = clienty + window.screenY + BAR
    return { x, y }
}
function init() {
    if (location.search.includes('hidden')) {
        document.querySelector('.card').style.left = '-1000px'
    }
}
init()

const channel = new BroadcastChannel('card')

channel.onmessage = function (e) {
    // console.log(e.data)
    const { x, y } = getClientPoint(e.data.x, e.data.y)
    card.style.left = x + 'px'
    card.style.top = y + 'px'
}