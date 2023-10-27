function createPlanet(name, diameter, position, texturePath) {
    var planetMaterial = new BABYLON.StandardMaterial(name + "Material", scene);
    planetMaterial.diffuseTexture = new BABYLON.Texture(texturePath, scene);
    planetMaterial.emissiveTexture = new BABYLON.Texture(texturePath, scene);

    var planet = BABYLON.MeshBuilder.CreateSphere(name, { diameter: diameter }, scene);
    planet.position = position;
    planet.material = planetMaterial;

    return planet;
}

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
        400,
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
        250,
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
        350,
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
        2730,
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
        90,
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
        80,
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
        300,
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

sun = createPlanet("sun", 3, new BABYLON.Vector3(0, 0, 0), "../textures/sun.jpg");
mercury = createPlanet("mercury", 1, new BABYLON.Vector3(6, 0, 0), "../textures/mercury.jpg");
venus = createPlanet("venus", 4, new BABYLON.Vector3(10, 0, 0), "../textures/venus.jpg");
mars = createPlanet("mars", 2, new BABYLON.Vector3(14, 0, 0), "../textures/mars.jpg");
moon = createPlanet("moon", 1, new BABYLON.Vector3(3, 0, 0), "../textures/moon.jpg");
neptune = createPlanet("neptune", 1, new BABYLON.Vector3(22, 0, 0), "../textures/neptune.jpg");
pluto = createPlanet("pluto", 1, new BABYLON.Vector3(26, 0, 0), "../textures/pluto.jpg");
earth = createPlanet("earth", 1, new BABYLON.Vector3(18, 0, 0), "../textures/earth.jpg");

animateEarthRotation(earth);
animateMoonRotation(moon);
animateNeptuneRotation(neptune);
animatePlutoRotation(pluto);
animateVenusRotation(venus);
animateMarsRotation(mars);
animateSunRotation(sun);
animateMercuryRotation(mercury);