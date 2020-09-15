"use strict";



var setup = function () {

    //setPlaygroundWidth(1000);
    createGroupInPlayground("group");
    createSpriteInGroup("group", "background", newGQAnimation("img/background.png"), 1862, 480);



    createSpriteInGroup("group", "sky", newGQAnimation("img/sky.png"), 1862, 960);
    spriteSetY("sky", -960);



    createTextSpriteInGroup("group", "acceleration", 150, 20, 165, 10);
    sprite("acceleration").css("color", "rgb(0, 0, 0)");
    sprite("acceleration").css("background-color", "rgba(255,255,255,255)");
    sprite("acceleration").html("<b>Thrust: </b>");

    createTextSpriteInGroup("group", "mass", 150, 20, 5, 10);
    sprite("mass").css("color", "rgb(0, 0, 0)");
    sprite("mass").css("background-color", "rgba(255,255,255,255)");
    sprite("mass").html("<b>Mass: </b>");

    createTextSpriteInGroup("group", "angle", 150, 20, 325, 10);
    sprite("angle").css("color", "rgb(0, 0, 0)");
    sprite("angle").css("background-color", "rgba(255,255,255,255)");
    sprite("angle").html("<b>Angle of Attack: </b>");

    createTextSpriteInGroup("group", "area", 150, 40, 485, 10);
    sprite("area").css("color", "rgb(0, 0, 0)");
    sprite("area").css("background-color", "rgba(255,255,255,255)");
    sprite("area").html("<b>Air Density: </b>");

    createTextSpriteInGroup("group", "liftForce", 150, 20, 0, 0);
    sprite("liftForce").css("color", "rgb(0, 0, 0)");
    sprite("liftForce").css("font-size", "12pt");
    sprite("liftForce").css("background-color", "rgba(255,255,255,255)");
    sprite("liftForce").html("<b>Force of Lift: 0</b>");

    createTextSpriteInGroup("group", "dragForce", 150, 20, 0, 0);
    sprite("dragForce").css("color", "rgb(0, 0, 0)");
    sprite("dragForce").css("font-size", "12pt");
    sprite("dragForce").css("background-color", "rgba(255,255,255,255)");
    sprite("dragForce").html("<b>Force of Drag: 0</b>");

    createTextSpriteInGroup("group", "weight", 150, 20, 0, 0);
    sprite("weight").css("color", "rgb(0, 0, 0)");
    sprite("weight").css("font-size", "12pt");
    sprite("weight").css("background-color", "rgba(255,255,255,255)");
    sprite("weight").html("<b>Weight: 0</b>");

    createTextSpriteInGroup("group", "thrust", 150, 20, 0, 0);
    sprite("thrust").css("color", "rgb(0, 0, 0)");
    sprite("thrust").css("font-size", "12pt");
    sprite("thrust").css("background-color", "rgba(255,255,255,255)");
    sprite("thrust").html("<b>> 0</b>");

    createSpriteInGroup("group", "startButton", newGQAnimation("img/StartButton.png"), 100, 100);
    spriteSetX("startButton", 270);
    spriteSetY("startButton", 190);

    createSpriteInGroup("group", "pause", newGQAnimation("img/pause.png"), 100, 100);
    spriteSetX("pause", -500);
    spriteSetY("pause", 150);

    createSpriteInGroup("group", planeInfo["id"], newGQAnimation("img/plane.png"), 209, 67);

    spriteSetX(planeInfo["id"], planeInfo["xpos"]);
    spriteSetY(planeInfo["id"], planeInfo["ypos"]);

};

var backgroundInfo = {
    "id": "background",
    "xpos": 0,
    "ypos": 0,
    "xspeed": 0,
    "yspeed": 0
};

var planeInfo = {
    "id": "plane",
    "xspeed": 0,
    "yspeed": 0,
    "ypos": 375,
    "xpos": 10,
    "acceleration": 0,
    "xnAcceleration": 0,
    "xAcceleration": 0,
    "thrust": 8000
};

var planeX = 10;

