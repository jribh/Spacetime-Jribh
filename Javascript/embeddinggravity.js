let embeddingMassDiv = document.querySelector("#embedding-mass");

let embeddingDualDiv = document.querySelector("#embedding-dual");

async function embeddingGravity() {

    let dimensions = {
            width: 500,
            height: 500,
            margin: {
            top: 50,
            right: 70,
            bottom: 50,
            left: 70,
            },
        };
        dimensions.boundedWidth =
            dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight =
            dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    // embeddingMassDiv.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.botto + "px");

    // embeddingDualDiv.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.botto + "px");

    var sliderMass = d3
        .sliderHorizontal()
        .min(1)
        .max(250000)
        .tickFormat(function (d) {
            if ((d / 1000) >= 1) {
            d = d / 1000 + "K";
            }
            return d;
        })
        .ticks(6)
        .value(1)
        .width(dimensions.width - 2.5*dimensions.margin.left)
        .displayValue(false)
        .handle(
            d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
        );

    var sliderRadius = d3
        .sliderHorizontal()
        .min(0)
        .max(1000000)
        .tickFormat(function (d) {
            if ((d / 1000) >= 1) {
            d = d / 1000 + "K";
            }
            return d;
        })
        .ticks(6)
        .value(696340)
        .width(dimensions.width - 2.5*dimensions.margin.left)
        .displayValue(false)
        .handle(
            d3
                .symbol()
                .type(d3.symbolCircle)
                .size(200)()
            );
        
    var massLabel = d3.select('#slider-mass').append('text')
            .attr('x',0)
            .attr('y', 0)
            .text('Mass (in Solar Masses)');
    
    var radiusLabel = d3.select('#slider-radius').append('text')
            .attr('x',0)
            .attr('y', 0)
            .text('Radius (in Kilometers)');

    var sliderMassSvg = d3.select('#slider-mass')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', 80)
        .style("transform", 25)
        .append('g')
        .style('transform', `translate(${dimensions.margin.left/2}px,${dimensions.margin.top/6}px)`)
        .call(sliderMass);

    var sliderRadiusSvg = d3.select('#slider-radius')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', 80)
        .style("transform", 25)
        .append('g')
        .style('transform', `translate(${dimensions.margin.left/2}px,${dimensions.margin.top/6}px)`)
        .call(sliderRadius);

    // three.js scene sphere

        const sceneSphere = new THREE.Scene();

        sceneSphere.background = new THREE.Color(0xffffff);

        const cameraSphere = new THREE.PerspectiveCamera(75, dimensions.width / (dimensions.height - 3*dimensions.margin.top - 3*dimensions.margin.bottom), 0.1, 1000);

        const rendererSphere = new THREE.WebGLRenderer({antialias : true});

        rendererSphere.setSize(dimensions.width, dimensions.height - 3*dimensions.margin.top - 3*dimensions.margin.bottom);
        embeddingMassDiv.appendChild(rendererSphere.domElement);

        const lightsSphere = new THREE.HemisphereLight(0xFFFFFF, 1);
        sceneSphere.add(lightsSphere);

        const lightsDownSphere = new THREE.HemisphereLight(0x000000, 0xffffff, 0.5);
        sceneSphere.add(lightsDownSphere);

        // three.js sphere object

        var sphereRadius = 100;

        const geometrySphere = new THREE.SphereGeometry(sphereRadius, 64, 32);

        const materialSphere = new THREE.MeshPhongMaterial({color : 0xcaf0f8, opacity : 0.75, transparent : true,});
        materialSphere.color.set(0xcaf0f8);
        materialSphere.flatShading = false;

        const sphere = new THREE.Mesh(geometrySphere, materialSphere);

        sceneSphere.add(sphere);

        // schwarzschild radius ring

        var radius   = 180,
            segments = 64,
            materialCircle = new THREE.LineDashedMaterial( { color: 0x8d99ae , dashSize : 10, gapSize : 10} ),
            geometryCircle = new THREE.CircleGeometry( radius, segments );

        geometryCircle.vertices.shift();

        const circleS = new THREE.LineLoop( geometryCircle, materialCircle );
        circleS.computeLineDistances();

        sceneSphere.add(circleS);

        var scale = 0.0000029477;

        circleS.scale.x = scale;
        circleS.scale.y = scale;
        circleS.scale.z = scale;


        cameraSphere.position.z = 250;

    // three.js scene embedding dual
        
        var clock, mixer;

        const sceneDualEmbedding = new THREE.Scene();

        sceneDualEmbedding.background = new THREE.Color(0xffffff);

        const cameraDualEmbedding = new THREE.PerspectiveCamera(10, dimensions.width / (dimensions.height - 2*dimensions.margin.top - 2*dimensions.margin.bottom), 0.1, 1000);

        const rendererDualEmbedding = new THREE.WebGLRenderer({antialias : true});

        //orbit controls

        const controls = new THREE.OrbitControls(cameraDualEmbedding, rendererDualEmbedding.domElement);
        controls.enableZoom = false;

        // camera position

        cameraDualEmbedding.position.set(0,0,60);
        controls.update();

        rendererDualEmbedding.setSize(dimensions.width, dimensions.height - 2*dimensions.margin.top - 2*dimensions.margin.bottom);
        embeddingDualDiv.appendChild(rendererDualEmbedding.domElement);

        const lightsDualEmbedding = new THREE.HemisphereLight(0xFFFFFF, 1);
        sceneDualEmbedding.add(lightsDualEmbedding);

        const lightsDownDualEmbedding = new THREE.HemisphereLight(0x000000, 0xffffff, 0.5);
        sceneDualEmbedding.add(lightsDownDualEmbedding);

        
        // gltf loader

        let embedding4;
        let embeddingBlackHole;

		// geometry.morphAttributes.position = [];

        // const materialEmbedding = new THREE.MeshPhongMaterial({color : 0xcaf0f8, opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});
        // materialEmbedding.color.set(0xcaf0f8);
        // materialEmbedding.flatShading = false;

        const materialEmbedding = new THREE.MeshNormalMaterial({opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});


        loadEmbedding("Javascript/Assets/individual gltfs/embedding 4 animated.glb");

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
                     if(o.isMesh) o.material = materialEmbedding;
                })

                init();
    
            }, undefined, function(error) {
                console.log(error);
            })
            
        }

        function init() {
            embedding4.scale.x = 90;
            embedding4.scale.y = 90;
            embedding4.scale.z = 90;

            embedding4.rotation.y = Math.PI / 14;
        }

        // rendering function 

        timeEmbedding = 0;

        function animateDualEmbedding() {

            requestAnimationFrame(animateDualEmbedding);
            controls.update();

            // var delta = clock.getDelta();
            // if (mixer) mixer.update(delta);
            seekAnimationTime(mixer, timeEmbedding);

            rendererDualEmbedding.render(sceneDualEmbedding,cameraDualEmbedding);

        }
        
        animateDualEmbedding();

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

    let schwarzschildRadius = 3;
    let sphereRadiusS = 696340;

    // label for schwarzchild radius

    const sRadiusLabelDiv = document.createElement( 'div' );
    sRadiusLabelDiv.className = 'label-shwarzchild-radius';
    sRadiusLabelDiv.textContent = 'Schwarzchild Radius';
    sRadiusLabelDiv.style.marginTop = '-2em';
    sRadiusLabelDiv.style.marginLeft = '8em';
    const sRadiusLabel = new THREE.CSS2DObject( sRadiusLabelDiv );
    sRadiusLabel.position.set( 50, 50, 0 );
    circleS.add( sRadiusLabel );

    const sRadiusLabelDynDiv = document.createElement( 'div' );
    sRadiusLabelDynDiv.className = 'label-shwarzchild-radius-dynamic';
    sRadiusLabelDynDiv.textContent = `${schwarzschildRadius} km`;
    sRadiusLabelDynDiv.style.marginTop = '-0.35em';
    sRadiusLabelDynDiv.style.marginLeft = '6.5em';
    const sRadiusDynLabel = new THREE.CSS2DObject( sRadiusLabelDynDiv );
    sRadiusDynLabel.position.set( 50, 50, 0 );
    circleS.add( sRadiusDynLabel );

    labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize( dimensions.width, dimensions.height - 3*dimensions.margin.top - 3*dimensions.margin.bottom );
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '-50px';
    embeddingMassDiv.appendChild( labelRenderer.domElement );

    //event horizon label

    const eventHorizonLabelDiv = document.createElement( 'div' );
    eventHorizonLabelDiv.className = 'label-event-horizon';

    eventHorizonLabelDiv.style.marginTop = '0';
    eventHorizonLabelDiv.style.marginLeft = '0';
    const eventHorizonLabel = new THREE.CSS2DObject( eventHorizonLabelDiv );
    eventHorizonLabel.position.set( 0, 4.8, 0 );

    // event horizon label 2

    const eventHorizonLabelDiv2 = document.createElement( 'div' );
    eventHorizonLabelDiv2.className = 'label-event-horizon-2';
    
    eventHorizonLabelDiv2.style.marginTop = '0';
    eventHorizonLabelDiv2.style.marginLeft = '0';
    const eventHorizonLabel2 = new THREE.CSS2DObject( eventHorizonLabelDiv2 );
    eventHorizonLabel2.position.set( 0, 4.8, 0 );

    //singularity label

    // const singularityLabelDiv2 = document.createElement( 'div' );
    // singularityLabelDiv2.className = 'label-event-horizon-2';
        
    // singularityLabelDiv2.style.marginTop = '0';
    // singularityLabelDiv2.style.marginLeft = '0';
    // const singularityLabel2 = new THREE.CSS2DObject( singularityLabelDiv2 );
    // singularityLabel2.position.set( 0, 4.8, 0 );

    // mass chage slider

    sliderMass.on('onchange', (val) => {

        // schwarzschild radius

        let mass = Math.round(val) * 1.989 * Math.pow(10, 30);

        schwarzschildRadius = Math.round((mass * 1.482 * Math.pow(10, -27)) / 1000);

        sRadiusLabelDynDiv.textContent = `${schwarzschildRadius} km`;

        // schwarzschild radius scaling

        var scale = val * 0.0000029477;

        circleS.scale.x = scale;
        circleS.scale.y = scale;
        circleS.scale.z = scale;

        timeEmbedding = val/50001;

        if(sphereRadiusS < schwarzschildRadius * 1.2) {

            while(sceneDualEmbedding.children.length > 0){ 
                sceneDualEmbedding.remove(sceneDualEmbedding.children[0]); 
            }
    
            loadEmbedding("Javascript/Assets/individual gltfs/embedding black hole.glb");

            // event horizon plane

            const eventHorizonPlaneGeometry = new THREE.PlaneGeometry( 8, 8, 12, 12 );
            const eventHorizonPlaneMaterial = new THREE.MeshBasicMaterial({color : 0x000000, opacity : 0.15, transparent : true, side : THREE.DoubleSide, morphTargets : true});
            eventHorizonPlaneMaterial.flatShading = false;
            eventHorizonPlaneMaterial.wireframe = true;
            const eventHorizonPlane = new THREE.Mesh( eventHorizonPlaneGeometry, eventHorizonPlaneMaterial );

            eventHorizonPlane.position.set(3.1, 0, -0.7);
            eventHorizonPlane.rotation.y = -Math.PI/2.33;

            // plane 2

            const eventHorizonPlane2 = new THREE.Mesh( eventHorizonPlaneGeometry, eventHorizonPlaneMaterial );

            eventHorizonPlane2.position.set(-3.1, 0, 0.7);
            eventHorizonPlane2.rotation.y = -Math.PI/2.33;

            sceneDualEmbedding.add( eventHorizonPlane );
            sceneDualEmbedding.add( eventHorizonPlane2 );

            // singularity sphere

                                var sphereRadius2 = 0.05;

                                const geometrySphere2 = new THREE.SphereGeometry(sphereRadius2, 64, 32);
                    
                                const materialSphere2 = new THREE.MeshNormalMaterial({opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});
                                materialSphere2.flatShading = false;
                    
                                const sphere2 = new THREE.Mesh(geometrySphere2, materialSphere2);
                    
                                sceneDualEmbedding.add(sphere2);

            // label for black hole

            eventHorizonLabelDiv.textContent = "Event Horizon";
            eventHorizonLabelDiv2.textContent = "Event Horizon";

            eventHorizonPlane.add( eventHorizonLabel );
            eventHorizonPlane2.add( eventHorizonLabel2 );
        


        } else {

            while(sceneDualEmbedding.children.length > 0){ 
                sceneDualEmbedding.remove(sceneDualEmbedding.children[0]);
            }
    
            loadEmbedding("Javascript/Assets/individual gltfs/embedding 4 animated.glb")

            // label for black hole
            eventHorizonLabelDiv.textContent = "";
            eventHorizonLabelDiv2.textContent = "";

        }

    })


    // Radius slider onchange

    sliderRadius.on('onchange', (val) => {

        // sphere radius

        var scale = val / 696340;

        sphere.scale.x = scale;
        sphere.scale.y = scale;
        sphere.scale.z = scale;

        sphereRadiusS = val;

        if(sphereRadiusS < schwarzschildRadius * 1.2) {

            while(sceneDualEmbedding.children.length > 0){ 
                sceneDualEmbedding.remove(sceneDualEmbedding.children[0]); 
            }
    
            loadEmbedding("Javascript/Assets/individual gltfs/embedding black hole.glb")

            // event horizon plane

            const eventHorizonPlaneGeometry = new THREE.PlaneGeometry( 8, 8, 28, 28 );
            const eventHorizonPlaneMaterial = new THREE.MeshBasicMaterial({color : 0x000000, opacity : 0.15, transparent : true, side : THREE.DoubleSide, morphTargets : true});
            eventHorizonPlaneMaterial.flatShading = false;
            eventHorizonPlaneMaterial.wireframe = true;
            const eventHorizonPlane = new THREE.Mesh( eventHorizonPlaneGeometry, eventHorizonPlaneMaterial );

            eventHorizonPlane.position.set(3.1, 0, -0.7);
            eventHorizonPlane.rotation.y = -Math.PI/2.33;

            // plane 2

            const eventHorizonPlane2 = new THREE.Mesh( eventHorizonPlaneGeometry, eventHorizonPlaneMaterial );

            eventHorizonPlane2.position.set(-3.1, 0, 0.7);
            eventHorizonPlane2.rotation.y = -Math.PI/2.33;

            sceneDualEmbedding.add( eventHorizonPlane );
            sceneDualEmbedding.add( eventHorizonPlane2 );

            // singularity sphere

                                var sphereRadius2 = 0.05;

                                const geometrySphere2 = new THREE.SphereGeometry(sphereRadius2, 64, 32);
                    
                                const materialSphere2 = new THREE.MeshNormalMaterial({opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true});
                                materialSphere2.flatShading = false;
                    
                                const sphere2 = new THREE.Mesh(geometrySphere2, materialSphere2);
                    
                                sceneDualEmbedding.add(sphere2);

            // label for black hole

            eventHorizonLabelDiv.textContent = "Event Horizon";
            eventHorizonLabelDiv2.textContent = "Event Horizon";

            eventHorizonPlane.add( eventHorizonLabel );
            eventHorizonPlane2.add( eventHorizonLabel2 );

        } else {

            while(sceneDualEmbedding.children.length > 0){ 
                sceneDualEmbedding.remove(sceneDualEmbedding.children[0]); 
            }
    
            loadEmbedding("Javascript/Assets/individual gltfs/embedding 4 animated.glb");

            // label for black hole
            eventHorizonLabelDiv.textContent = "";
            eventHorizonLabelDiv2.textContent = "";

        }
        
    })    

    EHlabelRenderer = new THREE.CSS2DRenderer();
    EHlabelRenderer.setSize( dimensions.width, dimensions.height - 2*dimensions.margin.top - 2*dimensions.margin.bottom );
    EHlabelRenderer.domElement.style.position = 'absolute';
    EHlabelRenderer.domElement.style.top = '0';
    embeddingDualDiv.appendChild( EHlabelRenderer.domElement );

    // orbit controls 2

            const controls2 = new THREE.OrbitControls(cameraDualEmbedding, EHlabelRenderer.domElement);
            controls2.enableZoom = false;

    // rendering function sphere

            function animateSphere() {

                requestAnimationFrame(animateSphere);
                rendererSphere.render(sceneSphere,cameraSphere);
    
                labelRenderer.render(sceneSphere, cameraSphere);
                EHlabelRenderer.render(sceneDualEmbedding, cameraDualEmbedding);
    
            }
    
            animateSphere();

}

embeddingGravity();