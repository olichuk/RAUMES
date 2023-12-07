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
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 6, Math.PI / 3, 1250, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 600;
    camera.upperRadiusLimit = 1750;
    camera.checkCollisions = true;
    camera.inputs.attached.pointers.buttons = [0];

    //Background sphere(Star box sphere)
    BABYLON.SceneLoader.ImportMesh("", "../models/", "backgroundspace3.glb", scene, function (meshes) {
        var backgroundspace = meshes[0];
        backgroundspace.position = new BABYLON.Vector3(0, 0, 0);
        backgroundspace.scaling = new BABYLON.Vector3(2500, 2500, 2500);
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
    sun = createPlanet("sun", 190, new BABYLON.Vector3(0, 0, 0), "../textures/sun.jpg");
    mercury = createPlanet("mercury", 12, new BABYLON.Vector3(167, 0, 0), "../textures/mercury.jpg");
    venus = createPlanet("venus", 23, new BABYLON.Vector3(222, 0, 0), "../textures/venus.jpg");
    earth = createPlanet("earth", 25, new BABYLON.Vector3(295, 0, 0), "../textures/earth.jpg");
    moon = createPlanet("moon", 5, new BABYLON.Vector3(300, 0, 0), "../textures/moon.jpg");
    mars = createPlanet("mars", 14, new BABYLON.Vector3(345, 0, 0), "../textures/mars.jpg");
    jupiter = createPlanet("jupiter", 70, new BABYLON.Vector3(455, 0, 0), "../textures/jupiter.jpg");
    saturn = createPlanet("saturn", 55, new BABYLON.Vector3(595, 0, 0), "../textures/saturn.jpg");
    uranus = createPlanet("uranus", 31, new BABYLON.Vector3(740, 0, 0), "../textures/uranus.jpg");
    neptune = createPlanet("neptune", 30, new BABYLON.Vector3(830, 0, 0), "../textures/neptune.jpg");
    pluto = createPlanet("pluto", 10.5, new BABYLON.Vector3(900, 0, 0), "../textures/pluto.jpg");

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
    animatePlanetRotationAroundSun(mercury, 167, 0.04);
    animatePlanetRotationAroundSun(venus, 222, 0.22);
    animatePlanetRotationAroundSun(earth, 295, 0.2);
    animatePlanetRotationAroundSun(mars, 345, 0.16);
    animatePlanetRotationAroundSun(jupiter, 455, 0.1);
    animatePlanetRotationAroundSun(saturn, 595, 0.06);
    animatePlanetRotationAroundSun(uranus, 740, 0.023);
    animatePlanetRotationAroundSun(neptune, 830, 0.012);
    animatePlanetRotationAroundSun(pluto, 900, 0.008);

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
    setPlanetClickListener(uranus, "uranus");

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
                            300,
                            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                        );

                        var positionKeys=[];
                        positionKeys.push({
                            frame: 0,
                            value: scene.activeCamera.position.clone()
                        });

                        positionKeys.push({
                            frame: 300,
                            value: newCameraPosition
                        });

                        cameraAnimation.setKeys(positionKeys);
                        freelook = false;
                        scene.beginDirectAnimation(scene.activeCamera, [cameraAnimation], 0, 300, false);
                        scene.activeCamera.setTarget(selectedPlanet.position);

                        //RADIUS
                        var radiusMapping = {
                            "sun": 400,
                            "mercury": 30,
                            "venus": 50,
                            "earth": 50,
                            "mars": 30,
                            "neptune": 60,
                            "pluto": 20,
                            "moon":10,
                            "saturn": 100,
                            "jupiter": 130,
                            "uranus": 60
                        };

                        var newCameraRadius = radiusMapping[selectedPlanet.name]

                        //RADIUS ANIMATION
                        var radiusAnimation = new BABYLON.Animation(
                            "radiusAnimation",
                            "radius",
                            300,
                            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                        ); 

                        var radiusKeys=[];
                        radiusKeys.push({
                            frame: 0,
                            value: initialCameraRadius
                        });

                        radiusKeys.push({
                            frame: 300,
                            value: camera.lowerRadiusLimit = newCameraRadius
                        });

                        radiusKeys.push({
                            frame: 300,
                            value: camera.radius = newCameraRadius
                        });

                        //URLS
                        var urlMapping = {
                            "sun": "sun/sun.html",
                            "mercury": "mercury/mercury.html",
                            "venus": "venus/venus.html",
                            "earth": "earth/earth.html",
                            "mars": "mars/mars.html",
                            "neptune": "neptune/neptune.html",
                            "pluto": "pluto/pluto.html",
                            "moon": "moon/moon.html",
                            "saturn": "saturn/saturn.html",
                            "jupiter": "jupiter/jupiter.html",
                            "uranus": "uranus/uranus.html"
                        };

                        var url = urlMapping[selectedPlanet.name]
                        
                    
                        radiusAnimation.setKeys(radiusKeys);
                        scene.beginDirectAnimation(scene.activeCamera, [radiusAnimation], 0, 300, false);
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
