var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene, sunSphere;

var createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 6, Math.PI / 2.1, 30, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 30;
    camera.checkCollisions = true;
    camera.inputs.attached.pointers.buttons = [0];

    // ЗОРЯНЕ НЕБО
    BABYLON.SceneLoader.ImportMesh("", "../models/", "backgroundspace3.glb", scene, function (meshes) {
        var backgroundspace = meshes[0];
        backgroundspace.position = new BABYLON.Vector3(0, 0, 0);
        backgroundspace.scaling = new BABYLON.Vector3(300, 300, 300);
        var material = new BABYLON.StandardMaterial("backgroundMaterial", scene);
        material.emissiveTexture = new BABYLON.Texture("", scene);
        backgroundspace.material = material;
    });

    // Додавання сонця - сфера з текстурою
    var sunMaterial = new BABYLON.StandardMaterial("sunMaterial", scene);
    sunMaterial.diffuseTexture = new BABYLON.Texture("../textures/suntexture.jpg", scene);
    sunMaterial.emissiveTexture = new BABYLON.Texture("../textures/suntexture.jpg", scene);

    sunSphere = BABYLON.MeshBuilder.CreateSphere("sunSphere", { diameter: 14 }, scene);
    sunSphere.material = sunMaterial;

    // Анімація обертання сонця
    var rotateSunAnimation = new BABYLON.Animation(
        "sunRotation",
        "rotation.y",
        10,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var rotationKeys = [];
    rotationKeys.push({ frame: 0, value: 0 });
    rotationKeys.push({ frame: 100, value: 2 * Math.PI });
    rotateSunAnimation.setKeys(rotationKeys);
    sunSphere.animations = [rotateSunAnimation];
    scene.beginAnimation(sunSphere, 0, 100, true);

    // Світло
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), scene);
    light.intensity = 0.1;

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
