class Graphic {
    constructor(details) {
        this.c = details.c; //canvas context for cing
        this.centerX = details.centerX; //x-coordinate of center
        this.centerY = details.centerY; //y-coordinate of center
        this.initialCenterX = this.centerX; //initial x-coordinate of center
        this.initialCenterY = this.centerY; //initial y-coordinate of center
        this.speed = details.speed; //amount of displacement per animation frame
        this.bounceSpeedY = 7.2; //displacement of centerY when calling bounce()
        this.initialBounceSpeedY = 7.2; //initial displacement of centerY when calling bounce()
        this.deceleration = .37; //number to subtract from bounceSpeedY when calling bounce()
        this.bounceSpeedX = 5; //displacement of centerX when calling bounceForward() and bounceBack()
        this.forwardDeceleration = .5; //number to subtract from bounceSpeedY when calling bounceForward()
        this.backDeceleration = .5; //number to subtract from bounceSpeedY when calling bounceBack()
        this.stopForward = details.stopForward; //x-coordinate where roll should stop
        this.stopFall = details.stopFall; //y-coordinate where fall should stop
        this.falling = false; //boolean to record whether or not circle is falling
        this.fallSpeedY = 0;
        this.fallDeceleration = .8;
        this.storeSpeed = 6;
        this.spacing = details.spacing;
    }

    //Add render method when you create class for a new shape :)

    //moves graphic forward
    forward() {
        this.centerX += this.speed;
  
    }

    //moves graphic backwards
    back() {
        this.centerX -= this.speed;
    }

    //bounces graphic straight up
    bounce() {
        this.bounceSpeedY -= this.deceleration;
        this.centerY -= this.bounceSpeedY;
    }

    //bounces graphic forward
    bounceForward() {
        this.bounceSpeedY -= this.forwardDeceleration;
        this.centerY -= this.bounceSpeedY;
        this.centerX += this.bounceSpeedX; 
    }

    //bounces graphic backwards
    bounceBack() {
        this.bounceSpeedY -= this.backDeceleration;
        this.centerY -= this.bounceSpeedY;
        this.centerX -= this.bounceSpeedX;
    }

    rotate(rotationRate) {
        this.c.rotate(rotationRate);
    }

    moveDown(amount) {
        this.centerY += amount;
    }

    fall() {
        this.fallSpeedY += this.fallDeceleration;
        this.centerY += this.fallSpeedY;
    }

    store() {
        this.centerY += this.storeSpeed;
    }

    changeColor(color) {
        this.color = color;
    }

    getLeftX() {
        return (this.centerX - this.width/2);
    }

    getRightX() {
        return (this.centerX + this.width/2);
    }

    getTopY() {
        return (this.centerY - this.height/2);
    }

    getBottomY() {
        return (this.centerY + this.height/2);
    }

}

class Circle extends Graphic {
    constructor(details) {
        super(details);
        this.color = details.color;
        this.radius = details.radius;
        this.startAngle = 0; //start angle for cing in canvas
        this.endAngle = Math.PI * 2; //end angle for cing in canvas
    }

    //cs circle according at it's center location
    render() {
        this.c.beginPath();
        this.c.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle);
        this.c.fillStyle = this.color;
        this.c.fill();
        this.c.closePath();
    }
}

class Rectangle extends Graphic {
    constructor(details) {
        super(details);
        this.width = details.width; //width of rectangle
        this.height = details.height; //height of rectangle
        this.towerSpacing = details.towerSpacing;
        this.towerHeightDiff = details.towerHeightDiff;
        this.flatSpacing = details.flatSpacing;
        this.color = details.color;
        this.strokeColor = details.strokeColor;
        this.strokeWidth = details.strokeWidth;
    }

    //cs rectangle according to its center location
    render() {
        this.c.beginPath();
        this.c.rect(this.centerX-this.width/2, this.centerY-this.height/2, this.width, this.height);
        this.c.fillStyle = this.color;
        this.c.strokeStyle = this.strokeColor;
        this.c.lineWidth = this.strokeWidth;
        this.c.fill();
        this.c.stroke();
        this.c.closePath();
    }

    changeColor(color) {
        this.color = color;
    }


}

class Triangle extends Graphic {
    constructor(details) {
        super(details);
        this.beginX = details.beginX; //x-coordinate for left-bottom corner
        this.beginY = details.beginY; //y-coordinate for left-bottom corner
        this.topX = details.topX; //x-coordinate for top corner
        this.topY = details.topY; //y-coordinate for top corner
        this.endX = details.endX; //x-coordinate for right-bottom corner
        this.endY = details.endY; //y-coordinate for right-bottom corner
        this.width = details.width; //triangle width
        this.height = details.height; //triangle height
        this.color = details.color; //color of triangle
        this.strokeColor = details.strokeColor;
        this.strokeWidth = details.strokeWidth;
    }

