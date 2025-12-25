// движение камеры
const bg = document.querySelector(".parallax-bg img");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  bg.style.transform = `translate(${-x}px, ${-y}px) scale(1.02)`;
});

// Все элементы
const character = document.querySelector(".character");
const charactermila = document.querySelector(".charactermila");
const characterryasu = document.querySelector(".characterryasu");
const characterjulia = document.querySelector(".characterjulia");
const characterartemolen = document.querySelector(".characterartemolen");
const playBtn = document.querySelector(".play-btn");

// Функция для анимации появления
function animateElement(element, delay) {
  if (!element) return;
  
  setTimeout(() => {
    if (element.classList.contains('hidden')) {
      element.classList.remove("hidden");
    }
    
    element.style.opacity = "1";
    element.classList.add("show");

    setTimeout(() => {
      element.classList.remove("show");
      element.classList.add("idle");
    }, 1500);
  }, delay);
}

// Последовательность появления:
// 1. Пряник через 1 секунду
setTimeout(() => {
  animateElement(character, 0);
}, 500);

// 2. Милиса и Рустам одновременно через 2 секунды
setTimeout(() => {
  animateElement(charactermila, 0);
  animateElement(characterryasu, 0);
}, 1000);

// 3. Юля и Артём одновременно через 3 секунды
setTimeout(() => {
  animateElement(characterjulia, 0);
  animateElement(characterartemolen, 0);
}, 1500);

// 4. Кнопка через 3.5 секунды (через 0.5s после последних персонажей)
setTimeout(() => {
  animateElement(playBtn, 0);
}, 2500);









// Максимально просто но ОЧЕНЬ много
function createSuperSpark() {
  const spark = document.createElement('div');
  spark.style.cssText = `
    position: fixed;
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    width: 4px;
    height: 4px;
    background: #ffb48eff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 5;
    box-shadow: 0 0 10px #ff2200ff;
    animation: sparkPop 0.7s ease-out forwards;
  `;
  
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 700);
}

// Стили
if (!document.querySelector('#spark-pop-styles')) {
  const style = document.createElement('style');
  style.id = 'spark-pop-styles';
  style.textContent = '@keyframes sparkPop {0%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(0);}}';
  document.head.appendChild(style);
}

// СУПЕР ЧАСТО - каждые 20ms!
setInterval(createSuperSpark, 20);



// Появление анимации при нажатии

const loading = document.getElementById('loading');
const loadingFirst = document.getElementById('first');
const loadingSecond = document.getElementById('second');
const loadingbtn = document.getElementById('loadingbtn');


loadingbtn.addEventListener('click', () => {
    loading.style.display = "block";
    loadingFirst.style.display = "block";
    loadingSecond.style.display = "block";
    loading.style.animation = "loading 8s forwards";
    loadingFirst.style.animation = "loading 5s forwards";
    loadingSecond.style.animation = "loading 4s forwards";

setTimeout(() => {
  window.location.replace('game.html');
}, 2500);


})