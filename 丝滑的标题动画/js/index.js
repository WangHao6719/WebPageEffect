document.querySelectorAll('.title').forEach((el) => {
    el.innerHTML = el.textContent.split('').map((c) => `<span class="letter">${c.trim() ? c : '&nbsp;'}</span>`).join('');
});
const letters = document.querySelectorAll('.letter');
for (let i = 0; i < letters.length; i++) {
    letters[i].style.setProperty('--delay', `${i * 0.05}s`);
}