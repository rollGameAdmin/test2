var canvas = document.getElementById("game");
canvas.width = 1300; //canvas width: 1500px
canvas.height = 500; //canvs height: 300px

const ballRadius = 35; //radius of Circle
const gameSpeed = 6; //number of pixels graphics are displaced per anim frame
let colors = {
    darkGrey: '#273336',
    orange: '#F33B1B',
    lightGreen: '#00F69F',
    lightBlue: '#2FEAFF',
    purple: '#CD30E8',
    lightOrange: '#FF9933',
    oceanBlue: '#0090FF'
}


//Create graphics object
let graphics = new Graphics(canvas.getContext("2d")); //holds all graphics rendered in canvas

//reference classes.js for the different classes created below

let lineLength = canvas.width;
let beginLineX = 0; 
//Create new Line object
let line = new Line({
    c: canvas.getContext("2d"), 
    beginX: beginLineX - ballRadius*2,
    beginY: canvas.height - 2, 
    endX: beginLineX + lineLength, 
    endY: canvas.height - 2, 
    color: colors.lightGreen, //orange
    width: 4, //thickness
});
let line1 = createArray();
line1.push(line);



//Create new Sprite object for ball
let ball = new Sprite({
    c: canvas.getContext("2d"), 
    spriteWidth: 649, 
    spriteHeight: 217, 
    src: 'img/ball/ball_spritesheet6.png', 
    width: ballRadius * 2, 
    height: ballRadius * 2, 
    centerX: line.beginX + ballRadius, 
    centerY: line.beginY - ballRadius + 2,
    ticksPerFrame: 2,
    numColumns: 6,
    lastRowColumns: 6,
    numRows: 2,
    speed: gameSpeed,
    loop: true,
    reverse: false
});
let ball1 = createArray();
ball1.push(ball);

let spaceship1 = new Sprite({
    c: canvas.getContext("2d"), 
    spriteWidth: 504, 
    spriteHeight: 328, 
    src: 'img/spaceship/spaceship1.png', 
    width: 495/1.5, 
    height: 100/1.5, 
    centerX: line.endX + canvas.width/2, 
    centerY: canvas.height/6,
    ticksPerFrame: 10,
    numColumns: 1,
    lastRowColumns: 1,
    numRows: 3,
    speed: gameSpeed + 3.5,
    loop: true,
    reverse: false
});
let spaceships = createArray();
spaceships.push(spaceship1);

//Circle details
let circleDetails1 = {
    c: canvas.getContext("2d"), 
    centerX: line.beginX + 500, 
    centerY: line.beginY - ballRadius, 
    radius: ballRadius, 
    color: colors.darkGrey, //dark grey
    speed: gameSpeed, 
    stopForward: line.endX,
    stopFall: canvas.height - ballRadius / 2 
}
//not creating circle object for now

let tunnel = new Pic({
    c: canvas.getContext("2d"), 
    src: 'img/tunnel/tunnel5.png', 
    width: ballRadius * 2 * 3.567,
    height: ballRadius * 2 * 1.08,
    centerX: ball.centerX + ballRadius  * 2 * 3.567/2,
    centerY: line.beginY - (ballRadius - 2) * 2 * 1.08/2,
    speed: gameSpeed
});
let tunnelRow = createArray();
tunnelRow.push(tunnel);

//Triangle Details to be passed into Triangle object constructor (refer to classes.js)
let beginX = tunnel.getRightX() + 400;  
let beginY = line.beginY
let width = 40; 
let height = 40;
//Create new Triangle object according to triangleDetails1
let triangle1 = new Triangle({
    c: canvas.getContext("2d"),
    beginX: beginX,
    beginY: beginY,
    topX: beginX + width / 2, 
    topY: beginY - height,
    endX: beginX + width, 
    endY: line.beginY, 
    width: width,
    height: height,
    color: colors.lightGreen,
    strokeColor: colors.oceanBlue,
    strokeWidth: 3,
    speed: gameSpeed,
    stopForward: line.endX,
    stopFall: line.beginY,
    spacing: 0
});
let triangles1 = createArray();
triangles1.push(triangle1);



