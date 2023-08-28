const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = 800 * devicePixelRatio;
const height = canvas.height = 800 * devicePixelRatio;

//重置坐标系
ctx.translate(width / 2, height);
//翻转坐标系
ctx.scale(1, -1);
//绘画一个半圆土地
ctx.beginPath();
ctx.arc(0, -600, 800, 0, Math.PI * 2);
ctx.fillStyle = '#996600';
ctx.fill();
drawBranch({ x: 0, y: 80 }, 20, 120, 90);

setInterval(() => {
    window.location.reload();
}, 5000);

//绘制树的枝干
function drawBranch(v0, thick, length, dir) {
    if (length < 5) {
        ctx.beginPath();
        ctx.arc(v0.x, v0.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.5 ? '#FFFFFF' : '#FF6666';
        ctx.fill();
        return
    };
    if (thick < 8 && Math.random() < 0.3) return;

    ctx.beginPath();
    ctx.moveTo(v0.x, v0.y);
    ctx.lineTo(v0.x + length * Math.cos(dir * Math.PI / 180), v0.y + length * Math.sin(dir * Math.PI / 180));
    ctx.strokeStyle = '#333';
    ctx.lineCap = 'round';
    ctx.lineWidth = thick;
    ctx.stroke();
    //递归绘制左右分支
    drawBranch({ x: v0.x + length * Math.cos(dir * Math.PI / 180), y: v0.y + length * Math.sin(dir * Math.PI / 180) }, thick * 0.8, length * 0.8, dir + Math.random() * 30);
    drawBranch({ x: v0.x + length * Math.cos(dir * Math.PI / 180), y: v0.y + length * Math.sin(dir * Math.PI / 180) }, thick * 0.8, length * 0.8, dir - Math.random() * 30);
}
