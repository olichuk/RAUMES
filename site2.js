var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene, sun, mercury, venus, mars, moon, neptune, pluto, earth;

var initialCameraPosition = new BABYLON.Vector3(-Math.PI / 6, Math.PI / 2.1, 50);

var createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 6, Math.PI / 3, 1000, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 45;
    camera.upperRadiusLimit = 1000;
    camera.checkCollisions = true;
    camera.inputs.attached.pointers.buttons = [0];

    // ЗОРЯНЕ НЕБО
    BABYLON.SceneLoader.ImportMesh("", "../models/", "backgroundspace3.glb", scene, function (meshes) {
        var backgroundspace = meshes[0];
        backgroundspace.position = new BABYLON.Vector3(0, 0, 0);
        backgroundspace.scaling = new BABYLON.Vector3(1000, 1000, 1000);
        var material = new BABYLON.StandardMaterial("backgroundMaterial", scene);
        material.emissiveTexture = new BABYLON.Texture("", scene);
        backgroundspace.material = material;
    });

    // 
    function createPlanet(name, diameter, position, texturePath) {
        var planetMaterial = new BABYLON.StandardMaterial(name + "Material", scene);
        planetMaterial.diffuseTexture = new BABYLON.Texture(texturePath, scene);
        planetMaterial.emissiveTexture = new BABYLON.Texture(texturePath, scene);
    
        var planet = BABYLON.MeshBuilder.CreateSphere(name, { diameter: diameter }, scene);
        planet.position = position;
        planet.material = planetMaterial;
    
        return planet;
    }
    
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
        //scene.beginAnimation(moon, 0, 100, true);
    
        scene.onBeforeRenderObservable.add(function() {
            var angle = moon.rotation.y;
            var xOffset = distanceFromEarth * Math.sin(angle);
            var zOffset = distanceFromEarth * Math.cos(angle);
            moon.position.x = earth.position.x + xOffset;
            moon.position.z = earth.position.z + zOffset;
        });
    }
    
    sun = createPlanet("sun", 30, new BABYLON.Vector3(0, 0, 0), "../textures/sun.jpg");
    mercury = createPlanet("mercury", 3, new BABYLON.Vector3(40, 0, 0), "../textures/mercury.jpg");
    venus = createPlanet("venus", 9, new BABYLON.Vector3(90, 0, 0), "../textures/venus.jpg");
    earth = createPlanet("earth", 10, new BABYLON.Vector3(130, 0, 0), "../textures/earth.jpg");
    moon = createPlanet("moon", 2, new BABYLON.Vector3(140, 0, 0), "../textures/moon.jpg");
    mars = createPlanet("mars", 5, new BABYLON.Vector3(200, 0, 0), "../textures/mars.jpg");
    neptune = createPlanet("neptune", 14, new BABYLON.Vector3(300, 0, 0), "../textures/neptune.jpg");
    pluto = createPlanet("pluto", 4, new BABYLON.Vector3(380, 0, 0), "../textures/pluto.jpg");

    
    animateMoonRotationAroundEarth(moon, earth);

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
        
            var angle = 0; // Початковий кут обертання планети
    scene.onBeforeRenderObservable.add(function () {
        angle += rotationSpeed / 100; // Збільшуємо кут обертання кожен кадр
        var xOffset = radius * Math.sin(angle);
        var zOffset = radius * Math.cos(angle);
        planet.position.x = xOffset;
        planet.position.z = zOffset;
    });
        
            scene.beginAnimation(planet, 0, 100, true);
        }

        animatePlanetRotationAroundSun(mercury, 40, 0.5);
        animatePlanetRotationAroundSun(venus, 90, 0.2);
        animatePlanetRotationAroundSun(earth, 130, 0.1);
        animatePlanetRotationAroundSun(mars, 200, 0.05);
        animatePlanetRotationAroundSun(neptune, 300, 0.03);
        animatePlanetRotationAroundSun(pluto, 380, 0.03);

        var isPlanetClickEnabled = true;
var selectedPlanet = null;
var targetDistance = 30;

function setPlanetInfo(planetName, planetDescription) {
    planetTitleDiv.textContent = planetName;
    planetDescriptionDiv.textContent = planetDescription;
}