var conditions = {
    "density": 1.225,
    "coefficient": 3.14,
    "angleOfAttack": 1,
    "area": 10,
    "airspeed": 0,
    "gravity": 9.81,
    "mass": 9000
};
var speed = 0;
var forceOfLift;
var forceOfGravity;

var t = true;

var getCoefficient = function (angle) {

    if (angle < 50) {
        return (0.1 * angle) + 0.25;
    } else if (angle > 50 && angle < 310) {
        return 0;
    } else {
        angle = 0 - (360 - angle);
        return (0.1 * angle) + 0.25;
    }

};


var coefficient;
var doOnce = false;
var calculateLift = function () {



    if (t) {
        //consolePrint("Old Lift");

        if (!up) {
            speed += planeInfo["xAcceleration"];
            coefficient = getCoefficient(conditions["angleOfAttack"]);
        } else {
            consolePrint("test");
            if (!doOnce) {
                calculateCoefficient();
                doOnce = true;
            }

        }

        forceOfLift = coefficient * (conditions["density"] * Math.pow(planeInfo["xspeed"], 2) * 0.50) * conditions["area"];
        //consolePrint(forceOfLift + ", " + speed);
        //consolePrint(forceOfLift);
        forceOfGravity = conditions["mass"] * 9.81;

        //consolePrint(forceOfLift + ", " + forceOfGravity + ", " + planeInfo["acceleration"] + ", " + planeInfo["ypos"]);

        if (forceOfGravity > forceOfLift && planeInfo["ypos"] == 375) {

            planeInfo["ypos"] = 375;
            planeInfo["acceleration"] = 0;

        } else {
            planeInfo["acceleration"] = (forceOfLift - forceOfGravity) / conditions["mass"];
            planeInfo["yspeed"] += (planeInfo["acceleration"] / 33);
        }


//        if (planeInfo["ypos"] > 375) {
//
//            planeInfo["acceleration"] = (forceOfLift - forceOfGravity) / conditions["mass"];
//            planeInfo["yspeed"] += (planeInfo["acceleration"] / 33);
//        } else if (planeInfo["ypos"] < 375) {
//            consolePrint("YAAAAAAAAY");
//            planeInfo["ypos"] = 375;
//            planeInfo["acceleration"] = 0;
//        } else if (planeInfo["ypos"] == 375) {
//            //planeInfo["acceleration"] = (forceOfLift - forceOfGravity) / conditions["mass"];
//            //planeInfo["yspeed"] += (planeInfo["acceleration"] / 33);
//        }


//        if (forceOfLift > forceOfGravity) {
//            planeInfo["acceleration"] = ((forceOfLift - forceOfGravity) / conditions["mass"]);
//            planeInfo["yspeed"] += (netAcceleration / 20);
//            //consolePrint(1);
//        } else if (planeInfo["ypos"] < 375) {
//
//            planeInfo["acceleration"] = ((forceOfLift - forceOfGravity) / conditions["mass"]);
//            //planeInfo["yspeed"];
//            planeInfo["yspeed"] += (netAcceleration / 20);
//            //consolePrint(planeInfo["yspeed"]);
//        }
//
//        if (planeInfo["ypos"] > 375) {
//            planeInfo["acceleration"] = 0;
//            planeInfo["ypos"] = 375;
//        }

    } else {
        forceOfLift = conditions["mass"] * 9.81;
    }




};

var calculateCoefficient = function () {

    coefficient = (2 * forceOfGravity) / (conditions["area"] * conditions["density"] * (planeInfo["xspeed"] * planeInfo["xspeed"]));


};


var forceOfDrag;
var cSArea = 158.3;
var calculateDrag = function () {

    forceOfDrag = dragCoefficient * conditions["density"] * 0.5 * (planeInfo["xspeed"] * planeInfo["xspeed"]) * cSArea;
    //consolePrint(forceOfDrag);
    planeInfo["xnAcceleration"] = forceOfDrag / conditions["mass"];
    //consolePrint(forceOfDrag + ", " + conditions["mass"]);


};
var dragCoefficient = 0.24;
//var calcDragCoefficient = function (){
//    
//    dragCoefficient = (planeInfo["coefficient"] * planeInfo["coefficient"]) / (Math.PI * 0.7 * ((60 * 60) / planeInfo["area"]));
//    consolePrint(dragCoefficient);
//    return dragCoefficient;
//    
//};

