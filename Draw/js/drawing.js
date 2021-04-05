var isDrawing = false;
var x = 0;
var y = 0;
var penColor = 'black';
var penWidth = 1;
var canvas;
var context;
var colorPicker;
var colorPickerModal;
var colorChangeRed;
var colorChangeGreen;
var colorChangeBlue;
var colorDisplay;

function initialise() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    colorPickerModal = document.getElementById('divColorPickerModal');
    colorPicker = document.getElementById('divColorPicker');
    colorChangeRed = document.getElementById('colorChangeRed');
    colorChangeGreen = document.getElementById('colorChangeGreen');
    colorChangeBlue = document.getElementById('colorChangeBlue');
    colorDisplay = document.getElementById('colorDisplay');
    window.addEventListener("resize", resize);
    colorPickerModal.addEventListener('mousedown', modalClick);  
    canvas.addEventListener('mousedown', mousedown);
    canvas.addEventListener('mousemove', mousemove);
    canvas.addEventListener('mouseup', mouseup);
    canvas.addEventListener('touchstart', touchstart);
    canvas.addEventListener('touchmove', touchmove);
    canvas.addEventListener('touchend', touchend);
    resize();
    clearcanvas();
}

function mousedown(event) {
    x = event.offsetX;
    y = event.offsetY;
    isDrawing = true;
    event.preventDefault();
}

function mousemove(event) {
    if (isDrawing === true) {
        drawLine(context, x, y, event.offsetX, event.offsetY);
        x = event.offsetX;
        y = event.offsetY;
    }
    event.preventDefault();
}

function mouseup(event) {
    if (isDrawing === true) {
        drawLine(context, x, y, event.offsetX, event.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
    event.preventDefault();
}

function touchstart(event) {
    x = event.touches[0].clientX - canvas.offsetLeft;
    y = event.touches[0].clientY - canvas.offsetTop;
    isDrawing = true;
    event.preventDefault();
}

function touchmove(event) {
    if (isDrawing === true) {
        drawLine(context, x, y, event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
        x = event.touches[0].clientX - canvas.offsetLeft;
        y = event.touches[0].clientY - canvas.offsetTop;
    }
    event.preventDefault();
}

function touchend(event) {
    if (isDrawing === true) {
        x = 0;
        y = 0;
        isDrawing = false;
    }
    event.preventDefault();
}

function resize() {
    context.canvas.width = canvas.clientWidth;
    context.canvas.height = canvas.clientHeight;
    clearcanvas();
}

function savecanvas() {
    var image = canvas.toDataURL();
    var tmpLink = document.createElement('a');
    tmpLink.download = 'image.png';
    tmpLink.href = image;
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);  
}

function clearcanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = penColor;
    context.lineWidth = penWidth;
    context.lineCap = "round";
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function changeColor(value) {
    penColor = value;
}

function changeColorSlider() {
    penColor = "rgb(" + colorChangeRed.value + "," + colorChangeGreen.value + "," + colorChangeBlue.value + ")";
    colorDisplay.style.backgroundColor = penColor;
}

function changeThickness(value) {
    penWidth = value;
}

function showColorPicker() {
    changeColorSlider();
    colorPickerModal.style.display = "block";
}

function modalClick(e) {
    if (e.target === colorPickerModal) {
        colorPickerModal.style.display = "none";
    }
}
