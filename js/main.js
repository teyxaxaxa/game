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
const gameTitle = document.querySelector(".game-title");
const partnersLeft = document.querySelector(".partners-left");
const partnersRight = document.querySelector(".partners-right");

// Функция для анимации появления
function animateElement(element, delay, addIdle = true) {
  if (!element) return;
  
  setTimeout(() => {
    if (element.classList.contains('hidden')) {
      element.classList.remove("hidden");
    }
    
    element.style.opacity = "1";
    element.classList.add("show");

    setTimeout(() => {
      element.classList.remove("show");
      // Для заголовка и партнеров не добавляем idle
      if (addIdle && element !== gameTitle && 
          element !== partnersLeft && element !== partnersRight) {
        element.classList.add("idle");
      }
    }, 1500);
  }, delay);
}

// Последовательность появления:
// 1. Заголовок игры первым
setTimeout(() => {
  animateElement(gameTitle, 0, false);
}, 300);

// 2. Бегущие строки партнеров слева и справа одновременно
setTimeout(() => {
  animateElement(partnersLeft, 0, false);
  animateElement(partnersRight, 0, false);
}, 300);

// 3. Пряник через 0.9 секунды
setTimeout(() => {
  animateElement(character, 0);
}, 900);

// 4. Милиса и Рустам одновременно через 1.2 секунды
setTimeout(() => {
  animateElement(charactermila, 0);
  animateElement(characterryasu, 0);
}, 1200);

// 5. Юля и Артём одновременно через 1.5 секунды
setTimeout(() => {
  animateElement(characterjulia, 0);
  animateElement(characterartemolen, 0);
}, 1500);

// 6. Кнопка через 2.5 секунды
setTimeout(() => {
  animateElement(playBtn, 0);
}, 2500);

// Остальной JavaScript код без изменений...
// Максимально просто но ОЧЕНЬ много
function createSuperSpark() {
  const spark = document.createElement('div');
  spark.style.cssText = `
    position: fixed;
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    width: 5px;
    height: 5px;
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

setInterval(createSuperSpark, 50);

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
});