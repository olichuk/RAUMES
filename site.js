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
        sun.position = new BABYLON.Vector3(0, 0, 0);
        sun.scaling = new BABYLON.Vector3(7, 7, 7);
    });

                                //ВЕНЕРА!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "venus.glb", scene, function (meshes) {
        venus = meshes[0];
        venus.position = new BABYLON.Vector3(20, 0, 0);
        venus.scaling = new BABYLON.Vector3(1, 1, 1);
    });

                                //МЕРКУРІЙ!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "mercury.glb", scene, function (meshes) {
        mercury = meshes[0];
        mercury.position = new BABYLON.Vector3(10, 0, 0);
        mercury.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

                                //МАРС!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "mars.glb", scene, function (meshes) {
        mars = meshes[0];
        mars.position = new BABYLON.Vector3(35, 0, 0);
        mars.scaling = new BABYLON.Vector3(1, 1, 1);
    });    

                                //МІСЯЦЬ!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "Moon.gltf", scene, function (meshes) {
        moon = meshes[0];
        moon.position = new BABYLON.Vector3(40, 0, 0);
        moon.scaling = new BABYLON.Vector3(1, 1, 1);
    });

                                //НЕПТУН!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "neptune.glb", scene, function (meshes) {
        neptune = meshes[0];
        neptune.position = new BABYLON.Vector3(100, 0, 0);
        neptune.scaling = new BABYLON.Vector3(1, 1, 1);
    });

                                //ПЛУТОН!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "pluto.glb", scene, function (meshes) {
        pluto = meshes[0];
        pluto.position = new BABYLON.Vector3(120, 0, 0);
        pluto.scaling = new BABYLON.Vector3(1, 1, 1);
    });


    BABYLON.SceneLoader.ImportMesh("", "models/", "earth.glb", scene, function (meshes) {
        earth = meshes[0];
        earth.position = new BABYLON.Vector3(27, 0, 0);
        earth.scaling = new BABYLON.Vector3(1, 1, 1);
    });

                                //СВІТЛО!!!
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), scene);
    light.intensity = 0.25;

    return scene;
};

scene.debugLayer.show();

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