//Create new Rectangle object according to rectangleDetails1
let rectangle1 = new Rectangle({
    c: canvas.getContext("2d"), 
    width: 90, 
    height: 42,
    centerX: triangle1.endX + 400, 
    centerY: line.beginY - 42 / 2,   
    color: colors.oceanBlue, 
    strokeColor: colors.lightGreen,
    strokeWidth: 3.5,
    speed: gameSpeed, 
    flatSpacing: 150,
    towerSpacing: 30,
    towerHeightDiff: 25,
    stopForward: line.endX,
    stopFall: line.beginY
});

let rectangleRow = createArray();
rectangleRow.push(rectangle1);
let rectangleTrail = [];
// let numRecs = 3;
// let createdRecs = 1;

let deathTrap1 = new Line({
    c: canvas.getContext("2d"), 
    beginX: 0,
    beginY: rectangle1.getBottomY(), 
    endX: 0, 
    endY: rectangle1.getBottomY(), 
    color: colors.oceanBlue,
    width: 5, //thickness
    speed: gameSpeed
});
let deathTraps = createArray();
deathTraps.push(deathTrap1);
let deathTrapTrail = [];



//ExplodedBall Details to be passed into Pic object constructor (refer to classes.js)
let imgWidth = ballRadius * 2; 
let imgHeight = ballRadius * 2; 
let explodingBallDetails = {
    c: canvas.getContext("2d"), 
    src: 'img/explode/exploded_lightblue_ball.png', 
    width: imgWidth,
    height: imgHeight,
    centerX: ball.centerX,
    centerY: ball.centerY 
}
//Create explodedBall image as new Pic object according to explodingBallDetails
let explodedBall = new Pic(explodingBallDetails);
let exploded = createArray();
exploded.push(explodedBall);

width = ballRadius * 2 * 1.78;
height = ballRadius * 2 * .81;
let filledInTrampo = 'img/trampoline/trampo4.png';
let trampo1 = new Pic({
    c: canvas.getContext("2d"), 
    src: 'img/trampoline/trampo5.png', 
    width: width,
    height: height,
    centerX: rectangle1.centerX + 1250,
    centerY: line.beginY - height/2 + 10,
    speed: gameSpeed
});
let trampos = createArray();
trampos.push(trampo1);

//Create new Rectangle object according to rectangleDetails1
width = 3000;
let rectangleWall = new Rectangle({
    c: canvas.getContext("2d"), 
    width: width, 
    height: 300,
    centerX: trampo1.getRightX() + 100 + width/2, 
    centerY: line.beginY - 300 / 2,  
    color: colors.lightGreen, 
    strokeColor: colors.lightGreen,
    speed: gameSpeed, 
    flatSpacing: 150,
    towerSpacing: 30,
    towerHeightDiff: 25,
    stopForward: line.endX,
    stopFall: line.beginY
});
let rectangleWalls = createArray();
rectangleWalls.push(rectangleWall);


width = ballRadius * 3.12 * 1.2;
height = ballRadius * 3.12 * 1.2;
let cannon = new Sprite({
    c: canvas.getContext("2d"), 
    spriteWidth: 822, 
    spriteHeight: 657, 
    src: 'img/cannon/cannon_sprite4.png', 
    width: width, 
    height: height, 
    centerX: rectangleWall.getLeftX() + 2900,
    centerY: rectangleWall.getTopY() - height/2 + 10,
    ticksPerFrame: 2,
    numRows: 4,
    numColumns: 5,
    lastRowColumns: 5,
    speed: gameSpeed,
    loop: false
});
let cannonRow = createArray();
cannonRow.push(cannon);


beginX = cannon.getLeftX() + 20;
beginY = cannon.centerY + 10;
width = 28;
height = 28;
let dart = new Triangle({
    c: canvas.getContext("2d"),
    beginX: beginX,
    beginY: beginY,
    topX: beginX + width, 
    topY: beginY - height/2,
    endX: beginX + width, 
    endY: beginY + height/2, 
    width: width,
    height: height,
    color: colors.lightGreen,
    strokeColor: colors.oceanBlue,
    strokeWidth: 3,
    speed: gameSpeed,
    stopForward: line.endX,
    stopFall: line.beginY,
    spacing: -1
});
let dartsToShoot = createArray();
dartsToShoot.push(dart);
let shotDarts = [];

