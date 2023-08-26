const tab1 = document.querySelector('.tab1');
const tab2 = document.querySelector('.tab2');
const text1 = document.querySelector('.text1');
const text2 = document.querySelector('.text2');
let curIndex = 1;
text1.addEventListener('click', function () {
    curIndex = 1;
    changeTabColor(curIndex);

});
text2.addEventListener('click', function () {
    curIndex = 2;
    changeTabColor(curIndex);
});
//改变tab颜色
changeTabColor = function (curIndex) {
    if (curIndex == 1) {
        tab1.classList.add('active');
        tab2.classList.remove('active');
        text1.classList.add('active-text');
        text2.classList.remove('active-text');
    } else {
        tab2.classList.add('active');
        tab1.classList.remove('active');
        text2.classList.add('active-text');
        text1.classList.remove('active-text');
    }
};
changeTabColor(curIndex);
