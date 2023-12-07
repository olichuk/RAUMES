var scene, sun, mercury, venus, mars, moon, neptune, pluto, earth, jupiter, saturn, uranus;

function animateSunRotation(sun) {
    var rotateSunAnimation = new BABYLON.Animation(
        sun.name + "Rotation",
        "rotation.y",
        1,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateSunAnimation.setKeys(rotationKeys);
    sun.animations = [rotateSunAnimation];
    scene.beginAnimation(sun, 0, 100, true);
}

function animateMercuryRotation(mercury) {
    var rotateMercuryAnimation = new BABYLON.Animation(
        mercury.name + "Rotation",
        "rotation.y",
        40,  //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateMercuryAnimation.setKeys(rotationKeys);
    mercury.animations = [rotateMercuryAnimation];
    scene.beginAnimation(mercury, 0, 100, true);
}

function animateVenusRotation(venus) {
    var rotateVenusAnimation = new BABYLON.Animation(
        venus.name + "Rotation",
        "rotation.y",
        35,  //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateVenusAnimation.setKeys(rotationKeys);
    venus.animations = [rotateVenusAnimation];
    scene.beginAnimation(venus, 0, 100, true);
}

function animateMarsRotation(mars) {
    var rotateMarsAnimation = new BABYLON.Animation(
        mars.name + "Rotation",
        "rotation.y",
        25,  //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateMarsAnimation.setKeys(rotationKeys);
    mars.animations = [rotateMarsAnimation];
    scene.beginAnimation(mars, 0, 100, true);
}

function animateMoonRotation(moon) {
    var rotateMoonAnimation = new BABYLON.Animation(
        moon.name + "Rotation",
        "rotation.y",
        10,  //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateMoonAnimation.setKeys(rotationKeys);
    moon.animations = [rotateMoonAnimation];
    scene.beginAnimation(moon, 0, 100, true);
}

function animateNeptuneRotation(neptune) {
    var rotateNeptuneAnimation = new BABYLON.Animation(
        neptune.name + "Rotation",
        "rotation.y",
        9,  //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateNeptuneAnimation.setKeys(rotationKeys);
    neptune.animations = [rotateNeptuneAnimation];
    scene.beginAnimation(neptune, 0, 100, true);
}

function animatePlutoRotation(pluto) {
    var rotatePlutoAnimation = new BABYLON.Animation(
        pluto.name + "Rotation",
        "rotation.y",
        8,  //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotatePlutoAnimation.setKeys(rotationKeys);
    pluto.animations = [rotatePlutoAnimation];
    scene.beginAnimation(pluto, 0, 100, true);
}

function animateEarthRotation(earth) {
    var rotateEarthAnimation = new BABYLON.Animation(
        earth.name + "Rotation",
        "rotation.y",
        30, //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateEarthAnimation.setKeys(rotationKeys);
    earth.animations = [rotateEarthAnimation];
    scene.beginAnimation(earth, 0, 100, true);
}

function animateJupiterRotation(jupiter) {
    var rotateJupiterAnimation = new BABYLON.Animation(
        jupiter.name + "Rotation",
        "rotation.y",
        30, //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateJupiterAnimation.setKeys(rotationKeys);
    jupiter.animations = [rotateJupiterAnimation];
    scene.beginAnimation(jupiter, 0, 100, true);
}

function animateSaturnRotation(saturn) {
    var rotateSaturnAnimation = new BABYLON.Animation(
        saturn.name + "Rotation",
        "rotation.y",
        20, //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateSaturnAnimation.setKeys(rotationKeys);
    saturn.animations = [rotateSaturnAnimation];
    scene.beginAnimation(saturn, 0, 100, true);
}

function animateUranusRotation(uranus) {
    var rotateUranusAnimation = new BABYLON.Animation(
        uranus.name + "Rotation",
        "rotation.y",
        30, //тут змінювати швидкість обертання
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateUranusAnimation.setKeys(rotationKeys);
    uranus.animations = [rotateUranusAnimation];
    scene.beginAnimation(saturn, 0, 100, true);
}

    animateEarthRotation(earth);
    animateMoonRotation(moon);
    animateNeptuneRotation(neptune);
    animatePlutoRotation(pluto);
    animateVenusRotation(venus);
    animateMarsRotation(mars);
    animateSunRotation(sun);
    animateMercuryRotation(mercury);
    animateJupiterRotation(jupiter);
    animateSaturnRotation(saturn);
    animateUranusRotation(uranus);