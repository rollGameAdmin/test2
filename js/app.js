function main() {

    let backMusic = document.getElementById('background');

    let global = {
        startTime: 0,
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
        playBounceSound: true,
        changedCanBounce: false,
        toggleMusicOff: false,
        toggleSoundsOff: false,
        soundsOn: false,
        canFall: true,
        onWall: false,
        shipShowing: false,
        shipAnimated: false,
        start: false,
        passedTriTrap: false,
        revealed: false,
        loopedIt: false,
        changeSpeed: true,
        changeSpeedLast: false,
        celebrate: false,
        bentKnees: false,
        replacedCharacter: false,
        calledFall: false,
        gameEnd: false,
        enemyShot: false,
        shotShip: false,
        removedShotShip: false,
        inBetweenRecs: false,
        score: 0
    }

    let renderReq = 0;
    function renderGraphics() {
        renderReq = window.requestAnimationFrame(renderGraphics);
        graphics.render();
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
        dartsToShoot[0].speed = canvas.width * 10/1305;
    }

    let shootDartsReq = 0;
    function shootDarts() {
        shootDartsReq = window.requestAnimationFrame(shootDarts);
        if ((dartsToShoot[global.dartNum-1].endX <= cannon.getLeftX()- scale(350)) && global.dartNum < dartsToShoot.length) {
            dartsToShoot[global.dartNum].speed = canvas.width * 10/1305;
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

    let shootShipReq = 0;
    function shootShip() {
        shootShipReq = window.requestAnimationFrame(shootShip);
        if (enemyAmmo.length > 0 && 
            enemyAmmoShot[enemyAmmoShot.lastIndex()].getRightX() < enemyShip1.getLeftX() - scale(20)) {
            enemyAmmo[0].speed = enemyShip1.speed + scale(6);
            enemyAmmoShot.push(enemyAmmo.shift());
        }
        if (enemyAmmoShot[0].getLeftX() < spaceship1.getRightX() && !global.shotShip) {
            spaceships.shift();
            spaceships.unshift(shotShip);
            global.shotShip = true;
        }
        if (enemyShip1.getRightX() < scale(-10) && !global.removedShotShip) {
            spaceships.shift();
            global.removedShotShip = true;
        }
    }
    
    let showShipsReq = 0;
    function showShips() {
        showShipsReq = window.requestAnimationFrame(showShips);
        if (ball.getRightX() < rectangleWall.getLeftX() - scale(500) ||
            ball.getLeftX() > rectangleWall.getRightX() + scale(200)) {
            if (spaceship1.getRightX() > scale(-1000) && !global.shotShip) {
                spaceship1.back(-1);
                shotShip.centerX = spaceship1.centerX;
            } else {
                spaceship1.centerX = canvas.width + scale(1000);
            }
            if (spaceship2.getRightX() > scale(-1000)) {
                spaceship2.back(-1);
            } else {
                spaceship2.centerX = canvas.width + scale(1000);
            }
            if (ball.getLeftX() > rectangleWall.getRightX() + scale(200)) {
                if (enemyShip1.getRightX() > scale(-1000)) {
                    enemyShip1.back(-1);
                    for (let i = 0; i < enemyAmmo.length; i++) {
                        enemyAmmo[i].back(-1);
                    }
                    for (let i = 0; i < enemyAmmoShot.length; i++) {
                        enemyAmmoShot[i].back(-1);
                    }
                } else {
                    enemyShip1.centerX = canvas.width + scale(1000);
                }
                if (spaceship1.getRightX() < canvas.width
                    && !global.enemyShot) {
                    enemyAmmo1.speed = enemyShip1.speed + scale(6);
                    enemyAmmoShot.push(enemyAmmo.shift());
                    shootShip();
                    global.enemyShot = true;
                }
            }
        } else if (enemyShip1.getRightX() > scale(-100) && enemyShip1.getLeftX() < canvas.width) {
            spaceship1.back(-1);
            spaceship2.back(-1);
            enemyShip1.back(-1);
        } else {
            spaceship1.centerX = canvas.width + scale(1000);
            spaceship2.centerX = canvas.width + scale(1000);
        }  
    }

    let updateScoreReq = 0;
    let scoreCount = document.getElementById('score-counter');
    function updateScore() {
        updateScoreReq = window.requestAnimationFrame(updateScore);
        let distanceMoved = Math.abs(flag.centerX - flag.initialCenterX);
        let newScore = distanceMoved | 0;
        global.score = newScore;
        scoreCount.innerHTML = '' + newScore;
    } 

    let moveDownReq = 0;
    function moveDownAll() {
        moveDownReq = window.requestAnimationFrame(moveDownAll);
        if (rectangleWall.getTopY() < line.beginY - scale(150)) {
            graphics.downAll(scale(7));
            ball.initialCenterY = ball.centerY;
        } else {
            window.cancelAnimationFrame(moveDownReq);
            explodedBall.centerY = ball.initialCenterY;
            global.rectangleTopY = rectangleRow[0].getTopY();
            global.wallLand = false;
            canBounce = true;
        }
    }

    let revealTrapReq = 0;
    function revealTrap() {
        revealTrapReq = window.requestAnimationFrame(revealTrap);
        let trapRow = triangleTraps[0];
        if (trapRow[0].getBottomY() > canvas.height) {
            trapRow.reveal(scale(10));
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
            ball.bounceSpeedY = scale(17); //original 16
            bounce();
            if (global.soundsOn) {
                bigBounce.play();
            }
    }

    let loopBallReq = 0;
    function loopBall() {
        loopBallReq = window.requestAnimationFrame(loopBall);
        if (ball.angle < ball.initialAngle + Math.PI * 2) {
            ball.loopIt();
        } else {
            window.cancelAnimationFrame(loopBallReq);
            ball.centerY = ball.initialCenterY;
            global.backAll = true;
            global.changeSpeedLast = true;
        }
    }

    let celebrateReq = 0;
    function celebrate() {
        celebrateReq = window.requestAnimationFrame(celebrate);
        if (!global.celebrate) {
            ball.bounceSpeedY = ball.initialBounceSpeedY;
            global.celebrate = true;
            bounce();
        }
    }

    let walkReq = 0;
    function walk() {
        walkReq = window.requestAnimationFrame(walk);
        // character1.forward();
        if (character1.getLeftX() < tunnel.getRightX() + scale(100)) {
            if (character1.frameIndex == 1) {
                character1.forward();
            }
            character1.update();
        } else if (character1.frameIndex != 0) {
            character1.update();
        } else if (!global.bentKnees) {
            character2.centerX = character1.centerX;
            character2.centerY = character2.centerY;
            characters.splice(0,1);
            characters.unshift(character2);
            character2.update();
            global.bentKnees = true;
        } else if (character2.bounceSpeedY > 0) {
            character2.bounce();
        } else if (!global.replacedCharacter) {
            global.rotating = false;
            graphics.remove(characters);
            graphics.unshift(ball1);
            global.replacedCharacter = true;
            ball.centerX = character2.centerX;
            ball.centerY = character2.getBottomY() - character2.height/2.33; //place ball right above legs
        } else if (!global.calledFall) {
            fall();
            global.calledFall = true;
        } else if (ball.centerY == ball.initialCenterY && !global.rotating) {
            global.rotating = true;
            rotateBall();
        }
    }

    let manageRowsReq = 0;
    function manageRows() {
        manageRowsReq = window.requestAnimationFrame(manageRows);

        /*-- manage recs and death traps --*/
        if (rectangleRow.length > 0 &&
            (global.rectangleLand || rectangleRow[0].centerX == line.beginX)) {
            if (global.soundsOn) {
                recLandSound.play();
            }
            let removed = rectangleRow.splice(0,1);
            rectangleTrail.push(removed[0]);
            if (deathTraps.length > 0) {
                removed = deathTraps.splice(0,1);
                deathTrapTrail.push(removed[0]);
            }
        }

        //delete from trail
        if (rectangleTrail.length > 0 &&
            rectangleTrail[0].getRightX() < scale(-100)) {
            rectangleTrail.splice(0,1);
        }
        if (deathTrapTrail.length > 0 &&
            deathTrapTrail[0].getRightX() < scale(-100)) {
                deathTrapTrail.splice(0,1);
        }

        /*---move recs in recRow2 to rectangleRow---*/

        if (rectangleRow.length == 0 && rectangleTrail.length == 0) {
            if (rectangleRow != rectangleRow2) {
                rectangleRow = rectangleRow2;
            }
            if (global.passedWall) {
                rectangleRow = rectangleRow3;
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
            if (row[row.length-1].getRightX() < scale(-100)) {
                triangleTrail.splice(0,1);
            }
        }
        /*----*/

        /* manage tunnel */
        if (tunnelRow.length > 0) {
            if (tunnelRow[0].getRightX() < scale(-100)) {
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
            if (trapTrail[trapTrail.lastIndex()].getRightX() < scale(-100)) {
                triTrapsTrail.splice(0,1);
            }
        }
        /*---*/

        /* manage cannon and darts */
        if (cannon.getRightX() < scale(-100)) {
            graphics.remove(cannonRow);
        }
    
        if (dartsToShoot.length > 0 &&
            dartsToShoot[dartsToShoot.length - 1].endX < scale(-100)) {
            graphics.remove(dartsToShoot);
        }
        /*---*/

        /*manage trampo*/
        if (trampo1.getRightX() < scale(-100)) {
            graphics.remove(trampos);
        }
        /*---*/

        /*manage rec walls*/
        if (rectangleWall.getRightX() < scale(-100)) {
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

            global.hitRecOnGround = ball.hitOnGround(rectangle, global.onWall);

            if (global.hitRecOnGround) {
                endGame(-1, -1);
            }          
        } else if (rectangleTrail.length > 0) {
            let rectangle = rectangleTrail[0];
            global.rectangleLand = ball.landOnGraphic(rectangle, global.bouncing);
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


        if (Math.abs((cannon.getLeftX()) - (ball.getRightX()) <= scale(3200)) &&
            !global.shotDarts) {
            shootFirstDart();
            shootDarts();
            shotDarts = true;
        }

        /*manage cannon shooting*/ 
        if (Math.abs((cannon.getLeftX()) - (ball.getRightX()) <= scale(400)) && !stored) {
            storeCannon();
            stored = true;
        }

        if (dartsToShoot.length > 0) {
            let dart = dartsToShoot[global.dartsIndex];
            if (dart.beginX <= ball.getRightX() &&
                dart.endX >= ball.getLeftX() &&
                ball.centerY >= dart.topY) {
                    endGame(-1, -1);
                    dartsToShoot[global.dartsIndex].color = colors.oceanBlue;
                }
            }

        if (ball.getLeftX() >= dartsToShoot[global.dartsIndex].endX && global.dartsIndex < dartsToShoot.length - 1) {
            global.dartsIndex++;
        }

        /*manage trampo bounce and wall landing*/
        global.hitTrampoOnGround = ball.hitOnGround(trampo1, global.onWall);
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
            trampo1.update();
            trampoJump();
            global.tramped = true;
        }
        if (!global.onWall) {
            global.wallLand = ball.landOnGraphic(rectangleWall, global.bouncing);
            if (global.wallLand) {
                if (global.soundsOn) {
                    wallLand.play();
                }
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
            if (rectangleTrail.length > 0 && rectangleRow.length > 0) {
                global.inBetweenRecs = true;
            } else {
                global.inBetweenRecs = false;
            }
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
 
            if (rectangleRow.length > 0) {
                if ((rectangleTrail.length > 0 && rectangleRow.length > 0) ||
                    (ball.getLeftX() > rectangleRow[0].getLeftX()))   {
                    global.deathLand = ball.centerY >= ball.initialCenterY;
                }
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
        }

        /*Manage sneaky little tri traps*/
        if (triangleTraps.length > 0) {
            let firstTraps = triangleTraps[0];
            global.passedTriTrap = ball.getLeftX() > firstTraps[firstTraps.lastIndex()].getRightX();

            if (Math.abs(ball.getRightX() - firstTraps[0].getLeftX()) < scale(300)) {
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
                if (tunnelRow[0] != tunnel && !global.gameEnd) {
                    canBounce = true;
                }
            }
        }
        //---//
        if (ball.centerX >= line2.beginX) {
            if (global.changeSpeed) {
                canBounce = false;
                // backMusic.pause();
                // loopCelebration.play();
                gameSpeed = canvas.width * (6.1 + 9)/1305;
                ball.ticksPerFrame = 1;
                global.changeSpeed = false;
            }
            if (ball.centerX >= loop.centerX - scale(4)) {
                if (!global.loopedIt) {
                    ball.axisX =  ball.centerX - (Math.cos(ball.initialAngle) * ball.loopRadius);
                    ball.axisY =  ball.centerY + (Math.sin(ball.initialAngle) * ball.loopRadius);
                    global.backAll = false;
                    if (global.soundsOn) {
                        loopSound.play();
                    }
                    loopBall();
                    global.loopedIt = true;
                }
            }
            if (ball.centerX >= line2.endX) {
                if (global.changeSpeedLast) {
                    gameSpeed = initialGameSpeed;
                    global.changeSpeedLast = false;
                    ball.ticksPerFrame = 2;
                    canBounce = true;
                }
            }
            if (ball.getLeftX() >= flag.getRightX() + scale(100)) {
                global.backAll = false;
                window.cancelAnimationFrame(rotateReq);
                window.cancelAnimationFrame(manageRowsReq);
                window.cancelAnimationFrame(trackPassedFlagsReq);
                window.cancelAnimationFrame(trackLandFlagsReq);
                window.cancelAnimationFrame(updateScoreReq);
                window.cancelAnimationFrame(bounceReq);
                global.rectangleLand = false;
                global.wallLand = false;
                global.tunnelLand = false;
                crownedBall.centerY = ball.centerY;
                graphics.spliceAdd(1, 1, crowned); 
                ball = crownedBall;
                crownedBall.initialCenterY = rectangleTrail[rectangleTrail.lastIndex()].getTopY() - crownedBall.height/2;
                global.playBounceSound = false;
                if (global.soundsOn) {
                    celebration.play();
                }
                canBounce = true;
                ball.initialBounceSpeedY = scale(7);
                celebrate();
                document.getElementById('score').innerHTML = 'Score: ' + global.score;
                document.getElementById('screen').style.display = 'block';
            }
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
        if (ball.getLeftX() < tunnel.getRightX() + scale(100)) {
            ball.forward();
        } else {
            window.cancelAnimationFrame(beginGameReq);
            explodedBall.centerX = ball.centerX;
            explodedBall.centerY = ball.centerY;
            crownedBall.centerX = ball.centerX - scale(3);
            crownedBall.centerY = ball.centerY - scale(13);
            if (global.soundsOn) {
                goodLuck.play();
            }
            begin();
            showShips();
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
            graphics.backAll(gameSpeed);
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
        global.closeToGround = (Math.abs(ball.centerY - ball.initialCenterY) < scale(10)) && ball.bounceSpeedY < 0;
        if (!global.rectangleLand && !global.tunnelLand
            && !global.wallLand && !global.closeToGround) {
            global.bouncing = true;
            ball.bounce();
            explodedBall.centerY = ball.centerY;
            global.rotating = false; 
            if (!global.bounceSoundPlayed && global.playBounceSound) {
                if (global.soundsOn) {
                    bounceSound.play();
                }
                global.bounceSoundPlayed = true;
            }
        }
        else if (global.rectangleLand || global.tunnelLand
                || global.wallLand) {
            if (global.rectangleLand) {
                ball.centerY = rectangleTrail[rectangleTrail.lastIndex()].getTopY() - ballRadius; 
            } else if (global.tunnelLand) {
                ball.centerY = global.tunnelTopY - ballRadius;
            } else {
                ball.centerY = rectangleWall.getTopY()- ballRadius;
                ball.initialCenterY = ball.centerY;
            }       
            window.cancelAnimationFrame(bounceReq);
            explodedBall.centerY = ball.centerY;
            global.bounceSoundPlayed = false;
            global.bouncing = false;
            global.rotating = true;
            rotateBall();
        }
        else {
            ball.centerY = ball.initialCenterY; 
            explodedBall.centerY = ball.centerY;       
            window.cancelAnimationFrame(bounceReq);
            global.bounceSoundPlayed = false;
            global.bouncing = false;
            if (!global.celebrate) {
                global.rotating = true;
                rotateBall();
            } else {
                global.celebrate = false;
            }
        }
    }

    let fallReq = 0;
    function fall() {
        fallReq = window.requestAnimationFrame(fall);
        if ((!global.onWall || global.passedWall) &&
            ball.centerY < line.beginY - ball.height/2 - line.width/2) {
            ball.fall();
        } else if (ball.centerY < rectangleWall.getTopY() - ball.height/2) {
            ball.fall();
        } else if (global.inBetweenRecs) {
            ball.fall();
        } else {
            window.cancelAnimationFrame(fallReq);
            if (!global.onWall || global.passedWall) {
                ball.centerY = line.beginY - ball.height/2 - line.width/2;
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
        document.getElementById('screen').style.display = 'none';
        document.getElementById('instruction').style.display = 'none';
        document.getElementById('start').style.display = 'none';
        document.getElementById('score').style.display = 'block';
        document.getElementById('restart').style.display = 'block';
        $('#shortcut').text('Shortcut: R Key');
        global.startTime = Math.floor(Date.now() / 1000);
        updateScore();
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
        window.cancelAnimationFrame(updateScoreReq);
        if (explodedX != -1) {
            explodedBall.centerX = explodedX;
        }
        if (explodedY != -1) {
            explodedBall.centerY = explodedY;
        }
        global.gameEnd = true;
        canBounce = false;
        if (global.soundsOn) {
            explode.play();
        }
        graphics.spliceAdd(1, 1, exploded);
        document.getElementById('score').innerHTML = 'Score: ' + global.score;
        document.getElementById('screen').style.display = 'block';
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
            if (!global.bouncing && canBounce && !global.celebrate) {
                global.rectangleLand = false;
                ball.bounceSpeedY = ball.initialBounceSpeedY;
                bounce();
            }

            if (!global.start) {
                startGame();
                global.start = true;
                var el = document.getElementsByTagName("html")[0];
                el.addEventListener("touchstart", handleTouch, false);
            }
        }

        if (event.which === 82) {
            location.reload();
        }

        if (event.which === 77) {
            if (global.toggleMusicOff) {
                backMusic.pause();
                global.toggleMusicOff = false;
                $('#musicButton').attr('src', "img/sounds/music_button2.png");
            } else {
                backMusic.play();
                global.toggleMusicOff = true;
                $('#musicButton').attr('src', "img/sounds/music_button1.png");
            }
        }

        if (event.which === 83) {
            if (global.toggleSoundsOff) {
                global.soundsOn = false;
                global.toggleSoundsOff = false;
                $('#soundsButton').attr('src', "img/sounds/sounds_button2.png");
            } else {
                global.soundsOn = true;
                global.toggleSoundsOff = true;
                $('#soundsButton').attr('src', "img/sounds/sounds_button1.png");
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

    $('#restart').on('click', function() {
        location.reload();
    });

    $('#start').on('click', function() {
        if (!global.start) {
            startGame();
            global.start = true;
            var el = document.getElementsByTagName("html")[0];
            el.addEventListener("touchstart", handleTouch, false);
        }
    });

    $('#music').on('click', function() {
        if (global.toggleMusicOff) {
            backMusic.pause();
            global.toggleMusicOff = false;
            $('#musicButton').attr('src', "img/sounds/music_button2.png");
        } else {
            backMusic.play();
            global.toggleMusicOff = true;
            $('#musicButton').attr('src', "img/sounds/music_button1.png");
        }
    });

    $('#sounds').on('click', function() {
        if (global.toggleSoundsOff) {
            global.soundsOn = false;
            global.toggleSoundsOff = false;
            $('#soundsButton').attr('src', "img/sounds/sounds_button2.png");
        } else {
            global.soundsOn = true;
            global.toggleSoundsOff = true;
            $('#soundsButton').attr('src', "img/sounds/sounds_button1.png");
        }
    });

    $('#restartButton').hover(function() {
        $(this).attr('src', 'img/restart/restart_button1.png');
    },
    function () {
        $(this).attr('src', 'img/restart/restart_button2.png');
    });
    
}

$(main);

