let embeddingMassWarp = document.querySelector("#embedding-mass-warp");

let embeddingTimeWarp = document.querySelector("#embedding-time-warp");

let spaceWarp = document.querySelector("#space-warp");

async function embeddingGravity() {

    let dimensions = {
            width: 450,
            height: 500,
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

    embeddingMassWarp.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.bottom + "px");

    embeddingTimeWarp.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.bottom + "px");

    spaceWarp.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.bottom + "px");

    var sliderMass = d3
        .sliderHorizontal()
        .min(0)
        .max(100)
        .tickFormat(function (d) {
            if ((d / 1000) >= 1) {
            d = d / 1000 + "K";
            }
            return d;
        })
        .ticks(6)
        .value(0)
        .width(dimensions.width - 2*dimensions.margin.left)
        .displayValue(false)
        .handle(
            d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
        );

    var sliderMassSvg = d3.select('#slider-mass-warp')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', 100)
        .style("transform", 25)
        .append('g')
        .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top/6}px)`)
        .call(sliderMass);

        // three.js scene sphere

        const sceneSphere = new THREE.Scene();

        sceneSphere.background = new THREE.Color(0xffffff);

        const cameraSphere = new THREE.PerspectiveCamera(75, dimensions.width / (dimensions.height - 2*dimensions.margin.top - 2*dimensions.margin.bottom), 0.1, 1000);

        const rendererSphere = new THREE.WebGLRenderer({antialias : true});

        rendererSphere.setSize(dimensions.width, dimensions.height - 2*dimensions.margin.top - 2*dimensions.margin.bottom);
        embeddingMassWarp.appendChild(rendererSphere.domElement);

        const lightsSphere = new THREE.HemisphereLight(0xFFFFFF, 1);
        sceneSphere.add(lightsSphere);

        const lightsDownSphere = new THREE.HemisphereLight(0x000000, 0xffffff, 0.5);
        sceneSphere.add(lightsDownSphere);

        // three.js sphere object

        var sphereRadius = 80;

        const geometrySphere = new THREE.SphereGeometry(sphereRadius, 64, 32);

        const materialSphere = new THREE.MeshPhongMaterial({color : 0xcaf0f8, opacity : 0.75, transparent : true,});
        materialSphere.color.set(0xcaf0f8);
        materialSphere.flatShading = false;

        const sphere = new THREE.Mesh(geometrySphere, materialSphere);

        sceneSphere.add(sphere);

        cameraSphere.position.z = 170;

        // label for mass

        const sphereLabelDiv = document.createElement( 'div' );
        sphereLabelDiv.className = 'label-shwarzchild-radius';
        sphereLabelDiv.textContent = 'Mass';
        sphereLabelDiv.style.marginTop = '0';
        sphereLabelDiv.style.marginLeft = '5em';
        const sphereLabel = new THREE.CSS2DObject( sphereLabelDiv );
        sphereLabel.position.set( 0, 0, 0 );
        sphere.add( sphereLabel );

        // renderer for labels

        labelRendererSphere = new THREE.CSS2DRenderer();
        labelRendererSphere.setSize( dimensions.width, dimensions.height - 2*dimensions.margin.top - 2*dimensions.margin.bottom );
        labelRendererSphere.domElement.style.position = 'absolute';
        labelRendererSphere.domElement.style.top = '0';
        embeddingMassWarp.appendChild( labelRendererSphere.domElement );

        // // orbit controls 2

        //         const controls2 = new THREE.OrbitControls(cameraDualEmbedding, labelRendererSphere.domElement);
        //         controls2.enableZoom = false;

        // rendering function sphere

        function animateSphere() {

            requestAnimationFrame(animateSphere);
            rendererSphere.render(sceneSphere,cameraSphere);

            labelRendererSphere.render(sceneSphere, cameraSphere);

        }

        animateSphere();

        // three.js scene embedding dual
        
        var clock, mixer;

        const sceneDualEmbedding = new THREE.Scene();

        sceneDualEmbedding.background = new THREE.Color(0xffffff);

        const cameraDualEmbedding = new THREE.PerspectiveCamera(10, dimensions.width / (dimensions.height - dimensions.margin.top), 75, 100);

        const rendererDualEmbedding = new THREE.WebGLRenderer({antialias : true});
        rendererDualEmbedding.shadowMap.enabled = true;
        rendererDualEmbedding.shadowMap.type = THREE.PCFSoftShadowMap;

        //orbit controls

        const controls = new THREE.OrbitControls(cameraDualEmbedding, rendererDualEmbedding.domElement);
        controls.enableZoom = false;

        // camera position

        cameraDualEmbedding.position.set(-10,35,80);
        controls.update();

        rendererDualEmbedding.setSize(dimensions.width, dimensions.height-dimensions.margin.top);
        embeddingTimeWarp.appendChild(rendererDualEmbedding.domElement);

        const lightsDualEmbedding = new THREE.HemisphereLight(0xFFFFFF, 0);
        sceneDualEmbedding.add(lightsDualEmbedding);

        // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
        // directionalLight.castShadow = true;
        // directionalLight.position.set(0,50,80)
        // // directionalLight.target.position.set(0,-25,0)
        // sceneDualEmbedding.add( directionalLight );

        // const spotLight = new THREE.SpotLight(0xffffff, 1);
        // spotLight.position.set(10,1,10);
        // spotLight.castShadow = true;
        // spotLight.receiveShadow = true;
        // spotLight.shadow.camera.near = 0.5;       // default
        // spotLight.shadow.camera.far = 350      // default
        // spotLight.shadow.mapSize.width = 5000;  // default
        // spotLight.shadow.mapSize.height = 5000; // default
        // sceneDualEmbedding.add(spotLight);

        const lightsDownDualEmbedding = new THREE.HemisphereLight(0x000000, 0xffffff, 0);
        sceneDualEmbedding.add(lightsDownDualEmbedding);


        let embedding4;

		// geometry.morphAttributes.position = [];

        const materialSpaceWarp = new THREE.MeshBasicMaterial({color : 0x000000, opacity : 0.25, transparent : true, side : THREE.DoubleSide, morphTargets : true});
        materialSpaceWarp.flatShading = false;
        materialSpaceWarp.wireframe = true;

        // const materialSpaceWarp = new THREE.MeshPhongMaterial({color : 0xe5e5e5, opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});
        // materialSpaceWarp.flatShading = false;

        const materialEmbedding = new THREE.MeshNormalMaterial({opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});
        materialEmbedding.needsUpdate = true;

        // space warp spot light

        // const spotLight = new THREE.SpotLight( 0xffffff, 10 );
        // spotLight.position.set( 30, 40, 70 );

        // spotLight.castShadow = true;

        // spotLight.shadow.mapSize.width = 1024;
        // spotLight.shadow.mapSize.height = 1024;

        // spotLight.shadow.camera.near = 500;
        // spotLight.shadow.camera.far = 4000;
        // spotLight.shadow.camera.fov = 30;

        // sceneDualEmbedding.add( spotLight );


        loadEmbedding("Javascript/Assets/individual gltfs/embedding space animated wireframe.glb");

        function loadEmbedding(embeddingType) {

            clock = new THREE.Clock();

            var loader = new THREE.GLTFLoader();

            loader.load(embeddingType, function(gltf) {
    
                embedding4 = gltf.scene;
                sceneDualEmbedding.add(embedding4);
                
                //mixer animation

                mixer = new THREE.AnimationMixer(gltf.scene);

                gltf.animations.forEach( (clip) => {
                    mixer.clipAction(clip).play();
                })

                //gltf material
    
                gltf.scene.traverse((o) => {
                     if(o.isMesh) o.material = materialSpaceWarp;
                     o.castShadow = true;
                     o.receiveShadow = true;
                })

                init(embedding4);
    
            }, undefined, function(error) {
                console.log(error);
            })
            
        }

        function init(embeddingType) {
            embeddingType.scale.x = 75;
            embeddingType.scale.y = 75;
            embeddingType.scale.z = 75;

            embeddingType.position.y = -4.95;

            embeddingType.rotation.y = Math.PI / 14;
        }

        // second embedding 

        var clock2, mixer2, embedding5;

        loadEmbedding2("Javascript/Assets/individual gltfs/embedding space animated.glb");

        function loadEmbedding2(embeddingType) {

            clock2 = new THREE.Clock();

            var loader = new THREE.GLTFLoader();

            loader.load(embeddingType, function(gltf) {
    
                embedding5 = gltf.scene;
                sceneDualEmbedding.add(embedding5);
                
                //mixer animation

                mixer2 = new THREE.AnimationMixer(gltf.scene);

                gltf.animations.forEach( (clip) => {
                    mixer2.clipAction(clip).play();
                })

                //gltf material
    
                gltf.scene.traverse((o) => {
                     if(o.isMesh) o.material = materialEmbedding;
                     o.castShadow = true;
                     o.receiveShadow = true;
                })

                init2(embedding5);

            // labels

                    // label for embedding time space

                    const spacetimeLabelDiv = document.createElement( 'div' );
                    spacetimeLabelDiv.className = 'label-spacetime';
                    spacetimeLabelDiv.textContent = 'Space-Time Diagram';
                    spacetimeLabelDiv.style.marginTop = '0';
                    spacetimeLabelDiv.style.marginLeft = '2em';
                    const spacetimeLabel = new THREE.CSS2DObject( spacetimeLabelDiv );
                    spacetimeLabel.position.set( 0.05, 0.14, 0 );
                    embedding5.add( spacetimeLabel );

                    // label for embedding space space

                    const spacespaceLabelDiv = document.createElement( 'div' );
                    spacespaceLabelDiv.className = 'label-spacespace';
                    spacespaceLabelDiv.textContent = 'Space-Space Diagram';
                    spacespaceLabelDiv.style.marginTop = '0';
                    spacespaceLabelDiv.style.marginLeft = '0';
                    const spacespaceLabel = new THREE.CSS2DObject( spacespaceLabelDiv );
                    spacespaceLabel.position.set( 0.1, 0.035, -0.1 );
                    embedding5.add( spacespaceLabel );
    
            }, undefined, function(error) {
                console.log(error);
            })
            
        }

        function init2(embeddingType) {
            embeddingType.scale.x = 75;
            embeddingType.scale.y = 75;
            embeddingType.scale.z = 75;

            embeddingType.position.y = -5;

            embeddingType.rotation.y = Math.PI / 14;
        }


        // rendering function 

        timeEmbedding = 0;

        // renderer for labels

        labelRendererEmbeddings = new THREE.CSS2DRenderer();
        labelRendererEmbeddings.setSize( dimensions.width, dimensions.height-dimensions.margin.top );
        labelRendererEmbeddings.domElement.style.position = 'absolute';
        labelRendererEmbeddings.domElement.style.top = '0';
        embeddingTimeWarp.appendChild( labelRendererEmbeddings.domElement );

        // orbit controls 2

                const controls2 = new THREE.OrbitControls(cameraDualEmbedding, labelRendererEmbeddings.domElement);
                controls2.enableZoom = false;

        function animateDualEmbedding() {

            requestAnimationFrame(animateDualEmbedding);
            controls.update();

            seekAnimationTime(mixer, timeEmbedding);

            seekAnimationTime(mixer2, timeEmbedding);

            rendererDualEmbedding.render(sceneDualEmbedding,cameraDualEmbedding);

            // for space warp

            // requestAnimationFrame(animateDualEmbedding);
            // controlsSpaceWarp.update();

            // rendererSpaceWarp.render(sceneSpaceWarp,cameraSpaceWarp);

            // label time embedding

            labelRendererEmbeddings.render(sceneDualEmbedding, cameraDualEmbedding);

        }
        
        animateDualEmbedding();

        // rendering function sphere

        function seekAnimationTime(animMixer, timeInSeconds) {

            if(animMixer) animMixer.time = 0;

            if(animMixer) {
            for(let i=0; i<animMixer._actions.length; i++) {
                animMixer._actions[i].time = 0;
            }
        }

            if(animMixer) animMixer.update(timeInSeconds);

        }

    // Mass slider onchange

    sliderMass.on('onchange', (val) => {

        timeEmbedding = val/20.32;

    })

}

embeddingGravity();