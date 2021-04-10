/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

let mouseDrop = 0;
let left = 0;
let top = 0;

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {
  if (mouseDrop) {
    mouseDrop.style.top = e.clientY - left + 'px';
    mouseDrop.style.left = e.clientX - top + 'px';
  }
});

export function createDiv() {
  const newDiv = document.createElement('div');
  const minSize = 12;
  const maxSize = 70;
  const maxColor = 0xffffff;

  newDiv.className = 'draggable-div';
  newDiv.style.background = '#' + randomInteger(0, maxColor).toString(16);
  newDiv.style.height = randomInteger(minSize, maxSize) + 'px';
  newDiv.style.top = randomInteger(0, window.innerHeight) + 'px';
  newDiv.style.width = randomInteger(minSize, maxSize) + 'px';
  newDiv.style.left = randomInteger(0, window.innerWidth) + 'px';

  newDiv.addEventListener('mousedown', (e) => {
    mouseDrop = newDiv;
    top = e.offsetX;
    left = e.offsetY;
  });
  newDiv.addEventListener('mouseup', () => (mouseDrop = false));

  return newDiv;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