function duplicateForRow(shape) {
    let duplicate;
    if (shape instanceof Triangle) {
        duplicate = Object.assign(Object.create(Object.getPrototypeOf(shape)),shape);
        if (shape.spacing != -1) {
            duplicate.beginX = shape.endX + shape.spacing;
            duplicate.endX = duplicate.beginX + duplicate.width;
            duplicate.topX = duplicate.beginX + duplicate.width/2;
        }
    } else if (shape instanceof Rectangle || shape instanceof Pic) {
        duplicate = Object.assign(Object.create(Object.getPrototypeOf(shape)),shape);
        duplicate.centerX = shape.centerX + shape.width + shape.flatSpacing;
    } else if (shape instanceof Line) {
        duplicate = Object.assign(Object.create(Object.getPrototypeOf(shape)),shape);
        duplicate.beginX = shape.getRightX() + rectangle1.width;
        duplicate.endX = duplicate.beginX + rectangle1.flatSpacing;
    }
    return duplicate;
}

function duplicateForTower(shape, inverted) {
    if (!inverted) {
        let duplicate;
        if (shape instanceof Rectangle) {
            // duplicate = new Rectangle(rectangleDetails1);
            duplicate = Object.assign(Object.create(Object.getPrototypeOf(shape)),shape);
            duplicate.centerX = shape.centerX + shape.width + shape.towerSpacing;
            duplicate.centerY = shape.centerY - shape.height - shape.towerHeightDiff;
        }
        return duplicate;
    } else {
        let duplicate;
        if (shape instanceof Rectangle) {
            duplicate = Object.assign(Object.create(Object.getPrototypeOf(shape)),shape);
            duplicate.centerX = shape.centerX + shape.width + shape.towerSpacing;
            duplicate.centerY = shape.centerY + shape.height + shape.towerHeightDiff;
        }
        return duplicate;
    }
}

function extendDeathTraps(recs, traps, amount) {
    let lastRec = recs[recs.lastIndex()];
    let lastTrap = traps[traps.lastIndex()];
    for (let i = 0; i < amount; i++) {
        recs.push(duplicateForRow(lastRec));
        traps.push(duplicateForRow(lastTrap));
    }
}



//Creates array of adjacent rectangles
function addToRow(row, amount) {
    let lastIndex = row.lastIndex();
    for (let i = lastIndex; i < amount; i++) {
        let copy = duplicateForRow(row[i]);
        row.push(copy); 
    }  
}
function addToTower(row, amount, inverted) {
    if (!inverted) {
        for (let i = 0; i < amount; i++) {
            let copy = duplicateForTower(row[i], inverted);
            row.push(copy);
        }
    } else {
        for (let i = 2; i < amount - 1; i++) {
            let copy = duplicateForTower(row[i], inverted);
            row.push(copy);
        }
    }
}

function repositionDarts(darts) {
    for (let i = 0; i < darts.length; i++) {
        let dart = darts[i];
        dart.beginX = cannon.getLeftX() + 20;
        dart.beginY = cannon.centerY + 10;  
        dart.topX = dart.beginX + dart.width;
        dart.topY = dart.beginY - dart.height/2;
        dart.endX = dart.beginX + dart.width;
        dart.beginY + dart.height/2;       
    } 
}

function repositionTriangle(triangle, beginX, beginY) {
    if (beginX != -1) {
        triangle.beginX = beginX;
        triangle.topX = triangle.beginX + triangle.width/2;
        triangle.endX = triangle.beginX + triangle.width;
    }
    if (beginY != -1) {
        triangle.beginY = beginY;
        triangle.topY = triangle.beginY - triangle.height;
        triangle.endY = triangle.beginY;
    }
}



//triangle row 1
// addToRow(triangles1, 1);
//---//

//triangle row 2
let lastTriRow = triangles1[triangles1.length - 1];
let triangle2 = duplicateForRow(lastTriRow);
repositionTriangle(triangle2, lastTriRow.endX + 250, -1);
let triangles2 = createArray();
triangles2.push(triangle2);
addToRow(triangles2, 1);
//---//

//rectangle1 reposition
rectangle1.centerX = triangles2[triangles2.length-1].getRightX() + 300;
//--//