var lift;
var calculateNewLift = function () {
    constSpeed += (planeInfo["acceleration"] / 20);

    forceOfLift = coefficient * (0.5 * (constSpeed * constSpeed) * conditions["density"] * conditions["area"]);

    forceOfGravity = conditions["mass"] * 9.81;

    //consolePrint((forceOfLift - forceOfGravity) / conditions["mass"]);


    planeInfo["acceleration"] = ((forceOfLift - forceOfGravity) / conditions["mass"]);
    planeInfo["yspeed"] += (planeInfo["acceleration"] / 20);

    //consolePrint(planeInfo["acceleration"]);

};

var startNow = false;
var netAcceleration;

var skyXpos = 0;
var skyXspeed = 0;
var skyYpos = -960;
var constSpeed;

var paused = false;

var begin;

var newAcc;

var changez = true;

var up = false;
var draw = function () {

    consolePrint(coefficient);

    //consolePrint(planeInfo["ypos"]);

    planeInfo["xAcceleration"] = planeInfo["thrust"] / conditions["mass"];

    //consolePrint(coefficient);


    spriteSetX("liftForce", planeInfo["xpos"] + 40);
    spriteSetY("liftForce", planeInfo["ypos"]);
    sprite("liftForce").html("<b>^ </b>" + parseInt(forceOfLift) + "N");

    spriteSetX("dragForce", planeInfo["xpos"] - 150);
    spriteSetY("dragForce", planeInfo["ypos"] + 30);
    sprite("dragForce").html("<b>< </b>" + Math.round(forceOfDrag) + "N");

    spriteSetX("weight", planeInfo["xpos"] + 40);
    spriteSetY("weight", planeInfo["ypos"] + 75);
    sprite("weight").html("<b>Weight: </b>" + Math.round((conditions["mass"] * 9.81)) + "N");

    spriteSetX("thrust", planeInfo["xpos"] + 200);
    spriteSetY("thrust", planeInfo["ypos"] + 30);
    sprite("thrust").html("<b>> </b>" + parseInt((conditions["mass"] * planeInfo["xAcceleration"])) + "N");

    editAcceleration();
    editMass();
    editAOA();
    editArea();

    calculateDrag();

    spriteRotate(planeInfo["id"], 0 - conditions["angleOfAttack"]);

    start();

    if (!paused) {

        //consolePrint(planeInfo["xAcceleration"] + ", " + planeInfo["xnAcceleration"]);

        if (begin || startNow) {

            //consolePrint(constSpeed);


            //consolePrint(planeInfo["ypos"]);

            //calculateLift();

            //consolePrint(skyXpos + ", " + skyYpos);


            planeInfo["xpos"] = planeInfo["xpos"] + planeInfo["xspeed"] / 20;
            //consolePrint(planeInfo["xpos"] + ", " + planeInfo["xspeed"]);
            planeInfo["ypos"] -= (planeInfo["yspeed"] / 20);





            if (planeInfo["xpos"] >= 600 - 316) {
                planeInfo["xpos"] = 600 - 316;
                backgroundInfo["xspeed"] = 0 - planeInfo["xspeed"];
                skyXspeed = 0 - planeInfo["xspeed"];
            }

            planeInfo["xspeed"] += (netAcceleration / 33);

            //consolePrint(netAcceleration + ", " + planeInfo["xspeed"]);



            // planeInfo["yspeed"] += (planeInfo["acceleration"] / 20);


            //consolePrint(planeInfo["acceleration"]);

            if (backgroundInfo["xpos"] <= -1220) {
                backgroundInfo["xpos"] = 0;

            }

            if (skyXpos <= -640) {
                skyXpos = 0;
            }

            //consolePrint(skyYpos);

            if (planeInfo["ypos"] <= 0 && skyYpos >= -500 && !up) {
                //consolePrint("TEST");
                calculateCoefficient();
                newAcc = planeInfo["acceleration"];
                netAcceleration = 0;
                //planeInfo["acceleration"] = 0;
                //t = false;
                planeInfo["yspeed"] = 0;
                planeInfo["ypos"] = 100;
                backgroundInfo["yspeed"] = 0;
                constSpeed = planeInfo["xspeed"];
                changez = false;
                up = true;

            } else {
                //coefficient = getCoefficient(conditions["angleOfAttack"]);
                if (planeInfo["xnAcceleration"] > planeInfo["xAcceleration"]) {
                    netAcceleration = planeInfo["xAcceleration"] - planeInfo["xnAcceleration"];
                } else {
                    netAcceleration = planeInfo["xAcceleration"] - planeInfo["xnAcceleration"];
                }
            }

            if (up) {
                //calculateNewLift();
                backgroundInfo["ypos"] = skyYpos + 960;
            } else {
                backgroundInfo["ypos"] -= (backgroundInfo["yspeed"] / 20);

            }

            calculateLift();

            //consolePrint(planeInfo["xspeed"]);

            backgroundInfo["xpos"] += (backgroundInfo["xspeed"] / 20);


            skyXpos += (skyXspeed / 20);

            if (planeInfo["ypos"] <= 0) {
                backgroundInfo["yspeed"] = -1 * planeInfo["yspeed"];
                planeInfo["ypos"] = 0;

            } else if (planeInfo["ypos"] >= 375 && backgroundInfo["ypos"] >= 0) {
                //consolePrint("Yes");
                backgroundInfo["yspeed"] = planeInfo["yspeed"] * -1;
                planeInfo["ypos"] = 375;


            } else if (backgroundInfo["ypos"] < 0) {
                backgroundInfo["ypos"];
                backgroundInfo["yspeed"] = 0;
                document.location.reload();
            }

            //consolePrint(backgroundInfo["ypos"]);

            skyYpos -= (backgroundInfo["yspeed"] / 20);

            if (skyYpos >= 0) {
                skyYpos = -480;
            }

            //consolePrint(backgroundInfo["ypos"]);



            //consolePrint(planeInfo["ypos"]);

            spriteSetX("sky", skyXpos);
            spriteSetY("sky", skyYpos);

            spriteSetY(planeInfo["id"], planeInfo["ypos"]);
            spriteSetX(planeInfo["id"], planeInfo["xpos"]);

            spriteSetY(backgroundInfo["id"], backgroundInfo["ypos"]);
            spriteSetX(backgroundInfo["id"], backgroundInfo["xpos"]);

            spriteSetX("startButton", -500);

            startNow = true;

            pause();


        } else {


            if (planeInfo["xnAcceleration"] > planeInfo["xAcceleration"]) {
                netAcceleration = planeInfo["xAcceleration"] - planeInfo["xnAcceleration"];
            } else {
                netAcceleration = planeInfo["xAcceleration"] - planeInfo["xnAcceleration"];
            }
        }

    } else {
        editAcceleration();
        editMass();
        editAOA();
        editArea();
    }
};
var pause = function () {
    if (getMouseX() > 0 && getMouseX() < 100 && getMouseY() > 150 && getMouseY() < 250 && getMouseButton1()) {
        paused = true;
        spriteSetX("startButton", 270);
        spriteSetX("pause", -500);
    } else {

    }
};

