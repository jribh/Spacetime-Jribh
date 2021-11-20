let appleDiv = document.querySelector("#apple-div");

let embeddingDiv = document.querySelector("#embedding-apple");

async function embeddingAppleFunction() {

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

    appleDiv.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.bottom + "px");

    embeddingDiv.setAttribute("style", "width : " + dimensions.width + "px; height : " + dimensions.height - dimensions.margin.top - dimensions.margin.bottom + "px");

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

    var sliderMassSvg = d3.select('#slider-mass-apple')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', 100)
        .style("transform", 25)
        .append('g')
        .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top/6}px)`)
        .call(sliderMass);


    // d3 apple

    const wrapperApple = d3
                    .select("#apple-div")
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

    // animating falling apple

    let time;

    // three.js canvas for embedding

    const sceneEmbedding = new THREE.Scene();

    sceneEmbedding.background = new THREE.Color(0xffffff);

    const cameraEmbedding = new THREE.PerspectiveCamera(10, dimensions.width / (dimensions.height - dimensions.margin.top - dimensions.margin.bottom), 0.1, 1000);

    const rendererEmbedding = new THREE.WebGLRenderer({antialias : true});

    rendererEmbedding.setSize(dimensions.width, dimensions.height - dimensions.margin.top - dimensions.margin.bottom);
    embeddingDiv.appendChild(rendererEmbedding.domElement);

    const lightsEmbedding = new THREE.HemisphereLight(0xFFFFFF, 1);
    sceneEmbedding.add(lightsEmbedding);

    const lightsDownEmbedding = new THREE.HemisphereLight(0x000000, 0xffffff, 0.5);
    sceneEmbedding.add(lightsDownEmbedding);

    cameraEmbedding.position.z = 350;

    //orbit controls

    const controls = new THREE.OrbitControls(cameraEmbedding, rendererEmbedding.domElement);
    controls.enableZoom = false;

    // vector for surface

    let b = 1;

    embeddingFunction(b);
    
    sliderMass.on("onchange", (val) => {

        b = Math.round(val) * 0.00879 + 1;

        while(sceneEmbedding.children.length > 0){ 
            sceneEmbedding.remove(sceneEmbedding.children[0]); 
        }

        embeddingFunction(b);

        // apple animating

        let t = 1 / Math.sqrt(val);

        time = 64444.444444444445 * t - 4444.444444444445;

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

    })

    function embeddingFunction(b) {

        const points = [];

        for(let i=16; i<96; i++) {

            let x=i/8;            

            let y = Math.sqrt((x-1)/(x-b));

            points.push(new THREE.Vector2(y,x));

        }

        const embeddingGeometry = new THREE.LatheGeometry(points, 36);

        const materialEmbeddingGeometry = new THREE.MeshNormalMaterial({opacity : 1, transparent : true, side : THREE.DoubleSide, morphTargets : true, polygonOffsetFactor : 1});

        const lathe = new THREE.Mesh(embeddingGeometry, materialEmbeddingGeometry);

        lathe.scale.x = 8;
        lathe.scale.y = 8;
        lathe.scale.z = 8;

        lathe.rotation.z = Math.PI / 2;
        lathe.rotation.y = Math.PI / 14;

        lathe.position.x = 55;

        sceneEmbedding.add(lathe);

    }

    // rendering function sphere

    function animateEmbedding() {
        requestAnimationFrame(animateEmbedding);
        rendererEmbedding.render(sceneEmbedding , cameraEmbedding);

    }

    animateEmbedding();
        

}

embeddingAppleFunction();