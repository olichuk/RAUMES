var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene, sun, mercury, venus, mars;

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
    BABYLON.SceneLoader.ImportMesh("", "models/", "sun2.glb", scene, function (meshes) {
        sun = meshes[0];
        sun.position = new BABYLON.Vector3(0, 0, 0);
        sun.scaling = new BABYLON.Vector3(7, 7, 7);
        //addClickEvent(sun, scene, camera, new BABYLON.Vector3(0, 0, 0));
    });

                                //ВЕНЕРА!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "venus2.gltf", scene, function (meshes) {
        venus = meshes[0];
        venus.position = new BABYLON.Vector3(25, 0, 0);
        venus.scaling = new BABYLON.Vector3(1, 1, 1);
        var material = new BABYLON.StandardMaterial("material", scene);
        material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        venus.material = material;
    });

                                //МЕРКУРІЙ!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "mercury2.glb", scene, function (meshes) {
        mercury = meshes[0];
        mercury.position = new BABYLON.Vector3(15, 0, 0);
        mercury.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        //addClickEvent(mercury, scene, camera, mercury.position);

                                //МАРС!!!
    BABYLON.SceneLoader.ImportMesh("", "models/", "mars.glb", scene, function (meshes) {
        mars = meshes[0];
        mars.position = new BABYLON.Vector3(35, 0, 0);
        mars.scaling = new BABYLON.Vector3(1, 1, 1);
    });    
                                    
// Додати анімацію обертання планети
        var mercuryRotationAnimation = new BABYLON.Animation(
        "mercuryRotation",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );                             
        var mercuryRotationKeys = [];
        mercuryRotationKeys.push({ frame: 0, value: 0 });
        mercuryRotationKeys.push({ frame: 100, value: 2 * Math.PI });
        mercuryRotationAnimation.setKeys(mercuryRotationKeys);
        mercury.animations = [mercuryRotationAnimation];
        scene.beginAnimation(mercury, 0, 100, true); // Почати анімацію
    });

                                //СВІТЛО!!!
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), scene);
    light.intensity = 0.25;

    var directionalLight = new BABYLON.DirectionalLight("directionalLight", new BABYLON.Vector3(0, -1, 0), scene);
    directionalLight.intensity = 1;


    return scene;
};
                                //НЕРОБОЧА ФІГНЯ!!!
function addClickEvent(mesh, scene, camera, target) {
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function () {
            camera.target = target;
        }
    ));
}

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