    //cs triangle on Canvas
    render() {
        this.c.beginPath();
        this.c.moveTo(this.beginX, this.beginY);
        this.c.lineTo(this.topX, this.topY);
        this.c.lineTo(this.endX, this.endY);
        this.c.lineTo(this.beginX, this.beginY);
        this.c.strokeStyle = this.strokeColor;
        this.c.lineWidth = this.strokeWidth;
        this.c.fillStyle = this.color;
        this.c.fill();
        this.c.stroke();
        this.c.closePath();
    }

    //moves triangle backwards
    back() {
        this.beginX -= this.speed;
        this.topX -= this.speed;
        this.endX -= this.speed;
    }

    //moves triangle forwards
    forward() {
        this.beginX += this.speed;
        this.topX += this.speed;
        this.endX += this.speed;
    }

    getLeftX() {
        return this.beginX;
    }

    getRightX() {
        return this.endX;
    }

    getTopY() {
        return this.topY;
    }

    getBottomY() {
        return this.endY;
    }

    moveDown(rate) {
        this.beginY += rate;
        this.topY += rate;
        this.endY += rate;
    }

    reveal(rate) {
        this.beginY -= rate;
        this.topY -= rate;
        this.endY -= rate;
    }

}

class Line {
    constructor(details) {
        this.c = details.c;
        this.beginX = details.beginX; //x-coordinate to begin cing line
        this.beginY = details.beginY; //y-coordinate to end cing line
        this.endX = details.endX; //x-coordinate to end cing line
        this.endY = details.endY; //y-coordinate to end cing line
        this.color = details.color; //color of line
        this.lineWidth = details.width; //width of line
        this.speed = details.speed;
    }

    //cs line on Canvas
    render() {
        this.c.beginPath();
        this.c.moveTo(this.beginX,this.beginY);
        this.c.lineTo(this.endX,this.endY);
        this.c.strokeStyle = this.color;
        this.c.lineWidth = this.lineWidth;
        this.c.stroke();
        this.c.closePath();
    }

    //moves graphic backwards
    back() {
        this.beginX -= this.speed;
        this.endX -= this.speed;
    }

    moveDown(amount) {
        this.beginY += amount;
        this.endY += amount;
    }

    getLeftX() {
        return this.beginX;
    }

    getRightX() {
        return this.endX;
    }

    getTopY() {
        return this.beginY;
    }

    getBottomY() {
        return this.endY;
    }
}

class Pic extends Graphic {
    constructor(details) {
        super(details);
        this.image = new Image(); //image object
        this.image.src = details.src; //img src
        this.image.width = details.width; //img width
        this.image.height = details.height; //img height
        this.width = details.width; //pic width
        this.height = details.height; //pic height
    }

    //Renders image according to its center
    render() {
        this.c.drawImage(
            this.image,
            this.centerX - this.image.width/2,
            this.centerY - this.image.height/2,
            this.image.width,
            this.image.height
        );
    }

    changeSrc(src) {
        this.image.src = src;
    }
}