function setPlanetClickListener(planet, description) {
    planet.actionManager = new BABYLON.ActionManager(scene);
    planet.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function (evt) {
                if (isPlanetClickEnabled) {
                    selectedPlanet = evt.source;
                    if (selectedPlanet && selectedPlanet.name !== "sun") {
                        // Встановити інформацію про планету
                        document.getElementById("planetTitle").textContent = selectedPlanet.name;
                        document.getElementById("planetDescription").textContent = description;
                        document.getElementById("planetInfoDiv").style.display = "block"; // Показати вікно з інформацією про планету

                        var xOffset = targetDistance * Math.sin(selectedPlanet.rotation.y);
                        var zOffset = targetDistance * Math.cos(selectedPlanet.rotation.y);
                        scene.activeCamera.position.x = selectedPlanet.position.x + xOffset;
                        scene.activeCamera.position.z = selectedPlanet.position.z + zOffset;
                        scene.activeCamera.position.y = selectedPlanet.position.y;

                        scene.activeCamera.setTarget(selectedPlanet.position);
                    }
                }
            }
        )
    );
}



setPlanetClickListener(sun, "Сонце - це зірка типу Г-джай, яка знаходиться в центрі нашої Сонячної системи. Його маса величезна, дозволяючи в ньому відбуватися термоядерні реакції, які випромінюють світло і тепло. Сонце є джерелом енергії для всіх планет, комет і астероїдів у Сонячній системі.");
setPlanetClickListener(mercury,"Меркурій - найменша планета нашої системи та найближча до Сонця. Це кам'яниста планета з тонкою атмосферою. Вона має екстремальні температури: дуже спекотно вдень і дуже холодно вночі через відсутність атмосфери, яка утримує тепло.");
setPlanetClickListener(venus,"Венера - друга планета від Сонця. Це газоподібна планета з дуже густою атмосферою, яка містить хмарний шар кислотної сіричної кислоти. Її поверхня вкрита великою кількістю вулканів та гарячих пустель.");
setPlanetClickListener(mars,"Марс - четверта планета від Сонця. Він має тонку атмосферу, що складається з вуглекислого газу. Марс відомий своєю червоною поверхнею, яка свідчить про наявність заліза в грунті. Деякі вчені вивчають можливість колонізації Марса у майбутньому.");
setPlanetClickListener(moon,"Місяць - єдиний природний супутник Землі. Він впливає на припливи та відпливи нашого океану через гравітаційні сили. Місяць не має атмосфери і поверхня його покрита кратерами і горами.");
setPlanetClickListener(neptune,"Нептун - восьма планета від Сонця. Це газовий гігант з хмарною атмосферою та потужними вітрами. Нептун також має кілька великих місяців, таких як Тритон.");
setPlanetClickListener(pluto,"Плутон - карликова планета, яка раніше вважалася дев'ятою планетою Сонячної системи, але зараз відома як карликова планета. Він розташований в холодному поясі Койпера та має невеликі місяці, такі як Харон.");
setPlanetClickListener(earth, "Земля - єдина відома нам планета, на якій існує життя. Її атмосфера складається з кисню, азоту, вуглекислого газу та інших слідних газів, необхідних для підтримки життя рослин і тварин.");


    function setCameraToSun(camera) {
        BABYLON.Animation.CreateAndStartAnimation(
            "cameraAnimation",
            camera,
            "target",
            30,
            60,
            camera.target.clone(),
            new BABYLON.Vector3(0, 0, 0),
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        BABYLON.Animation.CreateAndStartAnimation(
            "cameraRotationAnimation",
            camera,
            "alpha",
            30,
            60,
            camera.alpha,
            initialCameraPosition.x,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        BABYLON.Animation.CreateAndStartAnimation(
            "cameraBetaAnimation",
            camera,
            "beta",
            30,
            60,
            camera.beta,
            initialCameraPosition.y,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        BABYLON.Animation.CreateAndStartAnimation(
            "cameraRadiusAnimation",
            camera,
            "radius",
            30,
            60,
            camera.radius,
            initialCameraPosition.z,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
    }
    
    sun.actionManager = new BABYLON.ActionManager(scene);
sun.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function (evt) {
            selectedPlanet = null;
            cameraTarget = null;
            setCameraToSun(camera);
        }
    )
);


    // Світло
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
