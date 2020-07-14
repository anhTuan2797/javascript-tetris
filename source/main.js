// main function:
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 14;

    const oBlock = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];
    const iBlock = [
        [1, width + 1, width * 2 + 1],
        [0, 1, 2],
        [1, width + 1, width * 2 + 1],
        [0, 1, 2]
    ];
    const lBlock = [
        [0, width, 2 * width, 2 * width + 1],
        [width, width + 1, width + 2, 2],
        [1, 2, width + 2, 2 * width + 2],
        [0, 1, 2, width]
    ];
    const zBlock = [
        [0, 1, width + 1, width + 2],
        [1, width, width + 1, width * 2],
        [0, 1, width + 1, width + 2],
        [1, width, width + 1, width * 2]
    ];
    const tBlock = [
        [0, 1, 2, width + 1],
        [0, width, width * 2, width + 1],
        [width, width + 1, width + 2, 1],
        [2, width + 2, width * 2 + 2, width + 1]
    ];

    const allBlock = [oBlock, iBlock, lBlock, zBlock, tBlock];

    let currentPosition = 6;
    let randomBlockIndex;
    let randomBlockPosition;
    let currentBlock;
    let status = 'stopped';
    let intervalId = 0;
    let button = document.getElementById('StartPauseButton');
    button.addEventListener('click', function () {
        if (status == 'stopped') {
            status = 'running';
            button.style.backgroundColor = '#ff3300';
            button.innerText = 'pause';
            makeARandomBlock();
            draw();
            intervalId = setInterval(() => {
                if (checkFloor() || checkLandedBlock()) {
                    freeze();
                } else {
                    moveDown();
                }
            }, 1000);
        }else if(status == 'running'){
            status = 'paused';
            button.style.backgroundColor = '#99ff66';
            button.innerText = 'start';
            clearInterval(intervalId);
        } else if(status == 'paused'){
            status = 'running';
            button.style.backgroundColor = '#ff3300';
            button.innerText = 'pause';
            intervalId = setInterval(() => {
                if (checkFloor() || checkLandedBlock()) {
                    freeze();
                } else {
                    moveDown();
                }
            }, 1000);
        }
    })
    // draw a block function
    function draw() {
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.add('block');
        });
    }
    // undraw a block function
    function unDraw() {
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.remove('block');
        });
    }

    // check for landed block function
    function checkLandedBlock() {
        if (currentBlock.some(index => squares[currentPosition + index + width].classList.contains('landed-block'))) {
            return true;
        } else {
            return false;
        }
    }

    // check for floor function
    function checkFloor() {
        if (currentBlock.some(index => squares[currentPosition + index].classList.contains('floor'))) {
            return true;
        } else {
            return false;
        }
    }

    // move a block down function
    function moveDown() {
        unDraw();
        currentPosition += width;
        draw();
    }
    // make a random block function
    function makeARandomBlock() {
        currentPosition = 6;
        randomBlockIndex = Math.floor(Math.random() * 5);
        randomBlockPosition = Math.floor(Math.random() * 4);
        currentBlock = allBlock[randomBlockIndex][randomBlockPosition];
    }
    // freeze a block function 
    function freeze() {
        unDraw();
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.add('landed-block');
        });
        makeARandomBlock();
    }
});