class Graphics {
    constructor(context) {
        this.c = context;
        this.array = []; //array to contain all of the graphics of type graphic in the canvas
        this.toRender = [];
    }
    //cs each graphic in the array according to their ordering
    render() {
        this.c.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.toRender.length; i++) {
            let row = this.toRender[i];
            if (!(row[0] instanceof Array)) {
                for (let j = 0; j < row.length; j++) {
                    row[j].render();
                }
            } else {
                for (let j = 0; j < row.length; j++) {
                    let subRow = row[j];
                    for (let k = 0; k < subRow.length; k++) {
                        subRow[k].render();
                    }
                }
            }
        }
    }
    //adds new graphic to the graphics array
    pushToArray(rowToAdd) {
        this.array.push(rowToAdd);
    }

    pushMultToArray(rowsToAdd) {
        for (let i = 0; i < rowsToAdd.length; i++) {
            this.array.push(rowsToAdd[i]);
        }
    }

    push(rowToAdd) {
        this.toRender.push(rowToAdd);
    }

    pushMultToRender(rowsToAdd) {
        for (let i = 0; i < rowsToAdd.length; i++) {
            this.toRender.push(rowsToAdd[i]);
        }
    }

    getLastObject() {
        let i = this.array.length - 1;
        return this.array[i];
    }

    //removes and returns first element in the graphics array
    shift() {
        return this.toRender.shift();
    }

    splice(index, deleteCount) {
        return this.toRender.splice(index, deleteCount);
    }

    spliceAdd(index, deleteCount, toAdd) {
        return this.toRender.splice(index, deleteCount, toAdd);
    }

    moveDown() {
        for (let i = 0; i < this.array.length; i++) {
            let row = this.array[i];
            if (row[0] instanceof Rectangle || row[0] instanceof Line) {
                for (let j = 0; j < row.length; j++) {
                    row[j].moveDown(120);
                }
            }
        }
    }

    remove(row) {
        for (let i = 0; i < this.toRender.length; i++) {
            if (this.toRender[i] == row) {
                this.toRender.splice(i, 1);
            }
        }
    }

    removeRow(row) {
        for (let i = 0; i < this.toRender.length; i++) {
            if (row == this.toRender[i]) {
                this.toRender.splice(i, 1);
            }
        }
    }

    //rollsBack specified graphics according to those found in graphicsToRollBack array
    backGraphics(graphicsToBack) {
        for (let i = 0; i < graphicsToBack.length; i++) {
                graphicsToBack[i].back();
        }
    }

    backAll() {
        let i;
        if (this.array[1] == ball1) {
            i = 2;
        } else {
            i = 1;
        }
        while (i < this.array.length) {
            let row = this.array[i];
            if (!(row[0] instanceof Array)) {
                for (let j = 0; j < row.length; j++) {
                    row[j].back();
                }
            } else {
                for (let j = 0; j < row.length; j++) {
                    let subRow = row[j];
                    for (let k = 0; k < subRow.length; k++) {
                        subRow[k].back();
                    }
                }
            }
            i++;
        }
    }

    downAll(rate) {
        let i = 1;
        while (i < this.array.length - 2) {
            let row = this.array[i];
            if (!(row[0] instanceof Array)) {
                for (let j = 0; j < row.length; j++) {
                    row[j].moveDown(rate);
                }
            } else {
                for (let j = 0; j < row.length; j++) {
                    let subRow = row[j];
                    for (let k = 0; k < subRow.length; k++) {
                        subRow[k].moveDown(rate);
                    }
                }
            }
            i++;
        }
    }
 

    forward_graphics(graphicsToForward) {
        for (let i = 2; i <= graphicsToForward.length + 1; i++) {
            this.array[i].forward();
        }
    }

    

}

class Sprite extends Graphic {
    constructor(details) {
        super(details);
        this.image = new Image(); //image object
        this.image.src = details.src;
        this.spriteWidth = details.spriteWidth; //img width
        this.spriteHeight = details.spriteHeight; //img height
        this.width = details.width;
        this.height = details.height;
        this.centerX = details.centerX,
        this.centerY = details.centerY,
        this.columnIndex = 0;
        this.frameIndex = 0;
        this.tickCount = 1;
        this.ticksPerFrame = details.ticksPerFrame;
        this.numColumns = details.numColumns;
        this.lastRowColumns = details.lastRowColumns;
        this.rowIndex = 0;
        this.numRows = details.numRows;
        this.numFrames = this.numColumns * this.numRows;
        this.loop = details.loop;
        this.reverse = details.reverse;
        this.renderForwards = true;
    }

    render() {
        this.c.drawImage(
            this.image,
            this.columnIndex * (this.spriteWidth / this.numColumns),
            this.rowIndex * (this.spriteHeight / this.numRows),
            this.spriteWidth / this.numColumns,
            this.spriteHeight / this.numRows,
            this.centerX - this.width/2,
            this.centerY - this.height/2,
            this.width,
            this.height
        );
    }

    update() {
        this.tickCount++;
        if (this.tickCount > this.ticksPerFrame) {

            this.tickCount = 1;

            if (!this.reverse) {
                if (this.rowIndex < this.numRows - 1) {
                    if (this.columnIndex < this.numColumns - 1) {
                        this.columnIndex++;
                        this.frameIndex++;
                    } else {
                        this.columnIndex = 0;
                        this.rowIndex++;
                        this.frameIndex++;
                    }
                } else {
                    if (this.columnIndex < this.lastRowColumns - 1) {
                        this.columnIndex++;
                        this.frameIndex++;
                    }  else if (this.loop) {
                        this.columnIndex = 0;
                        this.rowIndex = 0;
                        this.frameIndex = 0;
                    }
                }
            } else {
                if (this.renderForwards) {
                    if (this.rowIndex < this.numRows - 1) {
                        if (this.columnIndex < this.numColumns - 1) {
                            this.columnIndex++;
                            this.frameIndex++;
                        } else {
                            this.columnIndex = 0;
                            this.rowIndex++;
                            this.frameIndex++;
                        }
                    } else {
                        if (this.columnIndex < this.lastRowColumns - 1) {
                            this.columnIndex++;
                            this.frameIndex++;
                        }  else {
                            this.columnIndex = this.lastRowColumns - 1;
                            this.renderForwards = false;
                        }
                    }
                } else {
                    if (this.rowIndex > 0) {
                        if (this.columnIndex > 1) {
                            this.columnIndex--;
                            this.frameIndex--;
                        } else {
                            this.columnIndex = this.numColumns - 1;
                            this.rowIndex--;
                            this.frameIndex--;
                        }
                    } else if (this.columnIndex > 0) {
                        this.columnIndex--;
                        this.frameIndex--;
                    } else if (this.loop) {
                        this.frameIndex = 0;
                        this.rowIndex = 0;
                        this.columnIndex = 0;
                        this.renderForwards = true;
                    }
                }
            }
        }
    }

