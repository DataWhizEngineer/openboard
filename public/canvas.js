function initializeCanvas(Socket) {
    // Your canvas.js code here, using the Socket parameter

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilcolor = document.querySelectorAll('.pencil-color');
let pencilwidthEle = document.querySelector('.pencil-width');
let eraserwidthEle = document.querySelector('.eraser-width');
let download = document.querySelector('.download');
 eraser = document.querySelector('.eraser');
let undo = document.querySelector('.undo');
let redo = document.querySelector('.redo');

let pencolor = 'red';
let erasercolor = 'white';
let penwidth = pencilwidthEle.value;
let eraserwidth = eraserwidthEle.value;

let undoredoTracker = [];
let track = 0;


let tool = canvas.getContext('2d');

tool.strokeStyle = pencolor;
tool.lineWidth = penwidth;

let mousedown = false;

canvas.addEventListener('mousedown', (e) => {
    mousedown = true;
    // beginpath({
    //     x : e.clientX,
    //     y : e.clientY
    // })
    let data = {
        x :e.clientX,
        y :e.clientY
    }
    Socket.emit('beginpath' ,(data));
})

canvas.addEventListener('mousemove' ,(e) =>{
    if(mousedown) {
    let data = {
            x : e.clientX,
            y : e.clientY
        }
        Socket.emit('drawstroke' , data);
    }
})
canvas.addEventListener('mouseup' ,(e) => {
    mousedown = false;

    let url = canvas.toDataURL();
    undoredoTracker.push(url);
    track = undoredoTracker.length-1;
})

function beginpath(strokeobj){
     
    tool.beginPath();
    tool.moveTo(strokeobj.x ,strokeobj.y);
}

function drawstroke(strokeobj){
  
        tool.lineTo(strokeobj.x ,strokeobj.y);
        tool.stroke();
}

pencilcolor.forEach((colorEle) => {
    colorEle.addEventListener('click',(e) => {
        let color = colorEle.classList[0];
        pencolor = color;
        tool.strokeStyle = pencolor;
    })
})

pencilwidthEle.addEventListener('change', (e) => {
    penwidth = pencilwidthEle.value;
    tool.lineWidth = penwidth;
})

eraserwidthEle.addEventListener('change' ,(e) =>
{
    eraserwidth = eraserwidthEle.value;
    tool.lineWidth = eraserwidth;
})

eraser.addEventListener('click' ,(e) =>
{
    if(eraserFlag){
        tool.strokeStyle =erasercolor;
        tool.lineWidth =eraserwidth;
    } else {
        tool.strokeStyle = pencolor;
        tool.lineWidth = penwidth;
    }
})

download.addEventListener('click',(e) =>
{

    let url = canvas.toDataURL();

    let a = document.createElement('a');
    a.href =url;
    a.download = "board.jpg";
    a.click();
})

undo.addEventListener('click' ,(e) => {
    if( track > 0 ) track--;

    let data = {
        trackvalue : track,
        undoredoTracker
    }
    //undoredocanvas(trackobj);
    Socket.emit('redoundo',data);
})

redo.addEventListener('click' ,(e) => {
    if(track < undoredoTracker.length-1) track++ ;

    let data = {
        trackvalue : track,
        undoredoTracker
    }
//undoredocanvas(trackobj);
    Socket.emit('redoundo',data)
})

function undoredocanvas (trackobj) {
     
    track = trackobj.trackvalue;
    undoredoTracker = trackobj.undoredoTracker;

    let url = undoredoTracker[track];
    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img ,0 ,0 ,canvas.width ,canvas.height);
    }
}



Socket.on('beginpath' ,(data) => {

    beginpath(data);
})

Socket.on('drawstroke' ,(data) => {

    drawstroke(data);
})

Socket.on('redoundo',(data) => {
    undoredocanvas(data);
})





}

 