var start = function () {

    if (getMouseX() > 270 && getMouseX() < 370 && getMouseY() > 190 && getMouseY() < 290 && getMouseButton1()) {

        spriteSetX("pause", 0);
        begin = true;
        paused = false;
    } else {
        begin = false;
    }
};

var string = "0";
var pushButton = true;
var time = currentDate();
var num;
var backButton3 = true;
var editAcceleration = function () {

    if (getMouseX() > 165 && getMouseX() < 315 && getMouseY() > 10 && getMouseY() < 30) {

        for (var i = 48; i < 200; i++) {
            if (getKeyState(i) && pushButton) {
                num = i;
                pushButton = false;

                if (i != 190) {
                    string += (i - 48);
                } else {
                    string += ".";
                }


                sprite("acceleration").html("<w>Thrust: </w>" + string + "kN");
            }

        }

        planeInfo["thrust"] = parseFloat(string) * 1000;
        //consolePrint("Speed is now: " + planeInfo["xspeed"]);

        if (getKeyState(8) && backButton3) {
            string = "0";
            //conditions["xspeed"] = "";
            sprite("acceleration").html("<w>Thrust: </w>" + string + "kN");
            backButton3 = false;
        }

        if (!getKeyState(8)) {
            backButton3 = true;
        }

        if (!getKeyState(num)) {
            pushButton = true;
        }


    }
};

