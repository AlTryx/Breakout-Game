const grid = document.querySelector('.grid') //I'm looking for the grid class (kazvash mu da tursi tova)
const blockWidth = 100
const blockHeight = 20
const userStart = [230, 10]
const boardWidth = 560
const ballStart = [270, 40]
let ballCurrentPosition = ballStart
let timerId
const ballDiameter = 20
const boardHeight = 300
const scoreDisplay = document.querySelector('#score')
let score = 0

let xDirection = 2
let yDirection = 2

let currentPosition = userStart

//create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]// 10 , 270
        this.bottomRight = [(xAxis + blockWidth), yAxis] // 110, 270
        this.topLeft = [xAxis, (yAxis + blockHeight)] // 10, 290
        this.topRight = [(xAxis + blockWidth), (yAxis + blockHeight)] //110, 290
    }
}

// draw all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]


//draw my block
function addBlocks() {
 
   for (let i =0; i <blocks.length;i++) {
    const block = document.createElement('div')
    block.classList.add('block')

    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'

    grid.appendChild(block)
   }
}

addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)



//draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}
 

// draw the ball

function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px' // first value + the string of 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}



//move user
function moveUser(e) {
    switch(e.key) {
        case'ArrowLeft':
        if (currentPosition[0] > 0) {
            currentPosition[0] -= 10
            drawUser()
            
        }break;

        case 'ArrowRight':
            if(currentPosition<boardWidth -blockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            
    }
}

document.addEventListener('keydown', moveUser)



// add ball

const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball) // To but the ball in the grid (in the doc)
drawBall()


// move ball

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 20)


//check for collisions

function checkForCollisions() {
 //check for block collisions
for (let i = 0; i<blocks.length;i++) { //mapping
    if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && // x axis
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) // y axis
    ) // we know this way that the ball is "in" a block
    {
        const allBlocks = Array.from(document.querySelectorAll('.block'))
        allBlocks[i].classList.remove('block')
        blocks.splice(i, 1)
        changeDirection()
        score++
        scoreDisplay.textContent = score

        // check for win

        if(blocks.length === 0) {
            scoreDisplay.textContent = 'YOU WIN'
            clearInterval(timerId)
            document.removeEventListener('keydown', moveUser)
        }
    }
}

//check for wall collisions
 if (
     ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
     ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
     ballCurrentPosition[0] <= 0
    ) {
     changeDirection()
 } // if ballCurrentPosition is larger => it's off the grid


    //check for user collisions
    if(
       ( ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) && // x axis
    (ballCurrentPosition[1]> currentPosition[1] && ballCurrentPosition[1] <currentPosition[1] + blockHeight) // y axis
    )
     {
        changeDirection()
     }


    //check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.textContent = "You lose"
        document.removeEventListener('keydown', moveUser)
    }


}



function changeDirection() {
 if(xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
 }
 if(xDirection === -2 && yDirection === -2) {
    xDirection = -2
    return
 }
}
if(xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
}
if(xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
}