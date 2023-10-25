var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene, sun, mercury, venus, mars, moon, neptune, pluto, earth;

var createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 6, Math.PI / 2.1, 150, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 200;
    camera.checkCollisions = true;
    camera.inputs.attached.pointers.buttons = [0];
                                    //ЗОРЯНЕ НЕБО!!!
      BABYLON.SceneLoader.ImportMesh("", "models/", "backgroundspace3.glb", scene, function (meshes) {
        var backgroundspace = meshes[0];
        // Розміщення фонової моделі 
        backgroundspace.position = new BABYLON.Vector3(0, 0, 0);
        // Шкала розміру
        backgroundspace.scaling = new BABYLON.Vector3(1000, 1000, 1000);
        //Сюди текстури НЕ ЧІПАТИ!
        var material = new BABYLON.StandardMaterial("backgroundMaterial", scene);
        material.emissiveTexture = new BABYLON.Texture("", scene);
        backgroundspace.material = material;
    });

                                //СОНЦЕ!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "sun.glb", scene, function (meshes) {
        sun = meshes[0];
        sun.name = "sun";
        sun.position = new BABYLON.Vector3(0, 0, 0);
        sun.scaling = new BABYLON.Vector3(7, 7, 7);
        createPlanetRotationAnimation(sun, 30);
        //addClickEvent(sun, scene, camera, new BABYLON.Vector3(0, 0, 0));
    });

                                //ВЕНЕРА!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "venus.glb", scene, function (meshes) {
        venus = meshes[0];
        venus.name = "venus";
        venus.position = new BABYLON.Vector3(20, 0, 0);
        venus.scaling = new BABYLON.Vector3(1, 1, 1);
        createPlanetRotationAnimation(venus, 40);
    });

                                //МЕРКУРІЙ!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "mercury.glb", scene, function (meshes) {
        mercury = meshes[0];
        mercury.name = "mercury";
        mercury.position = new BABYLON.Vector3(10, 0, 0);
        mercury.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        createPlanetRotationAnimation(mercury, 50);
        //addClickEvent(mercury, scene, camera, mercury.position);
    });

                                //МАРС!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "mars.glb", scene, function (meshes) {
        mars = meshes[0];
        mars.name = "mars";
        mars.position = new BABYLON.Vector3(35, 0, 0);
        mars.scaling = new BABYLON.Vector3(1, 1, 1);
        createPlanetRotationAnimation(mars, 35);
    });    

                                //МІСЯЦЬ!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "Moon.gltf", scene, function (meshes) {
        moon = meshes[0];
        moon.name = "moon";
        moon.position = new BABYLON.Vector3(40, 0, 0);
        moon.scaling = new BABYLON.Vector3(1, 1, 1);
        createPlanetRotationAnimation(moon, 25);
    });

                                //НЕПТУН!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "neptune.glb", scene, function (meshes) {
        neptune = meshes[0];
        neptune.name = "neptune";
        neptune.position = new BABYLON.Vector3(100, 0, 0);
        neptune.scaling = new BABYLON.Vector3(1, 1, 1);
        createPlanetRotationAnimation(neptune, 25);
    });

                                //ПЛУТОН!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "pluto.glb", scene, function (meshes) {
        pluto = meshes[0];
        pluto.name = "pluto";
        pluto.position = new BABYLON.Vector3(120, 0, 0);
        pluto.scaling = new BABYLON.Vector3(1, 1, 1);
        createPlanetRotationAnimation(pluto, 25);
    });


    BABYLON.SceneLoader.ImportMesh("", "models/", "earth.glb", scene, function (meshes) {
        earth = meshes[0];
        earth.name = "earth";
        earth.position = new BABYLON.Vector3(27, 0, 0);
        earth.scaling = new BABYLON.Vector3(1, 1, 1);
        createPlanetRotationAnimation(earth, 25);
    });


        // Додати анімацію обертання планет
        function createPlanetRotationAnimation(planet, speed) {
            var rotationAnimation = new BABYLON.Animation(
                planet.name + "Rotation",
                "rotation.y",
                speed,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
            );
    
            var rotationKeys = [];
            rotationKeys.push({ frame: 0, value: 0 });
            rotationKeys.push({ frame: 100, value: 2 * Math.PI });
            rotationAnimation.setKeys(rotationKeys);
            planet.animations = [rotationAnimation];
            scene.beginAnimation(planet, 0, 100, true); // Почати анімацію
        }

        

                                //СВІТЛО!!!
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), scene);
    light.intensity = 0.25;

    return scene;
};
//                                 //НЕРОБОЧА ФІГНЯ!!!
// function addClickEvent(mesh, scene, camera, target) {
//     mesh.actionManager = new BABYLON.ActionManager(scene);
//     mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
//         BABYLON.ActionManager.OnPickTrigger,
//         function () {
//             camera.target = target;
//         }
//     ));
// }

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
