let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset');
let turnText = document.querySelector('#turn');

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {

        if (turnO) {
            box.innerText = 'O';
            turnO = false;
            turnText.innerText = "Turn: X";
        } else {
            box.innerText = 'X';
            turnO = true;
            turnText.innerText = "Turn: O";
        }

        box.disabled = true;

        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== '' && pos1 === pos2 && pos2 === pos3) {
            highlightWinner(pattern);
            turnText.innerText = pos1 + " Wins 🎉";
            disableAllBoxes();
            return;
        }
    }

    checkDraw();
};

const highlightWinner = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add('win');
    });
};

const disableAllBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const checkDraw = () => {
    let allFilled = true;

    boxes.forEach(box => {
        if (box.innerText === '') {
            allFilled = false;
        }
    });

    if (allFilled) {
        turnText.innerText = "It's a Draw 😐";
    }
};

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
        box.classList.remove('win');
    });

    turnO = true;
    turnText.innerText = "Turn: O";
};

resetbtn.addEventListener('click', resetGame);