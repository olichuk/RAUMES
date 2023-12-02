var scene, moon;

function animateMoonRotationAroundEarth(moon, earth) {
    var distanceFromEarth = 15;

    var rotateMoonAroundEarthAnimation = new BABYLON.Animation(
        moon.name + "AroundEarthRotation",
        "rotation.y",
        0.05, // Швидкість обертання Місяця навколо Землі
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateMoonAroundEarthAnimation.setKeys(rotationKeys);
    moon.animations = [rotateMoonAroundEarthAnimation];
    //scene.beginAnimation(moon, 0, 100, true);

    scene.onBeforeRenderObservable.add(function() {
        var angle = moon.rotation.y;
        var xOffset = distanceFromEarth * Math.sin(angle);
        var zOffset = distanceFromEarth * Math.cos(angle);
        moon.position.x = earth.position.x + xOffset;
        moon.position.z = earth.position.z + zOffset;
    });
}

animateMoonRotationAroundEarth(moon, earth);