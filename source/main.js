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
    let randomBlockIndex = Math.floor(Math.random()*5);
    let randomBlockPosition = Math.floor(Math.random()*4);
    console.log(randomBlockIndex);
    console.log(randomBlockPosition);
    let currentBlock = allBlock[randomBlockIndex][randomBlockPosition];
    draw();
    // draw a block function
    function draw() {
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.add('block');
        });
    }
});