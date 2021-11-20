let embeddingLightBendingDiv = document.querySelector("#embedding-lightbending");

let reloadButtonLightBending = document.querySelector("#reload-button-lightbending");

async function lightBending() {

    let dimensions = {
            width: 700,
            height: 550,
            margin: {
            top: 100,
            right: 70,
            bottom: 100,
            left: 70,
            },
        };
        dimensions.boundedWidth =
            dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight =
            dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    embeddingLightBendingDiv.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.bottom + "px");

    // three.js canvas for embedding

    const sceneEmbedding = new THREE.Scene();

    sceneEmbedding.background = new THREE.Color(0xffffff);

    const cameraEmbedding = new THREE.PerspectiveCamera(10, dimensions.width / (dimensions.height - dimensions.margin.top - dimensions.margin.bottom), 0.1, 1000);

    const rendererEmbedding = new THREE.WebGLRenderer({antialias : true});

    rendererEmbedding.setSize(dimensions.width, dimensions.height - dimensions.margin.top - dimensions.margin.bottom);
    embeddingLightBendingDiv.appendChild(rendererEmbedding.domElement);

    const lightsEmbedding = new THREE.HemisphereLight(0xFFFFFF, 1);
    sceneEmbedding.add(lightsEmbedding);

    const lightsDownEmbedding = new THREE.HemisphereLight(0x000000, 0xffffff, 0.5);
    sceneEmbedding.add(lightsDownEmbedding);

    cameraEmbedding.position.set(200,200,200);

    //orbit controls

    const controls = new THREE.OrbitControls(cameraEmbedding, rendererEmbedding.domElement);
    controls.enableZoom = false;

    

    // materials for space warp

        const materialSpaceWarpWireframe = new THREE.MeshBasicMaterial({color : 0x000000, opacity : 0.25, transparent : true, side : THREE.DoubleSide, morphTargets : true});
            materialSpaceWarpWireframe.flatShading = false;
            materialSpaceWarpWireframe.wireframe = true;
    
        const materialSpaceWarpSolid = new THREE.MeshNormalMaterial({opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});

    embeddingFunction();

    function embeddingFunction() {

        //load geodesic

        loadEmbedding("Javascript/Assets/individual gltfs/lightbendinggeodesic.glb");

        function loadEmbedding(embeddingType) {

                var loader = new THREE.GLTFLoader();

                loader.load(embeddingType, function(gltf) {
        
                    geodesic = gltf.scene;
                    sceneEmbedding.add(geodesic);

                    //gltf material
        
                    gltf.scene.traverse((o) => {
                        if(o.isMesh) o.material = materialForClipping;
                    })

                    init();
        
                }, undefined, function(error) {
                    console.log(error);
                })
                
        }

        function init() {
                geodesic.scale.x = 4000;
                geodesic.scale.y = 4000;
                geodesic.scale.z = 4000;

                geodesic.rotation.y = Math.PI / 14;

                geodesic.position.x = 0;
                geodesic.position.y = -5;
                geodesic.position.z = 0;
        }

        // load spacewarp

        loadSpaceWarp("Javascript/Assets/individual gltfs/lightbending.glb");

        function loadSpaceWarp(embeddingType) {

                var loader = new THREE.GLTFLoader();

                loader.load(embeddingType, function(gltf) {
        
                    spaceWarp3D = gltf.scene;
                    sceneEmbedding.add(spaceWarp3D);

                    //gltf material
        
                    gltf.scene.traverse((o) => {
                        if(o.isMesh) o.material = materialSpaceWarpSolid;
                    })

                    init2();
        
                }, undefined, function(error) {
                    console.log(error);
                })
                
        }

        function init2() {
                spaceWarp3D.scale.x = 400;
                spaceWarp3D.scale.y = 400;
                spaceWarp3D.scale.z = 400;

                spaceWarp3D.rotation.y = Math.PI / 14;

                spaceWarp3D.position.x = 0;
                spaceWarp3D.position.y = -5;
                spaceWarp3D.position.z = 0;
        }

        // sacewarp wireframe

        loadSpaceWarpWireframe("Javascript/Assets/individual gltfs/lightbending.glb");

        function loadSpaceWarpWireframe(embeddingType) {

                var loader = new THREE.GLTFLoader();

                loader.load(embeddingType, function(gltf) {
        
                    spaceWarp3DWireframe = gltf.scene;
                    sceneEmbedding.add(spaceWarp3DWireframe);

                    //gltf material
        
                    gltf.scene.traverse((o) => {
                        if(o.isMesh) o.material = materialSpaceWarpWireframe;
                    })

                    init3();
        
                }, undefined, function(error) {
                    console.log(error);
                })
                
        }

            function init3() {
                    spaceWarp3DWireframe.scale.x = 400;
                    spaceWarp3DWireframe.scale.y = 400;
                    spaceWarp3DWireframe.scale.z = 400;

                    spaceWarp3DWireframe.rotation.y = Math.PI / 14;

                    spaceWarp3DWireframe.position.x = 0;
                    spaceWarp3DWireframe.position.y = -4.8;
                    spaceWarp3DWireframe.position.z = 0;
            }

    }

    

    

    // masking

    let clippingDistance = -40;

    let y, z;

    var clippingPlaneVector = new THREE.Vector3(-0.5, 0, -1);

    
    var clippingPlane = new THREE.Plane(clippingPlaneVector, -100);

    clippingPlane.needsUpdate = true;

    // box helper

    // const box = new THREE.PlaneHelper( clippingPlane, 50, 0x00ff00 );
    // sceneEmbedding.add( box );

    rendererEmbedding.localClippingEnabled = true;

    var materialForClipping = new THREE.MeshPhongMaterial({ clippingPlanes : [clippingPlane], clipShadows : true})

    materialForClipping.needsUpdate = true;

    function animateClippingPlane() {

        requestAnimationFrame(animateClippingPlane);

        if(clippingDistance <= 40) {

            clippingDistance += 0.5;

            // y = clippingDistance * clippingDistance;

            // z = y ;
            
        }

        clippingPlane.constant = clippingDistance;

    }

    animateClippingPlane();

    reloadButtonLightBending.addEventListener("click", function() {
        clippingDistance = -40;
    })

    // rendering function 

    function animateEmbedding() {

        requestAnimationFrame(animateEmbedding);
        rendererEmbedding.render(sceneEmbedding , cameraEmbedding);

    }

    animateEmbedding();      

}

lightBending();