    landOnGraphic(graphic, bouncing) {
        let graphicLeftX = graphic.getLeftX();
        let graphicRightX = graphic.getRightX();
        let graphicTopY = graphic.getTopY();

        let thisLeftX = this.getLeftX();
        let thisRightX = this.getRightX();

        let land = this.centerY >= graphicTopY - this.height/2 &&
                   this.centerX + this.width/4 >= graphicLeftX &&
                   thisLeftX <= graphicRightX && bouncing;

        return land;
    }

    landOnTunnel(graphic, bouncing) {
        let graphicLeftX = graphic.getLeftX();
        let graphicRightX = graphic.getRightX();
        let graphicTopY = graphic.getTopY();

        let thisLeftX = this.getLeftX();
        let thisRightX = this.getRightX();

        let land = this.centerY >= graphicTopY - this.height/2 &&
                   this.centerX >= graphicLeftX &&
                   thisLeftX <= graphicRightX && bouncing;

        return land;
    }

    hitOnGround(graphic) {
        let graphicLeftX = graphic.getLeftX();
        let graphicRightX = graphic.getRightX();

        let hit = this.centerX >= graphicLeftX &&
                  this.centerX <= graphicRightX &&
                  this.centerY == this.initialCenterY;
        return hit;
    }

    stillOnGraphic(graphic) {
        let graphicLeftX = graphic.getLeftX();
        let graphicTopY = graphic.getTopY();
        let graphicRightX = graphic.getRightX();
        let thisLeftX = this.getLeftX();

        let on = this.centerY >= graphicTopY - this.height/2 &&
                thisLeftX >= graphicLeftX &&
                thisLeftX <= graphicRightX + 5;
        return on;
    }

    deathTrapLand(first, last, bouncing) {
        let firstRightX = first.getRightX();
        let lastLeftX = last.getLeftX();
        let thisLeftX = this.getLeftX();
        let thisRightX = this.getRightX();
        let deathLand = thisLeftX >= firstRightX &&
                    thisRightX <= lastLeftX && !bouncing;
        return deathLand;
    }

    deathTri(tris) {
        let lastTri = tris[tris.length - 1];
        let firstTri = tris[0];
        let leftX = firstTri.getLeftX();
        let rightX = lastTri.getRightX();
        let topY = firstTri.getTopY();
        
        let thisLeftX = this.getLeftX();
        let thisBottomY = this.getBottomY();

        let deathLand = this.centerX >= leftX &&
                        thisLeftX <= rightX &&
                        this.centerY == this.initialCenterY;
        return deathLand;
    }

    passed(graphic) {
        let graphicRightX = graphic.getRightX();
        let passed = this.centerX - this.width/2 >= graphicRightX;
        return passed;
    }

    throughTunnel(tunnel) {
        let tunnelLeftX = tunnel.getLeftX();
        let tunnelRightX = tunnel.getRightX();
        let thisLeftX = this.getLeftX();
        let thisRightX = this.getRightX();
        let through = thisLeftX >= tunnelLeftX - 100 &&
                      thisRightX <= tunnelRightX + 75 &&
                      this.centerY == this.initialCenterY;
        return through;
    }

    changeSrc(src) {
        this.image.src = src;
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.pause = function(){
        this.sound.pause();
    }
}

function createArray() {
    let array = [];
    array.lastIndex = function () {
        return array.length - 1;
    }
    array.changeColor = function(color) {
        for (let i = 0; i < array.length; i++) {
            array[i].color = color;
        }
    }
    array.reveal = function(rate) {
        for (let i = 0; i < array.length; i++) {
            array[i].reveal(rate);
        }
    }
    return array;
}
