// main function:
document.addEventListener('DOMContentLoaded', () => {
    let grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const nextSquare = Array.from(document.querySelectorAll('.next-block div'));
    const width = 14;
    let score =0;
    const oBlock = [
        [0, 1, width, width + 1]
    ];
    const iBlock = [
        [1 ,width + 1, width*2+1],
        [0,1,2]
    ];
    const lBlock = [
        [0, width, 2 * width, 2 * width + 1],
        [width, width + 1, width + 2, 2],
        [1, 2, width + 2, 2 * width + 2],
        [0, 1, 2, width]
    ];
    const zBlock = [
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
    let nextBlockIndex;
    let nextBlockRotation;
    let nextBlockType;
    let nextBlock;
    let currentBlockType;
    let currentBlock;
    let status = 'stopped';
    let intervalId = 0;
    let button = document.getElementById('StartPauseButton');
    button.addEventListener('click', function () {
        if (status == 'stopped') {
            clearGrid();
            document.querySelector('#score').innerText= score;
            status = 'running';
            button.style.backgroundColor = '#ff3300';
            button.innerText = 'pause';
            makeARandomBlock();
            makeNextBlock();
            draw();
            drawNextBlock();
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

    // draw next block function
    function drawNextBlock(){
        nextBlock.forEach(index => {
            if(index < 3){
                nextSquare[index].classList.add('block');
            }
            else if((index >= width) && (index < 2*width)){
                nextSquare[index - width+3].classList.add('block');
            }
            else {
                nextSquare[index - (width -3)*2].classList.add('block');
            }
        });
    }
    // undraw next block function
    function unDrawNextBlock(){
        nextBlock.forEach(index => {
            if(index < 3){
                nextSquare[index].classList.remove('block');
            }
            else if((index >= width) && (index < 2*width)){
                nextSquare[index - width+3].classList.remove('block');
            }
            else {
                nextSquare[index - (width -3)*2].classList.remove('block');
            }
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
        blockIndex = Math.floor(Math.random() * 5);
        currentBlockType = allBlock[blockIndex];
        blockRotation = Math.floor(Math.random() * currentBlockType.length);
        currentBlock = currentBlockType[blockRotation];
    }
    // make next block
    function makeNextBlock(){
        nextBlockIndex = Math.floor(Math.random() * 5);
        nextBlockType = allBlock[nextBlockIndex];
        nextBlockRotation = Math.floor(Math.random() * nextBlockType.length); 
        nextBlock = nextBlockType[nextBlockRotation];
    }
    // make new block
    function makeNewBlock(){
        currentPosition = 6;
        blockIndex = nextBlockIndex;
        blockRotation = nextBlockRotation;
        currentBlockType = allBlock[blockIndex];
        currentBlock = currentBlockType[blockRotation];
    }
    // freeze a block function 
    function freeze() {
        unDraw();
        unDrawNextBlock();
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.add('landed-block');
            squares[currentPosition + index].style.backgroundColor = 'blue';
        });
        addScore();
        makeNewBlock();
        draw();
        if(!isGameOver()){
            makeNextBlock();
            drawNextBlock();
        }
        else{
            document.querySelector('#score').innerText= "game over";
            clearInterval(intervalId);
            status = 'stopped';
            button.style.backgroundColor = '#99ff66';
            button.innerText = 'start';
            score =0;
        }
    }
    // rotate block function
    function rotate(){
        unDraw();
        blockRotation++;
        if(blockRotation === currentBlockType.length){
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
    // add score function
    function addScore(){
        for(let i =0;i<196;i+=width){
            row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9,i+10,i+11,i+12,i+13];
            if(row.every(index =>{
                return squares[index].classList.contains('landed-block');
            })){
                score++;
                document.querySelector('#score').innerText= score;
                row.forEach(index =>{
                    squares[index].classList.remove('landed-block');
                    squares[index].classList.remove('block');
                    squares[index].style.backgroundColor = '';
                });
                removedRow = squares.splice(i,width);
                squares = removedRow.concat(squares);
                squares.forEach(div => {
                    grid.appendChild(div);
                });
            }
        }
    }
    //check gameover event function
    function isGameOver(){
        return !(currentBlock.every(index =>{
            return (!squares[currentPosition + index].classList.contains('landed-block'));
        }));
    }
    // clear the grid function 
    function clearGrid(){
        for(let i =0; i<196;i++){
            squares[i].classList.remove('landed-block');
            squares[i].classList.remove('block');
            squares[i].style.backgroundColor = '';
        }
    }
});