const items = document.querySelectorAll('.carousel-item');
let index = 3;
function layout() {
    const xOffsetStep = 100 // 每个item的x偏移量
    const count = items.length;
    const scaleStep = 0.7;
    const opacityStep = 0.5;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const sing = Math.sign(i - index);
        // transform translateX scale rotate 
        let xOffset = (i - index) * xOffsetStep;
        if (i !== index) {
            xOffset = xOffset + 100 * sing;
        }
        item.style.transform = `translateX(${xOffset}px)`;
        const scale = scaleStep ** Math.abs(i - index);
        item.style.transform += `scale(${scale})`;
        const rotateY = i === index ? 0 : 45 * -sing;
        item.style.transform += `rotateY(${rotateY}deg)`;
        // opacity 
        const opacity = opacityStep ** Math.abs(i - index);
        item.style.opacity = opacity;
        //z-index
        const zIndex = count - Math.abs(index - i);
        item.style.zIndex = zIndex;
    }
}

layout();

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
//上一张点击事件
prev.addEventListener('click',
    () => {
        index--;
        if (index < 0) {
            index = 0;
        }
        layout();
    }
);
//下一张点击事件
next.addEventListener('click',
    () => {
        index++;
        if (index > items.length - 1) {
            index = items.length - 1;
        }
        layout();
    }
);
//每一张点击事件
items.forEach((item, i) => {
    item.addEventListener('click', () => {
        index = i;
        layout();
    });
});



