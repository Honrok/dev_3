let inp = document.querySelector('input');;
let output = document.querySelector('.output');
let btn = document.querySelector('button');
let body = document.querySelector('body');
let arr = [];
let spans;
let leftV;
let topV;
let lastPosX;
let lastPosY;
btn.onclick = () => {
    arr = Array.from(inp.value);
    for (let i = 0; i < arr.length; i++) {
        output.innerHTML += `<span class="st${i}">${arr[i]}</span>`;
    }
    spans = document.querySelectorAll('span');
    inp.value = '';
    checkTheClick();
}
function checkTheClick() {
    let count = 0;
    for (let j = 0; j < spans.length; j++) {

        spans[j].onclick = (event) => {
            lastPosX = leftV;
            lastPosY = topV;
            for (let i = 0; i < spans.length; i++) {
                if (spans[i].getAttribute('id') == 'move') {
                    count++;
                }
            }
            if (count > 0) {
                leftV = event.pageX + 'px';
                topV = event.pageY + 'px';
                spans[j].style.position = 'absolute';
                spans[j].style.left = lastPosX;
                spans[j].style.top = lastPosY;
                spans[j].removeAttribute('id');
                checkTheClick();

            } else {
                leftV = event.pageX + 'px';
                topV = event.pageY + 'px';
                mouseMove(spans[j]);
            }
        }
    }
    function mouseMove(attribute) {
        console.log(attribute);
        let count = attribute.getAttribute('class');
        let spanWithStyle = document.querySelector(`.${count}`);
        spanWithStyle.setAttribute('id', 'move');
        lastPosX = leftV;
        lastPosY = topV;
        body.onmousemove = (event) => {
            if (spanWithStyle.getAttribute('id') == 'move') {
                spanWithStyle.style.position = 'absolute';
                spanWithStyle.style.top = event.pageY + 'px';
                spanWithStyle.style.left = event.pageX + 'px';
            }
        }
        body.onclick = bodyClick;
        function bodyClick(event) {
            if (event.pageX + 'px' == spanWithStyle.style.left && (spanWithStyle.getAttribute('id') == 'move')) {
                console.log(lastPosX, lastPosY)
                spanWithStyle.style.position = 'absolute';
                spanWithStyle.style.top = event.pageY + 'px';
                spanWithStyle.style.left = event.pageX + 'px';
                spanWithStyle.removeAttribute('id');
                lastPosX = leftV;
                lastPosY = topV;
            }
        }
    }

}
