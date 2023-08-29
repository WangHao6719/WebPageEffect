const elementBox = document.documentElement;
const box = document.querySelector('.box');
elementBox.onclick = async () => {
    const dropper = new EyeDropper();
    try {
        const result = await dropper.open();
        box.style.backgroundColor = result.sRGBHex;
    } catch (e) {
        console.log('用户取消了取色');
    }
};