//array of triangle rows
let triangles = createArray();
triangles.push(triangles1);
triangles.push(triangles2);
let triangleTrail = [];
//--//

//add 3 more darts to dartsToShoot
addToRow(dartsToShoot, 3);
//---//

/*--Create recs/deathtrap 1 */

    // add to rectangleRow
    addToRow(rectangleRow, 1);
    //Reposition deathtrap
    deathTrap1.beginX = rectangleRow[0].getRightX();
    deathTrap1.endX = deathTrap1.beginX + rectangleRow[0].flatSpacing;
    //Extend death trap once
    extendDeathTraps(rectangleRow, deathTraps, 1);

//------//

/*--Create tris for wall*/
let triangle3 = duplicateForRow(triangle1);
repositionTriangle(triangle3,
                   rectangleWall.getLeftX() + 500,
                   rectangleWall.getTopY() - triangle3.strokeWidth);
let triangles3 = createArray();
triangles3.push(triangle3);
addToRow(triangles3, 2);
triangles.push(triangles3);
//---/

/*--Create recs/deathtrap2 for wall */
    let rectangle2 = duplicateForRow(rectangle1);
    rectangle2.centerX = triangles3[triangles3.lastIndex()].getRightX() + 300;
    rectangle2.centerY = rectangleWall.getTopY() - rectangle2.height/2;
    let rectangleRow2 = createArray();
    rectangleRow2.push(rectangle2);
    addToRow(rectangleRow2, 1);
    let deathTrap2 = duplicateForRow(deathTrap1);
    deathTrap2.beginX = rectangle2.getRightX();
    deathTrap2.endX = deathTrap2.beginX + rectangle2.flatSpacing;
    deathTrap2.beginY = rectangle2.getBottomY() - 3;
    deathTrap2.endY = rectangle2.getBottomY() - 3;
    deathTraps.push(deathTrap2);
//----//

/*--Create tunnel to place after recWall */
let tunnel2 = duplicateForRow(tunnel);
tunnel2.centerX = rectangleWall.getRightX() + tunnel2.width/2 + 200;
tunnelRow.push(tunnel2);

let triangle4 = duplicateForRow(triangle1);
repositionTriangle(triangle4, tunnel2.getRightX() + 200, canvas.height + triangle4.height + 2);
triangle4.spacing = 500;
let triangleTraps = createArray();
let triTrapsTrail = createArray();
let triangles4 = createArray();
triangles4.push(triangle4);
addToRow(triangles4, 3);
for (let i = 0; i < triangles4.length; i++) {
    let trapRow = createArray();
    trapRow.push(triangles4[i])
    if (i > 0 && i < 3) {
        trapRow[0].spacing = 0;
        addToRow(trapRow, 1);
    } else if (i == 3) {
        trapRow[0].spacing = 0;
        addToRow(trapRow, 2);
    }
    triangleTraps.push(trapRow);
}



let bounceSound = new sound("sounds/bounce4.mp3");
let recLandSound = new sound("sounds/rec-land1.mp3");
let goodLuck = new sound("sounds/goodluck1.mp3");
let explode = new sound("sounds/explode1.mp3");
let bigBounce = new sound("sounds/big-bounce1.mp3");
let wallLand = new sound("sounds/wall-land2.mp3");
let falling = new sound("sounds/fall1.mp3");

graphics.pushMultToArray([
    line1,
    ball1,
    tunnelRow,
    triangles,
    triangleTrail,
    deathTraps,
    deathTrapTrail,
    rectangleRow,
    rectangleTrail,
    rectangleRow2,
    dartsToShoot,
    cannonRow,
    trampos,
    rectangleWalls,
    triangleTraps,
    triTrapsTrail
]);

graphics.pushMultToRender([
    line1,
    ball1,
    tunnelRow,
    // spaceships,
    triangles,
    triangleTraps,
    triangleTrail,
    deathTraps,
    deathTrapTrail,
    rectangleRow,
    rectangleTrail,
    dartsToShoot,
    cannonRow,
    trampos,
    rectangleWalls,
    triangleTraps,
    triTrapsTrail
]);





//creates a pyramid
// addToRow(rectangleRow, 2, false, false);
// addToRow(rectangleRow, 5, false, true);