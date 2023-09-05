/**
 * 格式化歌词
 */
function parseLrc() {
    var lines = lrc.split('\n');
    var result = [];
    for (let i = 0; i < lines.length; i++) {
        var str = lines[i];
        var parts = str.split(']')
        var timeStr = parts[0].substring(1)
        var obj = {
            time: parsetime(timeStr),
            text: parts[1]
        }
        result.push(obj)
    }
    return result
}

/**
 * 时间字符串转数字
 * @param {String} timeStr  时间字符串
 * @returns 
 */
function parsetime(timeStr) {
    var parts = timeStr.split(':')
    return +parts[0] * 60 + +parts[1]
}
var lrcData = parseLrc()
/**
 * 获取需要的Dom
 */
var doms = {
    audio: document.querySelector('audio'),
    lrcUl: document.querySelector('ul'),
    container: document.querySelector('.container'),
}

let timerTime = 0 //当前歌词的时间
/**
 * 计算高亮显示歌词索引
 */
function findIndex() {
    var currentTime = doms.audio.currentTime
    for (let i = 0; i < lrcData.length; i++) {
        var obj = lrcData[i]
        var nextObj = lrcData[i + 1]
        timerTime = nextObj ? nextObj.time - obj.time : 0
        doms.lrcUl.style.setProperty('--progress', Math.floor(timerTime) + 's')
        if (currentTime < obj.time) {
            progress = 0
            return i - 1

        }
    }
    //播放至最后一句
    return lrcData.length - 1
}

/**
 * 页面渲染
 */
function createLrcElement() {
    for (let i = 0; i < lrcData.length; i++) {
        var li = document.createElement('li')
        li.innerHTML = lrcData[i].text
        doms.lrcUl.appendChild(li)
    }
}
createLrcElement()

//容器高度
var containerHeight = doms.container.clientHeight
//li的高度
var liHeight = doms.lrcUl.children[0].clientHeight
//ul最大偏移量
var maxOffset = doms.lrcUl.clientHeight - containerHeight
/**
 * 设置ul的偏移量
 */
function setOffset() {
    var index = findIndex()
    var offset = liHeight * index + liHeight / 2 - containerHeight / 2
    if (offset < 0) {
        offset = 0
    }
    if (offset > maxOffset) {
        offset = maxOffset
    }
    doms.lrcUl.style.transform = 'translateY(-' + offset + 'px)'
    //去掉之前的li样式
    var li = doms.lrcUl.querySelector(".active")
    if (li) {
        li.classList.remove('active')
    }
    //添加新的li样式
    li = doms.lrcUl.children[index]
    if (li) {
        li.classList.add('active')
    }
}

/**
 * 监听播放
 */
doms.audio.addEventListener('timeupdate', function () {
    setOffset()
})
//监听播放
doms.audio.addEventListener('play', function () {
    var index = findIndex()
    var li = doms.lrcUl.children[index]
    li.classList.remove('paused')
    li.classList.add('play')
    setOffset()
})
//监听暂停
doms.audio.addEventListener('pause', function () {
    var index = findIndex()
    var li = doms.lrcUl.children[index]
    li.classList.remove('play')
    li.classList.add('paused')
})