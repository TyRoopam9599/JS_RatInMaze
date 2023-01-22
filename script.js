let maze = document.getElementById("maze-container");
let levelSelect = document.getElementById("levelSelect");

let up = false;
let down = false;
let left = false;
let right = false;

document.addEventListener("keydown", downKey);
document.addEventListener("keyup", upKey);

function upKey(e){
    e = e||window.event;
    if(e.keyCode == '38'){
        up = false ;
    }
    else if(e.keyCode == '40'){
        down = false ;
    }
    else if(e.keyCode == '37'){
        left = false ;
    }
    else if(e.keyCode == '39'){
        right = false ;
    }
}
function downKey(e) {
    e = e||window.event;
    if(e.keyCode == '38'){
        up = true ;
        ratmove();
    }
    else if(e.keyCode == '40'){
        down = true ;
        ratmove();
    }
    else if(e.keyCode == '37'){
        left = true ;
        ratmove();
    }
    else if(e.keyCode == '39'){
        right = true ;
        ratmove();
    }
}


let level1 = [
    [1,0,1,0],
    [1,1,1,1],
    [1,0,1,0],
    [1,0,1,1]
]

let level2 = [
    [1,0,0,1,0,1,0],
    [1,1,0,1,1,1,1],
    [0,1,1,1,0,1,0],
    [0,0,0,1,0,1,1],
    [1,1,1,1,0,0,1],
    [0,1,0,1,1,1,0],
    [1,1,1,1,0,1,1]
]

let level3 = [
    [1,0,0,1,0,1,0,1,0,0,1,0,1,0],
    [1,1,0,1,1,1,1,1,0,0,1,0,1,0],
    [0,1,1,1,0,1,0,1,1,1,1,1,0,1],
    [0,0,0,1,0,1,1,1,1,1,1,0,0,1],
    [1,1,1,1,0,0,1,1,1,1,1,0,0,1],
    [0,1,1,1,0,1,0,1,0,0,1,0,1,0],
    [1,1,1,1,0,0,1,0,1,1,1,0,0,1],
    [1,1,0,1,1,1,1,1,0,1,1,1,0,1],
    [0,1,1,1,0,1,1,1,1,1,0,0,1,0],
    [0,0,0,1,0,1,1,1,0,0,1,0,1,0],
    [1,0,1,0,1,0,1,1,1,1,1,0,0,1],
    [0,1,1,1,0,1,0,1,0,0,1,0,1,0],
    [1,1,0,1,0,1,0,0,1,1,1,1,1,1],
    [1,0,1,0,1,0,1,1,1,0,1,0,1,1],
]

let mazeArray = level1;

var place = {
    rat:{
        x:0,
        y:0
    },
    food:{
        x:mazeArray.length -1,
        y:mazeArray.length -1
    }
}

levelSelect.addEventListener("change", function() {
    let level = levelSelect.value ;
    if(level == 1 ){
        mazeArray = level1
    }
    if(level == 2){
        mazeArray = level2
    }
    if(level == 3){
        mazeArray = level3 ;
    }
    maze.innerHTML = '<img src="./Images/rat.png" id="rat" alt="Rat" width="50px" height="50px"/><img src="./Images/food.png" id="food" alt="Cheese" width="50px" height="50px"/>'
    createMaze();
})

function createMaze() {
   
    for(let i=0; i<mazeArray.length; i++){
        let row = document.createElement("div");
        row.classList.add("row") ;

        for(let j=0;j<mazeArray[i].length ;j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if(mazeArray[i][j] == 0){
                cell.classList.add("wall") ;
            }
            row.appendChild(cell); 

            if(i==0 && j==0){
                mazeArray[i][j] = 2; 
            }
        }
        maze.appendChild(row)
    }
    resetPosition();
    getRatPosition();
}
function resetPosition(){
    place = {
        rat:{
            x:0,
            y:0
        },
        food:{
            x:mazeArray.length -1,
            y:mazeArray.length -1
        }
    }
}
function getRatPosition(){
    for(let i=0;i<mazeArray.length; i++){
        for(let j=0;j<mazeArray[i].length; j++){
            if(mazeArray[i][j]==2){
                place.rat.x = i;
                place.rat.y =j;
            }
            if(mazeArray[i][j]==3){
                place.food.x = i;
                place.food.y = j;
            }
        }
    }
    return place ;
}


function ratmove() {
    let rat = document.getElementById("rat");
    let food = document.getElementById("food");
    let ratLeft = rat.offsetLeft ;
    let ratTop = rat.offsetTop;
    let ratRight = ratLeft + rat.offsetWidth;
    let ratBottom = ratTop + rat.offsetHeight;

    let Position = getRatPosition() ;
    let ratPosition = Position.rat ;
    let foodPosition = Position.food ; 

    let mazeTop = maze.offsetTop;
    let mazeLeft = maze.offsetLeft;
    let mazeWidth = maze.offsetWidth ;
    let mazeHeight = maze.offsetHeight;

    //Rat move in Up
    if(up && ratTop + mazeTop>mazeTop && mazeArray[ratPosition.x - 1][ratPosition.y]!=0){
        ratTop -= 50;
        rat.style.top = ratTop + "px" ;

        mazeArray[ratPosition.x ][ratPosition.y] = 1;
        place.rat.x -= 1;
        mazeArray[ratPosition.x][ratPosition.y] = 2;
        
    }

    //Rat move in Down
    if(down && ratBottom+14<mazeHeight && mazeArray[ratPosition.x +1][ratPosition.y]){
        ratTop += 50;
        rat.style.top = ratTop + "px" ;

        mazeArray[ratPosition.x ][ratPosition.y] = 1;
        place.rat.x += 1;
        mazeArray[ratPosition.x][ratPosition.y] = 2;
    }

    //Rat move in Left
    if(left && ratLeft + mazeLeft> mazeLeft && mazeArray[ratPosition.x ][ratPosition.y - 1]){
        ratLeft -= 50;
        rat.style.left = ratLeft + "px" ;

        mazeArray[ratPosition.x ][ratPosition.y] = 1;
        place.rat.y -= 1; 
        mazeArray[ratPosition.x][ratPosition.y] = 2;
    }

    //Rat move in Right
    if(right && ratRight+14 < mazeWidth && mazeArray[ratPosition.x ][ratPosition.y + 1]){
        ratLeft += 50 ;
        rat.style.left = ratLeft + "px" ;

        mazeArray[ratPosition.x ][ratPosition.y] = 1;
        place.rat.y += 1; 
        mazeArray[ratPosition.x][ratPosition.y] = 2;
    }

    // Checking for Win
    if(ratPosition.x==foodPosition.x && ratPosition.y == foodPosition.y){
        setTimeout(function() {
            alert("You Won!!! \n Try next level.");
        },100)       
    }
}