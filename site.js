var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene, sun, mercury, venus, mars, moon, neptune, pluto, earth, jupiter, saturn, uranus;

var initialCameraPosition = new BABYLON.Vector3(-Math.PI / 6, Math.PI / 2.1, 50);

var isPlanetClickEnabled = true;
var selectedPlanet = null;
var targetDistance = 30;

//Scene
var createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    //Scene camera
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 6, Math.PI / 3, 1000, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 45;
    camera.upperRadiusLimit = 500;
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

    //Function of moon rotating around earth
    function animateMoonRotationAroundEarth(moon, earth) {
        var distanceFromEarth = 15;
    
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
    uranus = createPlanet("uranus", 4, new BABYLON.Vector3(425, 0, 0), "../textures/uranus.jpg");

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
    animatePlanetRotationAroundSun(mercury, 40, 0.5);
    animatePlanetRotationAroundSun(venus, 90, 0.2);
    animatePlanetRotationAroundSun(earth, 130, 0.1);
    animatePlanetRotationAroundSun(mars, 200, 0.05);
    animatePlanetRotationAroundSun(neptune, 300, 0.03);
    animatePlanetRotationAroundSun(pluto, 380, 0.03);
    animatePlanetRotationAroundSun(jupiter, 400, 0.03);
    animatePlanetRotationAroundSun(saturn, 420, 0.03);
    animatePlanetRotationAroundSun(uranus, 425, 0.03);

    //Variables for clickListener
    setPlanetClickListener(sun, "sun", "sun.html");
    setPlanetClickListener(mercury, "mercury");
    setPlanetClickListener(venus, "venus", "venus.html");
    setPlanetClickListener(mars, "mars");
    setPlanetClickListener(moon, "moon");
    setPlanetClickListener(neptune, "neptune");
    setPlanetClickListener(pluto, "pluto");
    setPlanetClickListener(earth, "earth");
    setPlanetClickListener(jupiter, "jupiter");
    setPlanetClickListener(saturn, "saturn");

    //clickListener
    function setPlanetClickListener(planet) {
        planet.actionManager = new BABYLON.ActionManager(scene);
        planet.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function (evt) {
                    if (isPlanetClickEnabled) {
                        selectedPlanet = evt.source;
                        
                        var initialCameraRadius = scene.activeCamera.radius;
                        var xOffset = targetDistance * Math.sin(selectedPlanet.rotation.y);
                        var zOffset = targetDistance * Math.cos(selectedPlanet.rotation.y);
                        var newCameraPosition = new BABYLON.Vector3(
                            selectedPlanet.position.x + xOffset,
                            selectedPlanet.position.y,
                            selectedPlanet.position.z + zOffset
                        );
                        

                        //CAMERA ANIMATION
                        var cameraAnimation = new BABYLON.Animation(
                            "cameraAnimation",
                            "position",
                            100,
                            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                        );

                        var positionKeys=[];
                        positionKeys.push({
                            frame: 0,
                            value: scene.activeCamera.position.clone()
                        });

                        positionKeys.push({
                            frame: 100,
                            value: newCameraPosition
                        });

                        cameraAnimation.setKeys(positionKeys);
                        freelook = false;
                        scene.beginDirectAnimation(scene.activeCamera, [cameraAnimation], 0, 100, false);
                        scene.activeCamera.setTarget(selectedPlanet.position);

                        //RADIUS
                        var radiusMapping = {
                            "sun": 50,
                            "mercury": 7,
                            "venus": 25,
                            "earth": 25,
                            "mars": 10,
                            "neptune": 30,
                            "pluto": 10,
                            "moon":6,
                            "saturn": 20,
                            "jupiter": 25
                        };

                        var newCameraRadius = radiusMapping[selectedPlanet.name]

                        //RADIUS ANIMATION
                        var radiusAnimation = new BABYLON.Animation(
                            "radiusAnimation",
                            "radius",
                            100,
                            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                        ); 

                        var radiusKeys=[];
                        radiusKeys.push({
                            frame: 0,
                            value: initialCameraRadius
                        });

                        radiusKeys.push({
                            frame: 100,
                            value: camera.lowerRadiusLimit = newCameraRadius
                        });

                        radiusKeys.push({
                            frame: 100,
                            value: camera.radius = newCameraRadius
                        });

                        //URLS
                        var urlMapping = {
                            "sun": "sun/sun.html",
                            "mercury": "mercury/mercury.html",
                            "venus": "venus/venus.html",
                            "earth": 25,
                            "mars": "mars/mars.html",
                            "neptune": 30,
                            "pluto": 10,
                            "moon":6,
                            "saturn": 20,
                            "jupiter": 25
                        };

                        var url = urlMapping[selectedPlanet.name]
                        
                    
                        radiusAnimation.setKeys(radiusKeys);
                        scene.beginDirectAnimation(scene.activeCamera, [radiusAnimation], 0, 100, false);
                        setTimeout(function() {
                            window.location.href = url;
                        }, 1000);     

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
