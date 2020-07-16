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
    let blockIndex;
    let blockRotation;
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
        } else if (status == 'running') {
            status = 'paused';
            button.style.backgroundColor = '#99ff66';
            button.innerText = 'start';
            clearInterval(intervalId);
        } else if (status == 'paused') {
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
    document.addEventListener('keydown', function (e) {
        if (e.keyCode == 38) {
            if (status == 'running') {
                rotate();
            }
        }
        if (e.keyCode == 40) {
            if (status == 'running'){
                if (checkFloor() || checkLandedBlock()) {
                    freeze();
                } else {
                    moveDown();
                }
            }
        }
        if (e.keyCode == 37) {
            if (status == 'running'){
                moveLeft();
        }
    }
        if(e.keyCode == 39) {
            if (status == 'running'){
                console.log('move right');
                moveRight();
        }
    }
    });
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

    // check for landed block function use for fall down block
    function checkLandedBlock() {
        if (currentBlock.some(index => squares[currentPosition + index + width].classList.contains('landed-block'))) {
            return true;
        } else {
            return false;
        }
    }
    // check for landed block function use for moving block
    function checkLandedBlockForMove(nextPosition){
        if (currentBlock.some(index => squares[currentPosition + index + nextPosition].classList.contains('landed-block'))) {
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
    // check if the block is at far right function 
    function isAtRight(){
        return currentBlock.some(index => (currentPosition + index +1)% width === 0)
    }

    // check if the block is at far left function 
    function isAtLeft(){
        return currentBlock.some(index => (currentPosition + index )% width === 0)
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
        blockIndex = Math.floor(Math.random() * 5);
        blockRotation = Math.floor(Math.random() * 4);
        currentBlock = allBlock[blockIndex][blockRotation];
    }
    // freeze a block function 
    function freeze() {
        unDraw();
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.add('landed-block');
        });
        makeARandomBlock();
    }
    // rotate block function
    function rotate(){
        unDraw();
        blockRotation++;
        if(blockRotation === currentBlock.length){
            blockRotation =0;
        }
        currentBlock = allBlock[blockIndex][blockRotation];
        checkRotatedPosition();
        draw();
    }
    // check rotated position
    function checkRotatedPosition(p){
        p = p || currentPosition;
        if((p+1) % width < 5){
            if(isAtRight()){
                currentPosition++;
                checkRotatedPosition(p);
            }
        }
        else if(p % width > 6){
            if(isAtLeft()){
                currentPosition--;
                checkRotatedPosition(p);
            }
        }
    }
    // move left function 
    function moveLeft() {
        if(!isAtLeft() && !checkLandedBlockForMove(-1)){
            unDraw();
            currentPosition--;
            draw();
        }
    }
    // move right function 
    function moveRight(){
            if(!isAtRight() && !checkLandedBlockForMove(1)){
                unDraw();
                currentPosition++;
                draw();
            }
    }
});