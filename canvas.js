let canvas = document.getElementsByTagName('canvas')[0];
let penWidth = document.getElementsByClassName('pencil-width')[0];
let eraserWidth = document.getElementsByClassName('eraser-width')[0];
let red = document.getElementsByClassName('red')[0];
let blue = document.getElementsByClassName('blue')[0];
let black = document.getElementsByClassName('black')[0];

let download = document.getElementById('download')
let upload = document.getElementById('upload')
let undo = document.getElementById('undo')
let redo = document.getElementById('redo')


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let penTool = canvas.getContext('2d');
penTool.strokeStyle = "red";
penTool.lineWidth= 3;

let undoRedoCache = [canvas.toDataURL()];
let currentUrlIndex = 0;

function changeColor(e){
    penTool.strokeStyle = e.srcElement.className
    }
    
    red.addEventListener('click',changeColor);
    blue.addEventListener('click',changeColor);
    black.addEventListener('click',changeColor);
    
    eraser.addEventListener('click',()=>{
        // isEraserOpen = true;
        // isPencilOpen = false;
        penTool.strokeStyle = 'white';
        penTool.lineWidth = eraserWidth.value;
    })
    
    eraserWidth.addEventListener('input',()=>{
        penTool.lineWidth = eraserWidth.value 
    })
    
    pencil.addEventListener('click',()=>{
        //console.log(penColor.value)
        penTool.lineWidth = penWidth.value
    })

let isMouseDown = false;
canvas.addEventListener('mousedown',(e)=>{
    isMouseDown = true;
     penTool.beginPath();
     penTool.moveTo(e.clientX+3 , e.clientY-70);
})
canvas.addEventListener('mousemove',(e)=>{
    //console.log(e.clientX,e.clientY);
    if(isMouseDown){
        penTool.lineTo(e.clientX + 3,e.clientY -70);
        penTool.stroke();
    }
})

canvas.addEventListener('mouseup',(e)=>{
    isMouseDown=false
    // converted my canvas to URL
    let url = canvas.toDataURL();
    undoRedoCache.push(url);
    currentUrlIndex=undoRedoCache.length-1;
})

undo.addEventListener('click', () => {
    if (currentUrlIndex > 0) {
        currentUrlIndex--;
    }
    renderURLonCanvas(undoRedoCache[currentUrlIndex]);
})

redo.addEventListener('click', () => {
    if (currentUrlIndex < undoRedoCache.length - 1) {
        currentUrlIndex++;
    }
    renderURLonCanvas(undoRedoCache[currentUrlIndex]);
})

function renderURLonCanvas(url){
    let img = new Image;
    //console.log(url);
    img.src = url;
    img.onload = () => {
        penTool.clearRect(0, 0, canvas.width, canvas.height);
        penTool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

download.addEventListener('click',()=>{
    const url = canvas.toDataURL();
    let a = document.createElement('a');
    a.href=url;
    a.download="canvas.jpg";
    a.click();
});

upload.addEventListener('click',()=>{
    let inputFile=document.createElement('input');
    inputFile.setAttribute('type','file');
    // it acts as clicked
    inputFile.click();

    inputFile.addEventListener('change',(event)=>{
        let file = inputFile.files[0];
        let url = URL.createObjectURL(file);
        renderURLonCanvas(url);
    })
})

