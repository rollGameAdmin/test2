let img = document.getElementById("comingSoon");
img.width = 577;
img.height = 148;
function main() {

    let backMusic = document.getElementById('background');

    let global = {
        bouncing: false,
        rotating: false,
        deathLand: false,
        dartNum: 1,
        dartsIndex: 0,
        rectangleTopY: rectangle1.centerY - rectangle1.height/2,
        tunnelTopY: tunnel.centerY - tunnel.height/2,
        wallTopY: rectangleWall.centerY - rectangleWall.height/2,
        rectangleLand: false,
        tunnelLand: false,
        on: false,
        onTunnel: false,
        hitRecOnGround: false,
        hitTrampoOnGround: false,
        passed: false,
        passedWall: false,
        passedTunnel: false,
        checkTunnel: false,
        backAll: true,
        trampoLand: false,
        tramped: false,
        repeatAnim: true,
        passedFirstFrame: false,
        wallLand: false,
        down: false,
        addedCannon: false,
        addedTrampo: false,
        addedWall: false,
        addedDarts: false,
        onWall: false,
        shotDarts: false,
        cannonRepo: false,
        hitTri: false,
        passedTri: false,
        closeToGround: false,
        bounceSoundPlayed: false,
        changedCanBounce: false,
        toggleMusicOff: true,
        canFall: true,
        onWall: false,
        shipShowing: false,
        shipAnimated: false,
        start: false,
        passedTriTrap: false,
        revealed: false
    }

    function playMusic(music) {
        music.play();
    }

    let renderReq = 0;
    function renderGraphics() {
        renderReq = window.requestAnimationFrame(renderGraphics);
        graphics.render();
        if (global.start) {
            spaceships[0].back();
        }
    }

    
    renderGraphics(); //renders all graphics it holds

    let rotateReq = 0;
    function rotateBall() {
        rotateReq = window.requestAnimationFrame(rotateBall);
        if (global.rotating) {
            ball.update();           
        } else {
            window.cancelAnimationFrame(rotateReq);
        }
    }

    function shootFirstDart() {
        dartsToShoot[0].speed = gameSpeed + 4;
    }

    let shootDartsReq = 0;
    function shootDarts() {
        shootDartsReq = window.requestAnimationFrame(shootDarts);
        if ((dartsToShoot[global.dartNum-1].endX <= cannon.getLeftX()-300) && global.dartNum < dartsToShoot.length) {
            dartsToShoot[global.dartNum].speed = gameSpeed + 4;
            global.dartNum++;
        } else if (global.dartNum == dartsToShoot.length) {
            window.cancelAnimationFrame(shootDartsReq);
        }
    }

    let storeCannonReq = 0;
    function storeCannon() {
        storeCannonReq = window.requestAnimationFrame(storeCannon);
        if (cannon.frameIndex < cannon.numFrames - 1) {
            cannon.update();
        } else if (cannon.centerY <= line.beginY + cannon.width) {
            cannon.store();
        } else {
            window.cancelAnimationFrame(storeCannonReq);
        }
    }

    let animShipReq = 0;
    function animateShip() {
        animShipReq = window.requestAnimationFrame(animateShip);
        if (global.shipShowing) {
            spaceship1.update();
        } else {
            window.cancelAnimationFrame(animShipReq);
        }
    }

    let moveDownReq = 0;
    function moveDownAll() {
        moveDownReq = window.requestAnimationFrame(moveDownAll);
        if (rectangleWall.getTopY() < line.beginY - 150) {
            graphics.downAll(7);
            ball.initialCenterY = ball.centerY;
        } else {
            window.cancelAnimationFrame(moveDownReq);
            explodedBall.centerY = ball.initialCenterY;
            global.rectangleTopY = rectangleRow[0].getTopY();
            global.wallLand = false;
            tunnelRow[0].centerY = line.beginY - (ballRadius - 2) * 2 * 1.08/2;
            canBounce = true;
        }
    }

    let revealTrapReq = 0;
    function revealTrap() {
        revealTrapReq = window.requestAnimationFrame(revealTrap);
        let trapRow = triangleTraps[0];
        if (trapRow[0].getBottomY() > canvas.height) {
            trapRow.reveal(6);
        } else {
            window.cancelAnimationFrame(revealTrapReq);
            for (let i = 0; i < trapRow.length; i++) {
                repositionTriangle(trapRow[i], -1, line.beginY);
            }
            global.revealed = false;
        }
    }

    function trampoJump() {
            global.rotating = false;
            ball.bounceSpeedY = 16;
            bounce();
            bigBounce.play();
    }

    let manageRowsReq = 0;
    function manageRows() {
        manageRowsReq = window.requestAnimationFrame(manageRows);

        /*-- manage recs and death traps --*/
        if (rectangleRow.length > 0 &&
            (global.rectangleLand || rectangleRow[0].centerX == line.beginX)) {
            recLandSound.play();
            let removed = rectangleRow.splice(0,1);
            rectangleTrail.push(removed[0]);
            if (deathTraps.length > 0) {
                removed = deathTraps.splice(0,1);
                deathTrapTrail.push(removed[0]);
            }
        }

        //delete from trail
        if (rectangleTrail.length > 0 &&
            rectangleTrail[0].getRightX() < -100) {
            rectangleTrail.splice(0,1);
        }
        if (deathTrapTrail.length > 0 &&
            deathTrapTrail[0].getRightX() < -100) {
                deathTrapTrail.splice(0,1);
        }

        /*---move recs in recRow2 to rectangleRow---*/

        if (rectangleRow.length == 0 && rectangleTrail.length == 0) {
            let length = rectangleRow2.length;
            for (let i = 0; i < length; i++) {
                rectangleRow.push(rectangleRow2.shift());
            }
        }
        /*-----*/

        /*--manage tris --*/
        if (global.passedTri && triangles.length > 0) {
            let removed = triangles.splice(0,1);
            triangleTrail.push(removed[0]);
        }

        if (triangleTrail.length > 0) {
            let row = triangleTrail[0];
            if (row[row.length-1].getRightX() < -100) {
                triangleTrail.splice(0,1);
            }
        }
        /*----*/

        /* manage tunnel */
        if (tunnelRow.length > 0) {
            if (tunnelRow[0].getRightX() < -100) {
                tunnelRow.splice(0, 1);
            }
        }
        /*----*/

        /* manage tri traps */
        if (global.passedTriTrap && triangleTraps.length > 0) {
            triTrapsTrail.push(triangleTraps.shift());
        }
        if (triTrapsTrail.length > 0) {
            let trapTrail = triTrapsTrail[0];
            if (trapTrail[trapTrail.lastIndex()].getRightX() < -100) {
                triTrapsTrail.splice(0,1);
            }
        }
        /*---*/

        /* manage cannon and darts */
        if (cannon.getRightX() < -100) {
            graphics.remove(cannonRow);
        }
    
        if (dartsToShoot.length > 0 &&
            dartsToShoot[dartsToShoot.length - 1].endX < -100) {
            graphics.remove(dartsToShoot);
        }
        /*---*/

        /*manage trampo*/
        if (trampo1.getRightX() < -100) {
            graphics.remove(trampos);
        }
        /*---*/

        /*manage rec walls*/
        if (rectangleWall.getRightX() < -100) {
            graphics.remove(rectangleWalls);
        }
        /*---*/
    }


    let trackLandFlagsReq = 0;
    function trackLandFlags() {
        trackLandFlagsReq = window.requestAnimationFrame(trackLandFlags);
        /*track rectangles*/
        if (rectangleRow.length > 0) {
            let rectangle = rectangleRow[0];

            global.rectangleLand = ball.landOnGraphic(rectangle, global.bouncing);

            global.hitRecOnGround = ball.hitOnGround(rectangle);

            if (global.hitRecOnGround) {
                endGame(-1, -1);
            }          
        }

        /*track tunnel*/
        if (tunnelRow.length > 0) {
            global.tunnelLand = ball.landOnTunnel(tunnelRow[0], global.bouncing);
        }

        /*track triangles*/
        if (triangles.length > 0) {
            let triRow = triangles[0];
            global.hitTri = ball.deathTri(triRow);
        }


        if (Math.abs((cannon.getLeftX()) - (ball.getRightX()) <= 3000) &&
            !global.shotDarts) {
            shootFirstDart();
            shootDarts();
            shotDarts = true;
        }

        /*manage cannon shooting*/ 
        if (Math.abs((cannon.getLeftX()) - (ball.getRightX()) <= 350) && !stored) {
            storeCannon();
            stored = true;
        }

        if (dartsToShoot[global.dartsIndex].beginX <= ball.getRightX() &&
            dartsToShoot[global.dartsIndex].beginX >= ball.getLeftX() &&
            ball.centerY == ball.initialCenterY) {
                endGame(-1, -1);
                dartsToShoot[global.dartsIndex].color = colors.oceanBlue;
            }

        if (ball.getLeftX() >= dartsToShoot[global.dartsIndex].endX && global.dartsIndex < dartsToShoot.length - 1) {
            global.dartsIndex++;
        }

        /*manage trampo bounce and wall landing*/
        global.hitTrampoOnGround = ball.hitOnGround(trampo1);
        if (global.hitTrampoOnGround || global.hitTri) {
            let triRow = triangles[0];
            // triRow.changeColor(colors.oceanBlue);
            if (global.hitTri && ball.centerX > triRow[triRow.lastIndex()].getRightX()) {
                endGame(triRow[triRow.lastIndex()].getRightX(), -1);
            } else {
                endGame(-1, -1);
            }
        }

    
        global.trampoLand = ball.landOnGraphic(trampo1, global.bouncing);
        if (global.trampoLand && !global.tramped) {
            window.cancelAnimationFrame(bounceReq);
            trampo1.changeSrc(filledInTrampo);
            trampoJump();
            global.tramped = true;
        }
        if (!global.onWall) {
            global.wallLand = ball.landOnGraphic(rectangleWall, global.bouncing);
            if (global.wallLand) {
                wallLand.play();
                canBounce = false;
                global.onWall = true;
                moveDownAll();
            }
        }   
        
    }

    let trackPassedFlagsReq = 0;
    function trackPassedFlags() {
        trackPassedFlagsReq = window.requestAnimationFrame(trackPassedFlags);
        if (rectangleTrail.length > 0 || rectangleRow.length > 0) {
            let bRectangle;
            let fRectangle;
            if (rectangleTrail.length > 0) {
                let lastIndex = rectangleTrail.length - 1;
                bRectangle = rectangleTrail[lastIndex];
                bRectangle.changeColor(colors.lightGreen);
                if (rectangleRow.length > 0) {
                    fRectangle = rectangleRow[0];
                }
            } else if (rectangleRow.length > 0) {
                bRectangle = rectangleRow[0];
                fRectangle = rectangleRow[1];
            }

            if (rectangleTrail.length > 0) {
                global.on = ball.stillOnGraphic(bRectangle);
            }
 
            if (rectangleTrail.length > 0 && rectangleRow.length > 0) {
                global.deathLand = ball.deathTrapLand(bRectangle, fRectangle, global.bouncing);
            }

            if (triangles.length > 0) {
                let firstRow = triangles[0];
                global.passedTri = ball.getLeftX() > firstRow[firstRow.length - 1].getRightX();
            }

            if (global.on) {
                global.passed = ball.passed(bRectangle);
            }

            if (global.deathLand) {
                endGame(-1, ball.initialCenterY + ballRadius);         
            }

        } else {
            global.onWall = ball.stillOnGraphic(rectangleWall);
            global.passedWall = ball.passed(rectangleWall);
            if (global.passedWall) {
                ball.initialCenterY = canvas.height - ball.height/2;
            }
            if (global.onWall) {
                if (global.passedWall && global.canFall) {
                    global.canFall = false;
                    if (!global.bouncing) {
                        fall();
                    }
                }
            }

            if (tunnelRow.length > 0) {
                global.onTunnel = ball.stillOnGraphic(tunnelRow[0]);
                if (global.onTunnel) {
                    global.passed = ball.passed(tunnelRow[0]);
                }
            }

             /*Manage sneaky little tri traps*/
             if (triangleTraps.length > 0) {
                let firstTraps = triangleTraps[0];
                global.passedTriTrap = ball.getLeftX() > firstTraps[firstTraps.lastIndex()].getRightX();

                if (Math.abs(ball.getRightX() - firstTraps[0].getLeftX()) < 120) {
                    if (!global.revealed) {
                        global.revealed = true;
                        revealTrap();
                    }
                }

                global.hitTrap = ball.deathTri(firstTraps);
                if (global.hitTrap) {
                    endGame(-1, -1);
                }
            }
            //----//

            /*Check if ball is inside tunnel to disable bounce*/
            if (tunnelRow.length > 0) {
                global.inTunnel = ball.throughTunnel(tunnelRow[0]);
                if (global.inTunnel) {
                    canBounce = false;
                } else {
                    if (tunnelRow[0] != tunnel) {
                        canBounce = true;
                    }
                }
            }
            //---//
        }

        global.shipShowing = spaceship1.getLeftX() < canvas.width &&
                            spaceship1.getRightX() > 0;
        if (!global.shipAnimated && global.shipShowing) {
            animateShip();
            global.shipAnimated = true;
        }
    }

    let beginGameReq = 0;
    function beginGame() {
        beginGameReq = window.requestAnimationFrame(beginGame);
        if (ball.getLeftX() < tunnel.getRightX() + 20) {
            ball.forward();
        } else {
            window.cancelAnimationFrame(beginGameReq);
            $('h1').text('Press spacebar to jump.');
            explodedBall.centerX = ball.centerX;
            explodedBall.centerY = ball.centerY;
            goodLuck.play();
            backMusic.play();
            begin();
            trackPassedFlags();
            trackLandFlags();
            manageRows();
            canBounce = true;
            shot = true;
        }
    }

    let beginReq = 0;
    let stored = false, shot = false;
    function begin() {
        beginReq = window.requestAnimationFrame(begin);

        if (global.backAll) {  
            graphics.backAll();
        }

        if (global.passed) {
            if (!global.bouncing && global.canFall && (global.on || global.onTunnel)) {
                global.canFall = false;
                fall();
                // falling.play();
            }
        }
    }

    let bounceReq = 0;
    function bounce() {
        bounceReq = window.requestAnimationFrame(bounce);
        global.closeToGround = (Math.abs(ball.centerY - ball.initialCenterY) < 10) && ball.bounceSpeedY < 0;
        if (!global.rectangleLand && !global.tunnelLand
            && !global.wallLand && !global.closeToGround) {
            global.bouncing = true;
            ball.bounce();
            global.rotating = false; 
            if (!global.bounceSoundPlayed) {
                bounceSound.play();
                global.bounceSoundPlayed = true;
            }
        }
        else if (global.rectangleLand || global.tunnelLand
                || global.wallLand) {
            if (global.rectangleLand) {
                ball.centerY = global.rectangleTopY - ballRadius; 
            } else if (global.tunnelLand) {
                ball.centerY = global.tunnelTopY - ballRadius;
            } else {
                ball.centerY = rectangleWall.getTopY()- ballRadius;
                ball.initialCenterY = ball.centerY;
            }       
            window.cancelAnimationFrame(bounceReq);
            global.bounceSoundPlayed = false;
            global.bouncing = false;
            global.rotating = true;
            rotateBall();
        }
        else {
            ball.centerY = ball.initialCenterY;          
            window.cancelAnimationFrame(bounceReq);
            global.bounceSoundPlayed = false;
            global.bouncing = false;
            global.rotating = true;
            rotateBall();
        }
    }

    let fallReq = 0;
    function fall() {
        fallReq = window.requestAnimationFrame(fall);
        if ((!global.onWall || global.passedWall) &&
            ball.centerY < canvas.height - ball.height/2) {
            ball.fall();
        } else if (ball.centerY < rectangleWall.getTopY() - ball.height/2) {
            ball.fall();
        } else {
            window.cancelAnimationFrame(fallReq);
            if (!global.onWall || global.passedWall) {
                ball.centerY = canvas.height - ball.height/2;
            } else {
                ball.centerY = rectangleWall.getTopY() - ball.height/2;
            }
            ball.fallSpeedY = 0;
            ball.initialCenterY = ball.centerY;
            global.canFall = true;
            explodedBall.centerY = ball.centerY;
            global.passed = false;
        }
    }



    function startGame() {
        beginGame();
        global.rotating = true;
        rotateBall();
        backMusic.volume = 0.5;
    }

    function endGame(explodedX, explodedY) {
        window.cancelAnimationFrame(beginReq);
        window.cancelAnimationFrame(bounceReq);
        window.cancelAnimationFrame(trackPassedFlagsReq);
        window.cancelAnimationFrame(trackLandFlagsReq);
        window.cancelAnimationFrame(rotateReq);
        window.cancelAnimationFrame(manageRowsReq);
        if (explodedX != -1) {
            explodedBall.centerX = explodedX;
        }
        if (explodedY != -1) {
            explodedBall.centerY = explodedY;
        }
        canBounce = false;
        explode.play();
        graphics.spliceAdd(1, 1, exploded); 
    }


    // let start = false;
    let canBounce = false;
    $('html').on('keydown', function (event) {
        /*
            Key Codes:
            space bar: 32
            up arrow: 38
            left arrow: 37
            right arrow: 39
            down arrow: 40
        */

        //bounce when pressing spacebar
        if (event.which === 32) {
            if (!global.bouncing && canBounce) {
                global.rectangleLand = false;
                ball.bounceSpeedY = ball.initialBounceSpeedY;
                bounce();
            }
            if(!global.start) {
                startGame();
                global.start = true;
            }
        }

        if (event.which === 82) {
            location.reload();
        }

        if (event.which === 77) {
            if (global.toggleMusicOff) {
                backMusic.pause();
                global.toggleMusicOff = false;
            } else {
                backMusic.play();
                global.toggleMusicOff = true;
            }
        }
    });  

    function handleTouch(evt) {
        if(!global.start) {
            startGame();
            global.start = true;
        }
        if (!global.bouncing && canBounce) {
            global.rectangleLand = false;
            ball.bounceSpeedY = ball.initialBounceSpeedY;
            bounce();
        }
    }
    
    var el = document.getElementsByTagName("html")[0];
    el.addEventListener("touchstart", handleTouch, false);
}

$(main);

