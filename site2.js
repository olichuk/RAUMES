var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene, sun, mercury, venus, mars, moon, neptune, pluto, earth;

var initialCameraPosition = new BABYLON.Vector3(-Math.PI / 6, Math.PI / 2.1, 50);

var createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 6, Math.PI / 2.1, 50, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 200;
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

    // Функція для створення планети з текстурою та анімацією обертання
    function createPlanet(name, diameter, position, texturePath, rotationSpeed) {
        var planetMaterial = new BABYLON.StandardMaterial(name + "Material", scene);
        planetMaterial.diffuseTexture = new BABYLON.Texture(texturePath, scene);
        planetMaterial.emissiveTexture = new BABYLON.Texture(texturePath, scene);

        var planet = BABYLON.MeshBuilder.CreateSphere(name, { diameter: diameter }, scene);
        planet.position = position;
        planet.material = planetMaterial;

        var rotatePlanetAnimation = new BABYLON.Animation(
            name + "Rotation",
            "rotation.y",
            10,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        var rotationKeys = [];
        rotationKeys.push({ frame: 0, value: 0 });
        rotationKeys.push({ frame: 100, value: 2 * Math.PI });
        rotatePlanetAnimation.setKeys(rotationKeys);
        planet.animations = [rotatePlanetAnimation];
        scene.beginAnimation(planet, 0, 100, true);

        return planet;
    }

    // Створення планет та сонця
    sun = createPlanet("sun", 3, new BABYLON.Vector3(0, 0, 0), "../textures/sun.jpg", 0.1);
    mercury = createPlanet("mercury", 1, new BABYLON.Vector3(6, 0, 0), "../textures/mercury.jpg", 0.0002);
    venus = createPlanet("venus", 1, new BABYLON.Vector3(10, 0, 0), "../textures/venus.jpg", 0.015);
    mars = createPlanet("mars", 1, new BABYLON.Vector3(14, 0, 0), "../textures/mars.jpg", 0.01);
    moon = createPlanet("moon", 1, new BABYLON.Vector3(3, 0, 0), "../textures/moon.jpg", 0.03);
    neptune = createPlanet("neptune", 1, new BABYLON.Vector3(22, 0, 0), "../textures/neptune.jpg", 0.008);
    pluto = createPlanet("pluto", 1, new BABYLON.Vector3(26, 0, 0), "../textures/pluto.jpg", 0.007);
    earth = createPlanet("earth", 1, new BABYLON.Vector3(18, 0, 0), "../textures/earth.jpg", 0.018);

    function setPlanetClickListener(planet) {
        planet.actionManager = new BABYLON.ActionManager(scene);
        planet.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function (evt) {
                    // Наведення камери на натискану планету з плавним переходом
                    var pickedPlanet = evt.meshUnderPointer;
                    if (pickedPlanet && pickedPlanet.name !== "sun") {
                        var targetPosition = pickedPlanet.position.clone();
                        BABYLON.Animation.CreateAndStartAnimation(
                            "cameraAnimation",
                            scene.activeCamera,
                            "target",
                            30,
                            60,
                            scene.activeCamera.target.clone(),
                            targetPosition,
                            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                        );
                    }
                }
            )
        );
    }

    // Створення планет та сонця та додавання обробників подій
    setPlanetClickListener(sun);
    setPlanetClickListener(mercury);
    setPlanetClickListener(venus);
    setPlanetClickListener(mars);
    setPlanetClickListener(moon);
    setPlanetClickListener(neptune);
    setPlanetClickListener(pluto);
    setPlanetClickListener(earth);

    sun.actionManager = new BABYLON.ActionManager(scene);
sun.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function (evt) {
           
            BABYLON.Animation.CreateAndStartAnimation(
                "cameraAnimation",
                scene.activeCamera,
                "target",
                30,
                60,
                scene.activeCamera.target.clone(),
                new BABYLON.Vector3(0, 0, 0),  
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            );
            BABYLON.Animation.CreateAndStartAnimation(
                "cameraRotationAnimation",
                scene.activeCamera,
                "alpha",
                30,
                60,
                scene.activeCamera.alpha,
                initialCameraPosition.x, 
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            );
            BABYLON.Animation.CreateAndStartAnimation(
                "cameraBetaAnimation",
                scene.activeCamera,
                "beta",
                30,
                60,
                scene.activeCamera.beta,
                initialCameraPosition.y,  
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            );
            BABYLON.Animation.CreateAndStartAnimation(
                "cameraRadiusAnimation",
                scene.activeCamera,
                "radius",
                30,
                60,
                scene.activeCamera.radius,
                initialCameraPosition.z, 
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            );
        }
    )
);


    // Світло
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), scene);
    light.intensity = 0.25;

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
