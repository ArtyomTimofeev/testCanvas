const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;

const scaleX = 50;
const scaleY = 50;

const xAxis = Math.round(canvasWidth / scaleX / canvasWidth) * scaleX;
const yAxis = Math.round(canvasHeight / scaleY / canvasHeight) * scaleY;

ctx.font = '15px Arial';
ctx.textAlign = 'left';
ctx.textBaseline = 'top';

// Рисуем сетку ===============================================

ctx.beginPath();
ctx.strokeStyle = 'lightgrey';

for (let i = 0; i <= canvasWidth; i = i + scaleX) {
  ctx.moveTo(i, 0);
  ctx.lineTo(i, canvasHeight);
  ctx.fillText((i - xAxis) / scaleX, i - 15, yAxis + 5); //добавляем цифры по Х
}

for (let i = 0; i <= canvasHeight; i = i + scaleY) {
  ctx.moveTo(0, i);
  ctx.lineTo(canvasWidth, i);
  ctx.fillText((yAxis + i) / scaleY, xAxis + 5, i - 15); //добавляем цифры по Y
}
ctx.stroke();
ctx.closePath();

// Рисуем главные оси =============================================

ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.font = '25px Arial';

ctx.moveTo(xAxis, 0);
ctx.lineTo(xAxis, canvasHeight);
ctx.fillText('(y)', xAxis + 30, canvasHeight - 30);

ctx.moveTo(0, yAxis);
ctx.lineTo(canvasWidth, yAxis);
ctx.fillText('(x)', canvasWidth - 40, yAxis + 20);

ctx.stroke();
ctx.closePath();

// Рисуем точки ==============================================================

ctx.beginPath();
ctx.fillStyle = 'green';
let arr = [];
let formPoints = document.querySelector('.form-points');
formPoints.addEventListener('submit', (e) => {
  e.preventDefault();
  let numberOfPoints = document.querySelector('.input-number').value;

  for (let i = 0; i < numberOfPoints; i++) {
    let x = Math.ceil(Math.random() * canvasWidth);
    let y = Math.ceil(Math.random() * canvasHeight);

    arr.push({
      x: x,
      y: y,
    });
    ctx.fillRect(x, y, 3, 3);
    ctx.stroke();
  }
});
ctx.closePath();

// Рисуем прямоугольник ================================================================

ctx.beginPath();
ctx.strokeStyle = 'red';

let formRectangle = document.querySelector('.form-rectangle');
formRectangle.addEventListener('submit', (e) => {
  e.preventDefault();

  let rectX1 = document.querySelector('.input-coord-x1').value;
  let rectY1 = document.querySelector('.input-coord-y1').value;
  let rectX2 = document.querySelector('.input-coord-x2').value;
  let rectY2 = document.querySelector('.input-coord-y2').value;
  let xSize = rectX2 - rectX1;
  let ySize = rectY2 - rectY1;

  rectX1 *= scaleX;
  rectY1 *= scaleY;
  rectX2 *= scaleX;
  rectY2 *= scaleY;
  xSize *= scaleX;
  ySize *= scaleY;

  ctx.strokeRect(rectX1, rectY1, xSize, ySize);
  ctx.stroke();

  // Считаем точки в прямоугольнике ====================================================================

  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].x >= rectX1 &&
      arr[i].x <= rectX2 &&
      arr[i].y >= rectY1 &&
      arr[i].y <= rectY2
    ) {
      counter++;
    }
  }
  let message = document.querySelector('.message-header');

  message.textContent = `Количество точек внутри прямоугольника: ${counter}`;
});
