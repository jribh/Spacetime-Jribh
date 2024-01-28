async function rotatingDisc() {

    //rectangles and grids
    
    let dimensions = {
        rotatingDiscDiv: {
            width : 600,
            height : 500
        },
        rect: {
            width : 400,
            height : 500
        },
        padding: {
            top : 50,
            bottom : 25,
            left : 50,
            right: 50
        },
        circleRadius : 200
    }
    
    // slider
    
    var slider = d3
        .sliderHorizontal()
        .min(0)
        .max(0.99)
        .tickFormat(d3.format('.0%'))
        .width(350)
        .displayValue(true)
        .handle(
            d3
              .symbol()
              .type(d3.symbolCircle)
              .size(200)()
        );
        
    var sliderSvg = d3.select('#slider-rotatingdisc')
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .style("margin-top", -30)
        .append('g')
        .attr('transform', 'translate(70,30)')
        .call(slider);
    
    
    var rotatingDiscDiv = d3
                        .select("#rotating-disc")
                        .append("svg")
                        .attr("width", dimensions.rotatingDiscDiv.width)
                        .attr("height", dimensions.rotatingDiscDiv.height);
    
   rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2)
                .attr('cy', dimensions.rotatingDiscDiv.height/2)
                .attr('r', dimensions.circleRadius)
                .attr('stroke', 'none')
                .attr('fill', '#E6E7E8');

    rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2)
                .attr('cy', dimensions.rotatingDiscDiv.height/2)
                .attr('r', dimensions.circleRadius/2)
                .attr('stroke', '#BCBEC0')
                .attr('fill', "none")
                .style('stroke-dasharray', ("4,4"));

    // inner rotating circles

    var innerCircle1 = rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2)
                .attr('cy', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius/2)
                .attr('r', dimensions.circleRadius/24)
                .attr('stroke', 'none')
                .attr('fill', '#D8416E');

    var innerCircle2 = rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2)
                .attr('cy', dimensions.rotatingDiscDiv.height/2 + dimensions.circleRadius/2)
                .attr('r', dimensions.circleRadius/24)
                .attr('stroke', 'none')
                .attr('fill', '#D8416E');

    var innerCircle3 = rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2 + dimensions.circleRadius/2)
                .attr('cy', dimensions.rotatingDiscDiv.height/2)
                .attr('r', dimensions.circleRadius/24)
                .attr('stroke', 'none')
                .attr('fill', '#D8416E');

    var innerCircle4 = rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius/2)
                .attr('cy', dimensions.rotatingDiscDiv.height/2)
                .attr('r', dimensions.circleRadius/24)
                .attr('stroke', 'none')
                .attr('fill', '#D8416E');

    // outer rotating circles

    var outerCircle1 = rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2)
                .attr('cy', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius + dimensions.circleRadius/24)
                .attr('r', dimensions.circleRadius/24)
                .attr('stroke', 'none')
                .attr('fill', '#3380A7');

    var outerCircle2 = rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2)
                .attr('cy', dimensions.rotatingDiscDiv.height/2 + dimensions.circleRadius - dimensions.circleRadius/24)
                .attr('r', dimensions.circleRadius/24)
                .attr('stroke', 'none')
                .attr('fill', '#3380A7');

    var outerCircle3 = rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2 + dimensions.circleRadius - dimensions.circleRadius/24)
                .attr('cy', dimensions.rotatingDiscDiv.height/2)
                .attr('r', dimensions.circleRadius/24)
                .attr('stroke', 'none')
                .attr('fill', '#3380A7');

    var outerCircle4 = rotatingDiscDiv.append('circle')
                .attr('cx', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius + dimensions.circleRadius/24)
                .attr('cy', dimensions.rotatingDiscDiv.height/2)
                .attr('r', dimensions.circleRadius/24)
                .attr('stroke', 'none')
                .attr('fill', '#3380A7');


    // rotating lines

    var rotatingLine1 = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius)
                .attr('y1', dimensions.rotatingDiscDiv.height/2)
                .attr('x2', dimensions.rotatingDiscDiv.width/2 + dimensions.circleRadius)
                .attr('y2', dimensions.rotatingDiscDiv.height/2)
                .attr('stroke', '#BCBEC0');

    var rotatingLine2 = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius * 0.707)
                .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius * 0.707)
                .attr('x2', dimensions.rotatingDiscDiv.width/2 + dimensions.circleRadius * 0.707)
                .attr('y2', dimensions.rotatingDiscDiv.height/2 + dimensions.circleRadius * 0.707)
                .attr('stroke', '#BCBEC0');

    var rotatingLine3 = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2)
                .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius)
                .attr('x2', dimensions.rotatingDiscDiv.width/2)
                .attr('y2', dimensions.rotatingDiscDiv.height/2 + dimensions.circleRadius)
                .attr('stroke', '#BCBEC0');

    var rotatingLine4 = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2 + dimensions.circleRadius * 0.707)
                .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius * 0.707)
                .attr('x2', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius * 0.707)
                .attr('y2', dimensions.rotatingDiscDiv.height/2 + dimensions.circleRadius * 0.707)
                .attr('stroke', '#BCBEC0');

    // arrowhead top

    var topArrowLine = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2)
                .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius)
                .attr('x2', dimensions.rotatingDiscDiv.width/2)
                .attr('y2', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius)
                .attr('stroke', '#490097')
                .attr("stroke-width", 4);

    var topArrowTriangleSvg = d3.symbol().type(d3.symbolTriangle).size(75);
    
    var topArrowTriangle =  rotatingDiscDiv.append("path")
        .attr("d", topArrowTriangleSvg)
        .attr("stroke", 'none')
        .attr("fill", 'none')
        .attr("transform", `translate(${dimensions.rotatingDiscDiv.width / 2 - dimensions.circleRadius},${dimensions.rotatingDiscDiv.height / 2 - dimensions.circleRadius}) rotate(270)`)

    // arrowhead top

    var bottomArrowLine = rotatingDiscDiv.append('line')
        .attr('x1', dimensions.rotatingDiscDiv.width/2)
        .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius/2)
        .attr('x2', dimensions.rotatingDiscDiv.width/2)
        .attr('y2', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius/2)
        .attr('stroke', '#EE3145')
        .attr("stroke-width", 4);

    var bottomArrowTriangleSvg = d3.symbol().type(d3.symbolTriangle).size(75);

    var bottomArrowTriangle =  rotatingDiscDiv.append("path")
        .attr("d", bottomArrowTriangleSvg)
        .attr("stroke", 'none')
        .attr("fill", 'none')
        .attr("transform", `translate(${dimensions.rotatingDiscDiv.width / 2 - dimensions.circleRadius/2},${dimensions.rotatingDiscDiv.height / 2 - dimensions.circleRadius/2}) rotate(270)`)
          
    // text boxes

    var rectOuterCircumference = rotatingDiscDiv.append('rect')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 20)
                            .attr('y', dimensions.padding.top - 8)
                            .attr('width', 20)
                            .attr('height', 20)
                            .attr("fill", "#ECF0F1")
                            .attr('stroke', '#BFBFBF');   

    var rectOuterTime = rotatingDiscDiv.append('rect')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 20)
                            .attr('y', dimensions.padding.top+16)
                            .attr('width', 20)
                            .attr('height', 20)
                            .attr("fill", "#ECF0F1")
                            .attr('stroke', '#BFBFBF');    

    var rectMiddleCircumference = rotatingDiscDiv.append('rect')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 20)
                            .attr('y', dimensions.padding.top+ 8 + dimensions.circleRadius*0.5)
                            .attr('width', 20)
                            .attr('height', 20)
                            .attr("fill", "#ECF0F1")
                            .attr('stroke', '#BFBFBF');    

    var rectMiddleTime = rotatingDiscDiv.append('rect')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 20)
                            .attr('y', dimensions.padding.top - 16 + dimensions.circleRadius*0.5)
                            .attr('width', 20)
                            .attr('height', 20)
                            .attr("fill", "#ECF0F1")
                            .attr('stroke', '#BFBFBF');   

    var rectInnerCircumference = rotatingDiscDiv.append('rect')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 20)
                            .attr('y', dimensions.padding.top - 24 + dimensions.circleRadius)
                            .attr('width', 20)
                            .attr('height', 20)
                            .attr("fill", "#ECF0F1")
                            .attr('stroke', '#BFBFBF');

    var rectInnerTime = rotatingDiscDiv.append('rect')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 20)
                            .attr('y', dimensions.padding.top + dimensions.circleRadius)
                            .attr('width', 20)
                            .attr('height', 20)
                            .attr("fill", "#ECF0F1")
                            .attr('stroke', '#BFBFBF');    
    
    // text

    var outerCircumference = rotatingDiscDiv.append('text')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 26)
                            .attr('y', dimensions.padding.top+8)
                            .text('L');

    var outerTime = rotatingDiscDiv.append('text')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 26)
                            .attr('y', dimensions.padding.top+32)
                            .text('T');

    var middleCircumference = rotatingDiscDiv.append('text')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 26)
                            .attr('y', dimensions.padding.top + dimensions.circleRadius * 0.5)
                            .text('L');

    var middleTime = rotatingDiscDiv.append('text')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 26)
                            .attr('y', dimensions.padding.top+ dimensions.circleRadius * 0.5 + 24)
                            .text('T');

    var innerCircumference = rotatingDiscDiv.append('text')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 26)
                            .attr('y', dimensions.padding.top+ dimensions.circleRadius - 8)
                            .text('L');

    var innerTime = rotatingDiscDiv.append('text')
                            .attr('x',dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 26)
                            .attr('y', dimensions.padding.top + dimensions.circleRadius + 16)
                            .text('T');

    // label lines

    var labelLineOuter = rotatingDiscDiv.append('line')
                                        .attr('x1', dimensions.rotatingDiscDiv.width/2 + 60)
                                        .attr('y1', dimensions.padding.top + 2)
                                        .attr('x2', dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 16)
                                        .attr('y2', dimensions.padding.top + 2)
                                        .attr('stroke', '#BCBEC0');

    var labelLineMiddle = rotatingDiscDiv.append('line')
                                        .attr('x1', dimensions.rotatingDiscDiv.width/2 - 10 + dimensions.circleRadius)
                                        .attr('y1',  dimensions.padding.top+ 8 + dimensions.circleRadius*0.5 - 14)
                                        .attr('x2', dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 16)
                                        .attr('y2',  dimensions.padding.top+ 8 + dimensions.circleRadius*0.5 - 14)
                                        .attr('stroke', '#BCBEC0');

    var labelLineMiddle = rotatingDiscDiv.append('line')
                                        .attr('x1', dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 5)
                                        .attr('y1',  dimensions.padding.top+ 8 + dimensions.circleRadius - 22)
                                        .attr('x2', dimensions.circleRadius + dimensions.rotatingDiscDiv.width/2 + 16)
                                        .attr('y2',  dimensions.padding.top+ 8 + dimensions.circleRadius - 22)
                                        .attr('stroke', '#BCBEC0');

    // rotations

    let angle, interpolRotate;

    angle = -90;

    slider.on('onchange', (val) => {

        interpolRotate = d3.interpolateString(`rotate(0,${dimensions.rotatingDiscDiv.width / 2},${dimensions.rotatingDiscDiv.height / 2})`, `rotate(${angle}, ${dimensions.rotatingDiscDiv.width / 2},${dimensions.rotatingDiscDiv.height / 2})`);

        if(val*1000 > 10) {
            angle = val*-3000;  
        
        }
        else {
            angle = 0;

        }

        rotate();

        // arrowhead top

        topArrowLine
            .attr('x1', dimensions.rotatingDiscDiv.width/2)
            .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius)
            .attr('x2', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius*val)
            .attr('y2', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius)
            .attr('stroke', '#490097')
            .attr("stroke-width", val*4);

        topArrowTriangle
            .attr("d", topArrowTriangleSvg)
            .attr("stroke", '#490097')
            .attr("fill", '#490097')
            .attr("transform", `translate(${dimensions.rotatingDiscDiv.width / 2 - dimensions.circleRadius*val},${dimensions.rotatingDiscDiv.height / 2 - dimensions.circleRadius}) rotate(270) scale(${val*1.5})`)

        // arrowhead top

        bottomArrowLine
            .attr('x1', dimensions.rotatingDiscDiv.width/2)
            .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius/2)
            .attr('x2', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius/2*val)
            .attr('y2', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius/2)
            .attr('stroke', '#EE3145')
            .attr("stroke-width", val*4);

        bottomArrowTriangle
            .attr("d", bottomArrowTriangleSvg)
            .attr("stroke", '#EE3145')
            .attr("fill", '#EE3145')
            .attr("transform", `translate(${dimensions.rotatingDiscDiv.width / 2 - dimensions.circleRadius/2*val},${dimensions.rotatingDiscDiv.height / 2 - dimensions.circleRadius/2}) rotate(270) scale(${val*1.5})`)

        if(val*1000 < 3) {

            topArrowTriangle
                .attr("d", topArrowTriangleSvg)
                .attr("stroke", 'none')
                .attr("fill", 'none')
                .attr("transform", `translate(${dimensions.rotatingDiscDiv.width / 2 - dimensions.circleRadius*val},${dimensions.rotatingDiscDiv.height / 2 - dimensions.circleRadius}) rotate(270)`)

            bottomArrowTriangle
                .attr("d", bottomArrowTriangleSvg)
                .attr("stroke", 'none')
                .attr("fill", 'none')
                .attr("transform", `translate(${dimensions.rotatingDiscDiv.width / 2 - dimensions.circleRadius/2*val},${dimensions.rotatingDiscDiv.height / 2 - dimensions.circleRadius/2}) rotate(270)`)

        }

        //text

        innerCircumferenceRatio = Math.round(Math.sqrt(1- ((val*val))) * 100);

        middleCircumferenceRatio = Math.round(Math.sqrt(1- ((val*val*0.25))) * 100);

        

        if(val>0.2) {

            middleCircumference
                .text(`L * ${middleCircumferenceRatio/100}`);

            middleTime
                .text(`T * ${middleCircumferenceRatio/100}`);

            rectMiddleCircumference
                .transition()
                .duration(80)
                .attr('width', 70);

            rectMiddleTime
                .transition()
                .duration(80)
                .attr('width', 70);



        } else {

            middleCircumference
                .text(`L`);

            middleTime
                .text(`T`);

            rectMiddleCircumference
                .transition()
                .duration(80)
                .attr('width', 20);

            rectMiddleTime
                .transition()
                .duration(80)
                .attr('width', 20);



        }

        if(val>0.1) {

            innerCircumference
                        .text(`L * ${innerCircumferenceRatio/100}`);

            outerTime
                        .text(`T * ${innerCircumferenceRatio/100}`);

            rectOuterTime
                .transition()
                .duration(80)
                .attr('width', 70);

            rectInnerCircumference
                .transition()
                .duration(80)
                .attr('width', 70);

        } else {

            innerCircumference
                        .text(`L`);

            outerTime
                        .text(`T`);

            rectOuterTime
                        .transition()
                        .duration(80)
                        .attr('width', 20);

            rectInnerCircumference
                .transition()
                .duration(80)
                .attr('width', 20);

        }

    })

    function rotate() {

        rotatingLine1
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

        rotatingLine2
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);


        rotatingLine3
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);


        rotatingLine4
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

        innerCircle1
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

        innerCircle2
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

        innerCircle3
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

        innerCircle4
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

        outerCircle1
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

        outerCircle2
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

        outerCircle3
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

        outerCircle4
                .transition()
                .duration(12000)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", rotate);

    }    

    var vertLine = rotatingDiscDiv.append('line')
                        .attr('x1', dimensions.rotatingDiscDiv.width/2)
                        .attr('y1', dimensions.rotatingDiscDiv.height/2)
                        .attr('x2', dimensions.rotatingDiscDiv.width/2)
                        .attr('y2', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius)
                        .attr('stroke', 'black')
                        .style('stroke-dasharray', ("4,4"));

    rotatingDiscDiv.append('circle')
                        .attr('cx', dimensions.rotatingDiscDiv.width/2)
                        .attr('cy', dimensions.rotatingDiscDiv.height/2)
                        .attr('r', dimensions.circleRadius/16)
                        .attr('stroke', 'none')
                        .attr('fill', '#BCBEC0');

}
    
rotatingDisc();