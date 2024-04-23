const grid = document.querySelector('.grid') //I'm looking for the grid class (kazvash mu da tursi tova)
const blockWidth = 100
const blockHeight = 20

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
    new Block(10, 270),
    new Block(10, 270),
    new Block(10, 270),
    new Block(10, 270),
    new Block(10, 270),
    new Block(10, 270),
    new Block(10, 270),
    new Block(10, 270),
    new Block(10, 270),
    new Block(10, 270),
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