var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    BABYLON.SceneLoader.ImportMesh("", "../models/", "backgroundspace3.glb", scene, function (meshes) {
        var backgroundspace = meshes[0];
        backgroundspace.position = new BABYLON.Vector3(0, 0, 0);
        backgroundspace.scaling = new BABYLON.Vector3(1000, 1000, 1000);
        var material = new BABYLON.StandardMaterial("backgroundMaterial", scene);
        material.emissiveTexture = new BABYLON.Texture("", scene);
        backgroundspace.material = material;
    });

};

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
