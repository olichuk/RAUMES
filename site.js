var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 9, Math.PI / 4, 35, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 35;
    camera.checkCollisions = true;
    camera.inputs.attached.pointers.buttons = [0];
    
    

    // Завантаження сонця
    BABYLON.SceneLoader.ImportMesh("", "models/", "sun3d.glb", scene, function (meshes) {
        var sun = meshes[0];
        sun.position = new BABYLON.Vector3(0, 0, 0);
    });

    // Завантаження та розміщення Меркурія (замість "ModelMercury.glb" вкажіть шлях до вашої моделі)
    BABYLON.SceneLoader.ImportMesh("", "models/", "ModelMercury.glb", scene, function (meshes) {
        var mercury = meshes[0];
         mercury.position = new BABYLON.Vector3(7, 0, 0);
        // Тут можна встановити відстань та інші параметри для Меркурія
    });

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
