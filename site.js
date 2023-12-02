var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene, sun, mercury, venus, mars, moon, neptune, pluto, earth, jupiter, saturn;

var initialCameraPosition = new BABYLON.Vector3(-Math.PI / 6, Math.PI / 2.1, 50);

//Scene
var createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    //Scene camera
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 6, Math.PI / 3, 1000, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 45;
    camera.upperRadiusLimit = 1000;
    camera.checkCollisions = true;
    camera.inputs.attached.pointers.buttons = [0];

    //Background sphere(Star box sphere)
    BABYLON.SceneLoader.ImportMesh("", "../models/", "backgroundspace3.glb", scene, function (meshes) {
        var backgroundspace = meshes[0];
        backgroundspace.position = new BABYLON.Vector3(0, 0, 0);
        backgroundspace.scaling = new BABYLON.Vector3(1000, 1000, 1000);
        var material = new BABYLON.StandardMaterial("backgroundMaterial", scene);
        material.emissiveTexture = new BABYLON.Texture("", scene);
        backgroundspace.material = material;
    });

    //A function to create a planet with texture and rotation animation
    function createPlanet(name, diameter, position, texturePath) {
        var planetMaterial = new BABYLON.StandardMaterial(name + "Material", scene);
        planetMaterial.diffuseTexture = new BABYLON.Texture(texturePath, scene);
        planetMaterial.emissiveTexture = new BABYLON.Texture(texturePath, scene);
    
        var planet = BABYLON.MeshBuilder.CreateSphere(name, { diameter: diameter }, scene);
        planet.position = position;
        planet.material = planetMaterial;
    
        return planet;
    }

    sun = createPlanet("sun", 30, new BABYLON.Vector3(0, 0, 0), "../textures/sun.jpg");
    mercury = createPlanet("mercury", 3, new BABYLON.Vector3(40, 0, 0), "../textures/mercury.jpg");
    venus = createPlanet("venus", 9, new BABYLON.Vector3(90, 0, 0), "../textures/venus.jpg");
    earth = createPlanet("earth", 10, new BABYLON.Vector3(130, 0, 0), "../textures/earth.jpg");
    moon = createPlanet("moon", 2, new BABYLON.Vector3(140, 0, 0), "../textures/moon.jpg");
    mars = createPlanet("mars", 5, new BABYLON.Vector3(200, 0, 0), "../textures/mars.jpg");
    neptune = createPlanet("neptune", 14, new BABYLON.Vector3(300, 0, 0), "../textures/neptune.jpg");
    pluto = createPlanet("pluto", 4, new BABYLON.Vector3(380, 0, 0), "../textures/pluto.jpg");
    jupiter = createPlanet("jupiter", 4, new BABYLON.Vector3(400, 0, 0), "../textures/jupiter.jpg");
    saturn = createPlanet("saturn", 4, new BABYLON.Vector3(420, 0, 0), "../textures/saturn.jpg");


    // Light for scene
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
