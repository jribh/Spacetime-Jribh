let appleDivGeodesics = document.querySelector("#apple-div-geodesics");

let embeddingGeodesicsDiv = document.querySelector("#embedding-geodesics");

let reloadButton = document.querySelector("#reload-button");

async function embeddingGeodesics() {

    let dimensions = {
            width: 450,
            height: 450,
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

    appleDivGeodesics.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.bottom + "px");

    embeddingGeodesicsDiv.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.bottom + "px");

    // d3 apple

    const wrapperApple = d3
                    .select("#apple-div-geodesics")
                    .append("svg")
                    .attr("width", dimensions.width)
                    .attr("height", dimensions.height/4.5);

    const boundsApple = wrapperApple
                  .append("g")
                  .style("transform",
                  `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

    let apple = boundsApple.append("svg:image")
                  .attr('x', -35)
                  .attr('y', -85)
                  .attr('width', 60)
                  .attr('height', 60)
                  .attr("xlink:href", "Javascript/Assets/PNGs/Apple.png")

    // three.js canvas for embedding

    const sceneEmbedding = new THREE.Scene();

    sceneEmbedding.background = new THREE.Color(0xffffff);

    const cameraEmbedding = new THREE.PerspectiveCamera(10, dimensions.width / (dimensions.height - dimensions.margin.top - dimensions.margin.bottom), 0.1, 1000);

    const rendererEmbedding = new THREE.WebGLRenderer({antialias : true});

    rendererEmbedding.setSize(dimensions.width, dimensions.height - dimensions.margin.top - dimensions.margin.bottom);
    embeddingGeodesicsDiv.appendChild(rendererEmbedding.domElement);

    const lightsEmbedding = new THREE.HemisphereLight(0xFFFFFF, 1);
    sceneEmbedding.add(lightsEmbedding);

    const lightsDownEmbedding = new THREE.HemisphereLight(0x000000, 0xffffff, 0.5);
    sceneEmbedding.add(lightsDownEmbedding);

    cameraEmbedding.position.z = 350;

    //orbit controls

    const controls = new THREE.OrbitControls(cameraEmbedding, rendererEmbedding.domElement);
    controls.enableZoom = false;

    // vector for surface

    let b = 1.85;

    embeddingFunction(b);
    
    // apple animating

    // let t = 10;

    // time = 64444.444444444445 * t - 4444.444444444445;

    let time = 4680;

    function animateApple() {

        apple
            .attr('x', -35)
            .attr('y', -85)
            .transition()
            .duration(0)
            .attr('x', -35)
            .attr('y', -85)

        apple
            .transition()
            .ease(d3.easePolyIn)
            .duration(time)
            .attr('x', 280)
            .attr('y', -85)

    }

    animateApple();


    function embeddingFunction(b) {

        const points = [];

        for(let i=16; i<100; i++) {

            let y=i/8;            

            let x = Math.sqrt((y-1)/(y-b));

            points.push(new THREE.Vector2(x,y));

        }

        const embeddingGeometry = new THREE.LatheGeometry(points, 36);

        const materialEmbeddingGeometry = new THREE.MeshNormalMaterial({opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true, polygonOffsetFactor : 1});

        const materialGeodesic = new THREE.MeshPhongMaterial({side : THREE.DoubleSide, color : 0xe9d8a6, emissive : 0xbb3e03});

        const lathe = new THREE.Mesh(embeddingGeometry, materialEmbeddingGeometry);

        lathe.scale.x = 8;
        lathe.scale.y = 8;
        lathe.scale.z = 8;

        lathe.rotation.z = Math.PI / 2;
        lathe.rotation.y = Math.PI / 14;

        lathe.position.x = 55;

        sceneEmbedding.add(lathe);

        // singularity sphere

        // var sphereRadius2 = 10;

        // const geometrySphere2 = new THREE.SphereGeometry(sphereRadius2, 64, 32);

        // const materialSphere2 = new THREE.MeshNormalMaterial({opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});
        // materialSphere2.flatShading = false;

        // const sphere2 = new THREE.Mesh(geometrySphere2, materialSphere2);

        // sphere2.translateX(36)

        // sceneEmbedding.add(sphere2);

        // label for dilated time

        const moreDilationDiv = document.createElement( 'div' );
        moreDilationDiv.className = 'label-dilation';
        moreDilationDiv.textContent = 'More time dilation';
        moreDilationDiv.style.marginTop = '0';
        moreDilationDiv.style.marginLeft = '0';
        const moreDilationLabel = new THREE.CSS2DObject( moreDilationDiv );
        moreDilationLabel.position.set( 3.5, 2, 0 );
        lathe.add( moreDilationLabel );

        // label for less dilated time

                const lessDilationDiv = document.createElement( 'div' );
                lessDilationDiv.className = 'label-dilation';
                lessDilationDiv.textContent = 'Less time dilation';
                lessDilationDiv.style.marginTop = '0';
                lessDilationDiv.style.marginLeft = '0';
                const lessDilationLabel = new THREE.CSS2DObject( lessDilationDiv );
                lessDilationLabel.position.set( 3.1, 12, 0 );
                lathe.add( lessDilationLabel );

        // renderer for labels

        labelRendererEmbeddings = new THREE.CSS2DRenderer();
        labelRendererEmbeddings.setSize( dimensions.width, dimensions.height - dimensions.margin.top - dimensions.margin.bottom );
        labelRendererEmbeddings.domElement.style.position = 'absolute';
        labelRendererEmbeddings.domElement.style.top = '0';
        embeddingGeodesicsDiv.appendChild( labelRendererEmbeddings.domElement );

        // orbit controls 2

        const controls2 = new THREE.OrbitControls(cameraEmbedding, labelRendererEmbeddings.domElement);
        controls2.enableZoom = false;

        //load geodesic

        loadEmbedding("Javascript/Assets/individual gltfs/geodesic.glb");

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
                geodesic.scale.x = 280;
                geodesic.scale.y = 280;
                geodesic.scale.z = 280;

                geodesic.rotation.y = Math.PI / 14;

                geodesic.position.x = -42.05;
                geodesic.position.y = -5;
                geodesic.position.z = 23.2;
        }

    }

    // masking

    let clippingDistance = 1;

    let y, z;

    var clippingPlaneVector = new THREE.Vector3(-1, 0, 0.25);

    
    var clippingPlane = new THREE.Plane(clippingPlaneVector, -45);

    clippingPlane.needsUpdate = true;

    // box helper

    // const box = new THREE.PlaneHelper( clippingPlane, 50, 0x00ff00 );
    // sceneEmbedding.add( box );

    rendererEmbedding.localClippingEnabled = true;

    var materialForClipping = new THREE.MeshPhongMaterial({ clippingPlanes : [clippingPlane], clipShadows : true})

    materialForClipping.needsUpdate = true;

    function animateClippingPlane() {

        requestAnimationFrame(animateClippingPlane);

        if(clippingDistance <= 9) {

            clippingDistance += 0.03;

            y = clippingDistance * clippingDistance;

            z = y - 46;
            
        }

        clippingPlane.constant = z;

    }

    animateClippingPlane();

    reloadButton.addEventListener("click", function() {
        clippingDistance = 1;
        animateApple();
    })

    // rendering function 

    function animateEmbedding() {

        requestAnimationFrame(animateEmbedding);
        rendererEmbedding.render(sceneEmbedding , cameraEmbedding);

    }

    animateEmbedding();     
    
    function animateLabels() {

        // label time embedding
        requestAnimationFrame(animateEmbedding);

        labelRendererEmbeddings.render(sceneEmbedding, cameraEmbedding);

    }

    animateLabels();

}

embeddingGeodesics();