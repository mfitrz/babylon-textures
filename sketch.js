var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //color background black
    scene.clearColor = new BABYLON.Color3.FromHexString('#000');


    //create sphere w params (x, y, z, diameter)
    var s1 = createSphere(1, 3, 0.5, 2);
    //create sphere
    var s2 = createSphere(2, 3.5, 0.5, 2);
    var s6 = createSphere(3, 3, 0.5, 2.5);
    
    
    var s3 = createSphere(-2, 3, 0.5, 2.25);
    var s4 = createSphere(-3, 3, 0.5, 2);
    var s5 = createSphere(-2, 2.5, 0.5, 2);

    //wrap sphere in material from URL file

    //wrap sphere in material from local file
    s1.material = fileMat('thunder-clouds.jpg', scene);
    s2.material = fileMat('thunder-clouds.jpg', scene);
    s3.material = fileMat('thunder-clouds.jpg', scene);
    s4.material = fileMat('thunder-clouds.jpg', scene);
    s5.material = fileMat('thunder-clouds.jpg', scene);
    s6.material = fileMat('thunder-clouds.jpg', scene);
    
    //create box with params x, y, z, width, height, depth
    var b1 = createBox(2, 1.5, 0.5, 1, 1, 1);

    var b3 = createBox(-2.75, 0, 0.5, 1, 1, 1);

    b3.material = fileMat('lightning.jpg', scene);
    b3.rotation.z += Math.PI/4;

    //wrap box in material colored with hex code
    b1.material = fileMat('lightning.jpg', scene);
    b1.rotation.z += Math.PI/4;

    var b2 = createBox(0, -2, -1.5, 2, 2, 2);

    //wrap box in material from local file
    b2.material = fileMat('burnt_tree.jpg');

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});