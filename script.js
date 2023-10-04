let pencil = document.getElementById('pencil');
let pencilTool = document.getElementsByClassName('pencil-tool')[0];
let eraser = document.getElementById('eraser');
let eraserTool = document.getElementsByClassName('eraser-tool')[0];
let sticky = document.getElementById('sticky-note')

let isPencilOpen = false;
let isEraserOpen = false

pencil.addEventListener('click', () => {
    isPencilOpen = !isPencilOpen;
    if (isPencilOpen) {
        pencilTool.style.display = 'flex';
        eraserTool.style.display = 'none';
        isEraserOpen = false;
    }
    else {
        pencilTool.style.display = 'none';
    }
})

eraser.addEventListener('click', () => {
    isEraserOpen = !isEraserOpen;
    if (isEraserOpen) {
        eraserTool.style.display = 'inline-block';
        pencilTool.style.display = 'none';
        isPencilOpen = false;
    }
    else {
        eraserTool.style.display = 'none';
    }
})

sticky.addEventListener('click', () => {
    const stickyElement = `<div class="header-cont">

            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="notes-cont">
            <textarea></textarea>
        </div>`;
    const stickyCont = document.createElement('div');
    stickyCont.setAttribute('class', 'sticky-cont');
    stickyCont.innerHTML = stickyElement;
    document.body.appendChild(stickyCont);
    let minimize = stickyCont.querySelector('.minimize');
    let remove = stickyCont.querySelector('.remove');
    remove.addEventListener('click', () => {
        stickyCont.remove();
    })
    minimize.addEventListener('click', () => {
        console.log('testing');
        let notesCont = stickyCont.querySelector('.notes-cont');
        if (notesCont.style.display === 'none') notesCont.style.display = 'block';
        else notesCont.style.display = 'none';
    })



    var offset = [0, 0];
    var divOverlay = document.getElementsByClassName('sticky-cont')[0];
    var isDown = false;
    divOverlay.addEventListener('mousedown', function (e) {
        isDown = true;
        offset = [
            divOverlay.offsetLeft - e.clientX,
            divOverlay.offsetTop - e.clientY
        ];
    }, true)
    document.addEventListener('mouseup', function () {
        isDown = false;
    }, true)

    document.addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (isDown) {
            divOverlay.style.left = (e.clientX + offset[0]) + 'px';
            divOverlay.style.top = (e.clientY + offset[1]) + 'px';
        }
    }, true)
});