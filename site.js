var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene, sun, mercury, venus, mars, moon, neptune, pluto, earth, jupiter, saturn, uranus;

var initialCameraPosition = new BABYLON.Vector3(-Math.PI / 6, Math.PI / 2.1, 50);

var isPlanetClickEnabled = true;

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
    camera.inputs.attached.pointers.buttons = [0, 2];

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

    //Function of moon rotating around earth
    function animateMoonRotationAroundEarth(moon, earth) {
        var distanceFromEarth = 25;
    
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
        scene.beginAnimation(moon, 0, 100, true);
    
        scene.onBeforeRenderObservable.add(function() {
            var angle = moon.rotation.y;
            var xOffset = distanceFromEarth * Math.sin(angle);
            var zOffset = distanceFromEarth * Math.cos(angle);
            moon.position.x = earth.position.x + xOffset;
            moon.position.z = earth.position.z + zOffset;
        });
    }

    //Variables for a function
    sun = createPlanet("sun", 145, new BABYLON.Vector3(0, 0, 0), "../textures/sun.jpg");
    mercury = createPlanet("mercury", 10, new BABYLON.Vector3(117, 0, 0), "../textures/mercury.jpg");
    venus = createPlanet("venus", 16, new BABYLON.Vector3(152, 0, 0), "../textures/venus.jpg");
    earth = createPlanet("earth", 17, new BABYLON.Vector3(205, 0, 0), "../textures/earth.jpg");
    moon = createPlanet("moon", 5, new BABYLON.Vector3(210, 0, 0), "../textures/moon.jpg");
    mars = createPlanet("mars", 12, new BABYLON.Vector3(255, 0, 0), "../textures/mars.jpg");
    jupiter = createPlanet("jupiter", 57, new BABYLON.Vector3(365, 0, 0), "../textures/jupiter.jpg");
    saturn = createPlanet("saturn", 43, new BABYLON.Vector3(505, 0, 0), "../textures/saturn.jpg");
    uranus = createPlanet("uranus", 27, new BABYLON.Vector3(650, 0, 0), "../textures/uranus.jpg");
    neptune = createPlanet("neptune", 26, new BABYLON.Vector3(740, 0, 0), "../textures/neptune.jpg");
    pluto = createPlanet("pluto", 7.5, new BABYLON.Vector3(810, 0, 0), "../textures/pluto.jpg");

    animateMoonRotationAroundEarth(moon, earth);

    //Planet rotation around Sun
    function animatePlanetRotationAroundSun(planet, radius, rotationSpeed) {
        var rotatePlanetAroundSunAnimation = new BABYLON.Animation(
            planet.name + "AroundSunRotation",
            "rotation.y",
            rotationSpeed,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
    
        var rotationKeys = [];
        rotationKeys.push({ frame: 0, value: 0 });
        rotationKeys.push({ frame: 100, value: 2 * Math.PI });
        rotatePlanetAroundSunAnimation.setKeys(rotationKeys);
        planet.animations = [rotatePlanetAroundSunAnimation];
    
        var angle = 0; 
scene.onBeforeRenderObservable.add(function () {
    angle += rotationSpeed / 100; 
    var xOffset = radius * Math.sin(angle);
    var zOffset = radius * Math.cos(angle);
    planet.position.x = xOffset;
    planet.position.z = zOffset;
});
    
        scene.beginAnimation(planet, 0, 100, true);
    }

    //Saturn rings
    function createSaturnRings(saturn) {
        var ringTexture = new BABYLON.Texture("../textures/saturn_rings.png", scene);
    
        var rings = BABYLON.MeshBuilder.CreateDisc("saturnRings", {
            radius: 20,
            tessellation: 96,
        }, scene);
    
        var ringMaterial = new BABYLON.StandardMaterial("saturnRingMaterial", scene);
        ringMaterial.diffuseTexture = ringTexture;
        ringMaterial.opacityTexture = ringTexture;
        rings.material = ringMaterial;

        rings.rotation.x = Math.PI / 2;

        rings.parent = saturn;

        rings.position.z = 0; 
    }

    createSaturnRings(saturn);

    //Variables for planet rotation around sun
    animatePlanetRotationAroundSun(mercury, 117, 0);
    animatePlanetRotationAroundSun(venus, 152, 0);
    animatePlanetRotationAroundSun(earth, 205, 0);
    animatePlanetRotationAroundSun(mars, 255, 0);
    animatePlanetRotationAroundSun(jupiter, 365, 0);
    animatePlanetRotationAroundSun(saturn, 505, 0);
    animatePlanetRotationAroundSun(uranus, 650, 0);
    animatePlanetRotationAroundSun(neptune, 740, 0);
    animatePlanetRotationAroundSun(pluto, 810, 0);

    //Variables for clickListener
    setPlanetClickListener(sun, "sun");
    setPlanetClickListener(mercury, "mercury");
    setPlanetClickListener(venus, "venus");
    setPlanetClickListener(mars, "mars");
    setPlanetClickListener(moon, "moon");
    setPlanetClickListener(neptune, "neptune");
    setPlanetClickListener(pluto, "pluto");
    setPlanetClickListener(earth, "earth");
    setPlanetClickListener(jupiter, "jupiter");
    setPlanetClickListener(saturn, "saturn");

    //clickListener
    function setPlanetClickListener(planet, planetName) {
        planet.actionManager = new BABYLON.ActionManager(scene);
        planet.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function (evt) {
                    if (isPlanetClickEnabled) {
                        selectedPlanet = evt.source;
                        if (selectedPlanet && planetName) {
                            var htmlFilePath = "../" + planetName + "/" + planetName + ".html";
                            window.location.href = htmlFilePath;
                        }
                    }
                }
            )
        );
    }    

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
