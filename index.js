let numberOfFaces = 5;

const leftSide = document.getElementById('leftSide');
let rightSide = document.getElementById('rightSide');
const container = document.getElementById('container');



function generateFaces() {
    for (let i = 0; i < numberOfFaces; i++) {
        const newFace = document.createElement("img");
        newFace.src = "./images/smile.png";

        const randomTop = Math.floor(Math.random() * 400) + 1;
        const randomLeft = Math.floor(Math.random() * 400) + 1;

        newFace.style.top = randomTop + "px";
        newFace.style.left = randomLeft + "px";

        leftSide.appendChild(newFace);
    } 
    let leftSideImages = leftSide.cloneNode(true);
    leftSideImages.removeChild(leftSideImages.lastChild);
    rightSide.appendChild(leftSideImages);
   
    leftSide.lastChild.addEventListener('click', nextLevel);

    container.addEventListener('click', gameOver);

}

function nextLevel(event) {
    event.stopPropagation();
    while(leftSide.firstChild){
        leftSide.removeChild(leftSide.firstChild);
    }
    while(rightSide.firstChild){
        rightSide.removeChild(rightSide.firstChild);
    }
    numberOfFaces += 5;
    generateFaces();
}

function gameOver() {
    const allFaces = document.querySelectorAll('#leftSide img');

    allFaces.forEach(face => {
        face.src = "./images/sad.png";
        face.style.width = "80px";
        face.style.height = "80px";
    });

    leftSide.lastChild.removeEventListener('click', nextLevel);
    document.removeEventListener('click', gameOver);
    
    const gameOverText = document.createElement("h1");
    gameOverText.textContent = "Game Over";
    gameOverText.classList.add('gameOver');
  
    container.appendChild(gameOverText);
}


const resetBtn = document.querySelector('.resetBtn');
resetBtn.addEventListener('click', resetGame);

function resetGame() {
    // Remove sad face images
    const allFaces = document.querySelectorAll('#leftSide img');
    allFaces.forEach(face => {
        face.remove();
    });

    // Reset variables
    numberOfFaces = 5;

    // Remove "Game Over" text
    const gameOverText = document.querySelector('.gameOver');
    if (gameOverText) {
        gameOverText.remove();
    }

    // Generate new faces
    generateFaces();
   
   
}

window.addEventListener('load', generateFaces);

// function gameOver() {
//     alert('Game Over!');
//     document.body.removeEventListener('click', gameOver)
//     theLeftSide.lastChild.removeEventListener('click', nextLevel)

//     const resetBtn = document.createElement('button');
//     resetBtn.addEventListener('click', resetGame);
//     resetBtn.textContent = 'Reset';
//     document.querySelector('p').appendChild(resetBtn);
// }

// function resetGame(event) {
//     numberOfFaces = 0;
//     document.querySelector('button').remove();
//     nextLevel(event);
// }