var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene, venusSphere;


var createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0); 

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 6, Math.PI / 2.1, 30, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 3.5;
    camera.upperRadiusLimit = 3.5;
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

    

BABYLON.SceneLoader.ImportMesh("", "../models/", "mars.glb", scene, function (meshes) {
    venusSphere = meshes[0];
    venusSphere.position = new BABYLON.Vector3(0, 0, 0);
    
});

document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.wrapper a');
    var textToShowM = document.getElementById('textToShowM');
    var textToShowD = document.getElementById('textToShowD');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Remove 'visible-text' class from all links
            links.forEach(function(otherLink) {
                otherLink.classList.remove('clicked');
            });

            // Hide all text elements
            textToShowM.classList.remove('visible-text');
            textToShowD.classList.remove('visible-text');

            // Toggle 'visible-text' class for the clicked link
            if (link.id === 'motion') {
                textToShowM.classList.toggle('visible-text');
            } else if (link.id === 'description') {
                textToShowD.classList.toggle('visible-text');
            }

            link.classList.toggle('clicked');
        });
    });
});

    // Світло
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), scene);
    light.intensity = 0.2;

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
   
});

window.addEventListener("resize", function () {
    engine.resize();
});