var massString = "0";
var massButton = true;
var massNum;
var backButton2 = true;
var editMass = function () {

    if (getMouseX() > 5 && getMouseX() < 155 && getMouseY() > 10 && getMouseY() < 30) {

        for (var i = 48; i < 200; i++) {
            if (getKeyState(i) && massButton) {
                massNum = i;
                massButton = false;

                if (i == 190) {
                    massString += ".";
                } else {
                    massString += (i - 48);
                }

                sprite("mass").html("<w>Mass: </w>" + massString.substring(1) + "kg");

            }
        }

        if (massString == "0") {
            conditions["mass"] = 9000;
        } else {
            if (parseFloat(massString) > 1000) {
                conditions["mass"] = parseFloat(massString);
            } else {
                conditions["mass"] = 1000;
            }
        }


        if (getKeyState(8) && backButton2) {
            massString = "0";
            //conditions["mass"] = "";
            sprite("mass").html("<w>Mass: </w>" + massString + "kg");
            backButton2 = false;
        }

        if (!getKeyState(8)) {
            backButton2 = true;
        }

        if (!getKeyState(massNum)) {
            massButton = true;
        }


    }
};

var angleString = "0";
var angleButton = true;
var AOANum;
var backButton1 = true;
var editAOA = function () {

    if (changez) {

        if (getMouseX() > 325 && getMouseX() < 475 && getMouseY() > 10 && getMouseY() < 30) {

            for (var i = 48; i < 200; i++) {
                if (getKeyState(i) && angleButton) {
                    AOANum = i;
                    angleButton = false;

                    if (i != 190) {
                        angleString += (i - 48);
                    } else {
                        angleString += ".";
                    }

                    sprite("angle").html("<w>Angle of Attack: </w>" + angleString);
                }
            }

            conditions["angleOfAttack"] = parseFloat(angleString);


            if (getKeyState(8) && backButton1) {
                angleString = "0";
                sprite("angle").html("<w>Angle of Attack: </w>" + angleString);
                backButton1 = false;
            }

            if (!getKeyState(8)) {
                backButton1 = true;
            }

            if (!getKeyState(AOANum)) {
                angleButton = true;
            }


        }
    } else {
        
    }
};

var areaString = "0";
var areaButton = true;
var areaNum;
var backButton = true;
var editArea = function () {

    if (getMouseX() > 485 && getMouseX() < 635 && getMouseY() > 10 && getMouseY() < 30) {

        for (var i = 48; i < 200; i++) {
            if (getKeyState(i) && areaButton) {
                areaNum = i;
                areaButton = false;

                if (i != 190) {
                    areaString += (i - 48);
                } else {
                    areaString += ".";
                }

                sprite("area").html("<w>Air Density: </w>" + areaString + "kg/m^3");
            }
        }

        if (areaString == "0") {
            conditions["density"] = 1;
        } else {
            conditions["density"] = parseFloat(areaString);
        }


        if (getKeyState(8) && backButton) {
            //conditions["area"] = "";
            areaString = "0";
            sprite("area").html("<w>Air Density: </w>" + conditions["area"] + "kg/m^3");
            backButton = false;
        }

        if (!getKeyState(8)) {
            backButton = true;
        }

        if (!getKeyState(areaNum)) {
            areaButton = true;
        }


    }
};

var removeMultiples = function (string) {

    var newString = "";

    for (var i = 0; i < string.length; i++) {
        if (string.substring(i) != string.substring(i - 1)) {
            newString += string.substring(i);
        }
    }

    return newString;

};