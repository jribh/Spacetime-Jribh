async function rotatingDisc() {

    //rectangles and grids
    
    let dimensions = {
        rotatingDiscDiv: {
            width : 500,
            height : 400
        },
        rect: {
            width : 250,
            height : 400
        },
        padding: {
            top : 50,
            bottom : 25,
            left : 50,
            right: 50
        },
        circleRadius : 125
    }
    
    // slider
    
    var slider = d3
        .sliderHorizontal()
        .min(0)
        .max(1)
        .tickFormat(d3.format('.0%'))
        .width(350)
        .displayValue(false)
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
        .style("margin-top", 20)
        .append('g')
        .attr('transform', 'translate(70,30)')
        .call(slider);

    // var circleSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="431.851" height="431.851" viewBox="0 0 431.851 431.851" id="merry-go-round-svg">
    //                 <g id="merry_go_round" data-name="merry go round" transform="translate(0 0)">
    //                 <path id="Path_7" data-name="Path 7" d="M99.59,291.73a215,215,0,0,0-28.9,108H286.62Z" transform="translate(-70.69 -183.78)" fill="#d1d3d4"/>
    //                 <path id="Path_8" data-name="Path 8" d="M178.64,212.68a217,217,0,0,0-79,79.05l187,108Z" transform="translate(-70.69 -183.78)" fill="#bcbec0"/>
    //                 <path id="Path_9" data-name="Path 9" d="M394.59,212.68a215,215,0,0,0-108-28.9V399.71Z" transform="translate(-70.69 -183.78)" fill="#e6e7e8"/>
    //                 <path id="Path_10" data-name="Path 10" d="M502.54,399.71a214.9,214.9,0,0,0-28.9-108l-187,108Z" transform="translate(-70.69 -183.78)" fill="#e6e7e8"/>
    //                 <path id="Path_11" data-name="Path 11" d="M473.64,291.73a217,217,0,0,0-79.05-79.05l-108,187Z" transform="translate(-70.69 -183.78)" fill="#f1f2f2"/>
    //                 <path id="Path_12" data-name="Path 12" d="M286.62,183.78a215,215,0,0,0-108,28.9l108,187Z" transform="translate(-70.69 -183.78)" fill="#d1d3d4"/>
    //                 <path id="Path_13" data-name="Path 13" d="M70.69,399.71a215,215,0,0,0,28.9,108l187-108Z" transform="translate(-70.69 -183.78)" fill="#e6e7e8"/>
    //                 <path id="Path_14" data-name="Path 14" d="M286.62,615.63a214.89,214.89,0,0,0,108-28.9l-108-187Z" transform="translate(-70.69 -183.78)" fill="#d1d3d4"/>
    //                 <path id="Path_15" data-name="Path 15" d="M286.62,399.71l187,108a214.889,214.889,0,0,0,28.9-108Z" transform="translate(-70.69 -183.78)" fill="#d1d3d4"/>
    //                 <path id="Path_16" data-name="Path 16" d="M394.59,586.73a217,217,0,0,0,79.05-79.05l-187-108Z" transform="translate(-70.69 -183.78)" fill="#bcbec0"/>
    //                 <path id="Path_17" data-name="Path 17" d="M99.59,507.68a217,217,0,0,0,79,79.05l108-187Z" transform="translate(-70.69 -183.78)" fill="#f1f2f2"/>
    //                 <path id="Path_18" data-name="Path 18" d="M178.64,586.73a214.9,214.9,0,0,0,108,28.9V399.71Z" transform="translate(-70.69 -183.78)" fill="#e6e7e8"/>
    //                 <circle id="Ellipse_24" data-name="Ellipse 24" cx="11.31" cy="11.31" r="11.31" transform="translate(204.64 204.61)" fill="#939598"/>
    //                 <circle id="Ellipse_25" data-name="Ellipse 25" cx="8.42" cy="8.42" r="8.42" transform="translate(180.71 103.63)" fill="#d8416e"/>
    //                 <circle id="Ellipse_26" data-name="Ellipse 26" cx="8.42" cy="8.42" r="8.42" transform="translate(152.33 10.96)" fill="#3380a7"/>
    //                 <circle id="Ellipse_27" data-name="Ellipse 27" cx="8.42" cy="8.42" r="8.42" transform="translate(104.15 178.77)" fill="#d8416e"/>
    //                 <circle id="Ellipse_28" data-name="Ellipse 28" cx="8.42" cy="8.42" r="8.42" transform="translate(9.71 157.01)" fill="#3380a7"/>
    //                 <circle id="Ellipse_29" data-name="Ellipse 29" cx="8.42" cy="8.42" r="8.42" transform="translate(130.95 282.64)" fill="#d8416e"/>
    //                 <circle id="Ellipse_30" data-name="Ellipse 30" cx="8.42" cy="8.42" r="8.42" transform="translate(64.88 353.55)" fill="#3380a7"/>
    //                 <circle id="Ellipse_31" data-name="Ellipse 31" cx="8.42" cy="8.42" r="8.42" transform="translate(234.3 311.37)" fill="#d8416e"/>
    //                 <circle id="Ellipse_32" data-name="Ellipse 32" cx="8.42" cy="8.42" r="8.42" transform="translate(262.67 404.04)" fill="#3380a7"/>
    //                 <circle id="Ellipse_33" data-name="Ellipse 33" cx="8.42" cy="8.42" r="8.42" transform="translate(310.86 236.23)" fill="#d8416e"/>
    //                 <circle id="Ellipse_34" data-name="Ellipse 34" cx="8.42" cy="8.42" r="8.42" transform="translate(405.3 257.99)" fill="#3380a7"/>
    //                 <circle id="Ellipse_35" data-name="Ellipse 35" cx="8.42" cy="8.42" r="8.42" transform="translate(284.06 132.36)" fill="#d8416e"/>
    //                 <circle id="Ellipse_36" data-name="Ellipse 36" cx="8.42" cy="8.42" r="8.42" transform="translate(350.13 61.45)" fill="#3380a7"/>
    //                 <path id="Path_19" data-name="Path 19" d="M393.88,399.7A107.23,107.23,0,0,1,286.65,506.93c-142.24-5.65-142.2-208.84,0-214.46A107.23,107.23,0,0,1,393.88,399.7Z" transform="translate(-70.69 -183.78)" fill="none" stroke="#808285" stroke-miterlimit="10" stroke-width="0.5" stroke-dasharray="8.02 8.02"/>
    //                 </g>
    //             </svg>`

    var circleSvgCode = `<g id="merry_go_round" data-name="merry go round" transform="translate(0 0)">
                    <path id="Path_7" data-name="Path 7" d="M99.59,291.73a215,215,0,0,0-28.9,108H286.62Z" transform="translate(-70.69 -183.78)" fill="#d1d3d4"/>
                    <path id="Path_8" data-name="Path 8" d="M178.64,212.68a217,217,0,0,0-79,79.05l187,108Z" transform="translate(-70.69 -183.78)" fill="#bcbec0"/>
                    <path id="Path_9" data-name="Path 9" d="M394.59,212.68a215,215,0,0,0-108-28.9V399.71Z" transform="translate(-70.69 -183.78)" fill="#e6e7e8"/>
                    <path id="Path_10" data-name="Path 10" d="M502.54,399.71a214.9,214.9,0,0,0-28.9-108l-187,108Z" transform="translate(-70.69 -183.78)" fill="#e6e7e8"/>
                    <path id="Path_11" data-name="Path 11" d="M473.64,291.73a217,217,0,0,0-79.05-79.05l-108,187Z" transform="translate(-70.69 -183.78)" fill="#f1f2f2"/>
                    <path id="Path_12" data-name="Path 12" d="M286.62,183.78a215,215,0,0,0-108,28.9l108,187Z" transform="translate(-70.69 -183.78)" fill="#d1d3d4"/>
                    <path id="Path_13" data-name="Path 13" d="M70.69,399.71a215,215,0,0,0,28.9,108l187-108Z" transform="translate(-70.69 -183.78)" fill="#e6e7e8"/>
                    <path id="Path_14" data-name="Path 14" d="M286.62,615.63a214.89,214.89,0,0,0,108-28.9l-108-187Z" transform="translate(-70.69 -183.78)" fill="#d1d3d4"/>
                    <path id="Path_15" data-name="Path 15" d="M286.62,399.71l187,108a214.889,214.889,0,0,0,28.9-108Z" transform="translate(-70.69 -183.78)" fill="#d1d3d4"/>
                    <path id="Path_16" data-name="Path 16" d="M394.59,586.73a217,217,0,0,0,79.05-79.05l-187-108Z" transform="translate(-70.69 -183.78)" fill="#bcbec0"/>
                    <path id="Path_17" data-name="Path 17" d="M99.59,507.68a217,217,0,0,0,79,79.05l108-187Z" transform="translate(-70.69 -183.78)" fill="#f1f2f2"/>
                    <path id="Path_18" data-name="Path 18" d="M178.64,586.73a214.9,214.9,0,0,0,108,28.9V399.71Z" transform="translate(-70.69 -183.78)" fill="#e6e7e8"/>
                    <circle id="Ellipse_24" data-name="Ellipse 24" cx="11.31" cy="11.31" r="11.31" transform="translate(204.64 204.61)" fill="#939598"/>
                    <circle id="Ellipse_25" data-name="Ellipse 25" cx="8.42" cy="8.42" r="8.42" transform="translate(180.71 103.63)" fill="#d8416e"/>
                    <circle id="Ellipse_26" data-name="Ellipse 26" cx="8.42" cy="8.42" r="8.42" transform="translate(152.33 10.96)" fill="#3380a7"/>
                    <circle id="Ellipse_27" data-name="Ellipse 27" cx="8.42" cy="8.42" r="8.42" transform="translate(104.15 178.77)" fill="#d8416e"/>
                    <circle id="Ellipse_28" data-name="Ellipse 28" cx="8.42" cy="8.42" r="8.42" transform="translate(9.71 157.01)" fill="#3380a7"/>
                    <circle id="Ellipse_29" data-name="Ellipse 29" cx="8.42" cy="8.42" r="8.42" transform="translate(130.95 282.64)" fill="#d8416e"/>
                    <circle id="Ellipse_30" data-name="Ellipse 30" cx="8.42" cy="8.42" r="8.42" transform="translate(64.88 353.55)" fill="#3380a7"/>
                    <circle id="Ellipse_31" data-name="Ellipse 31" cx="8.42" cy="8.42" r="8.42" transform="translate(234.3 311.37)" fill="#d8416e"/>
                    <circle id="Ellipse_32" data-name="Ellipse 32" cx="8.42" cy="8.42" r="8.42" transform="translate(262.67 404.04)" fill="#3380a7"/>
                    <circle id="Ellipse_33" data-name="Ellipse 33" cx="8.42" cy="8.42" r="8.42" transform="translate(310.86 236.23)" fill="#d8416e"/>
                    <circle id="Ellipse_34" data-name="Ellipse 34" cx="8.42" cy="8.42" r="8.42" transform="translate(405.3 257.99)" fill="#3380a7"/>
                    <circle id="Ellipse_35" data-name="Ellipse 35" cx="8.42" cy="8.42" r="8.42" transform="translate(284.06 132.36)" fill="#d8416e"/>
                    <circle id="Ellipse_36" data-name="Ellipse 36" cx="8.42" cy="8.42" r="8.42" transform="translate(350.13 61.45)" fill="#3380a7"/>
                    <path id="Path_19" data-name="Path 19" d="M393.88,399.7A107.23,107.23,0,0,1,286.65,506.93c-142.24-5.65-142.2-208.84,0-214.46A107.23,107.23,0,0,1,393.88,399.7Z" transform="translate(-70.69 -183.78)" fill="none" stroke="#808285" stroke-miterlimit="10" stroke-width="0.5" stroke-dasharray="8.02 8.02"/>
                    </g>`
    
    var rotatingDiscDiv = d3
                        .select("#rotating-disc")
                        .append("svg")
                        .attr("width", dimensions.rotatingDiscDiv.width)
                        .attr("height", dimensions.rotatingDiscDiv.height);
    
//    rotatingDiscDiv.append('circle')
//                 .attr('cx', dimensions.rotatingDiscDiv.width/2)
//                 .attr('cy', dimensions.rotatingDiscDiv.height/2)
//                 .attr('r', dimensions.circleRadius)
//                 .attr('stroke', 'black')
//                 .attr('fill', 'none');

    let circleSvgD3 = d3.select('#rotating-disc').append('svg').html(circleSvgCode);

    // let circleSvg = document.querySelector("#merry-go-round-svg")

    // circleSvg.style.zIndex = -1;

    // circleSvg.setAttribute('height', dimensions.circleRadius * 2)

    
    // vertical dashed line
    
    var vertLine = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2)
                .attr('y1', dimensions.rotatingDiscDiv.height/2)
                .attr('x2', dimensions.rotatingDiscDiv.width/2)
                .attr('y2', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius)
                .attr('stroke', 'black')
                .style('stroke-dasharray', ("4,4"));

    // rotating lines

    var rotatingLine1 = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius)
                .attr('y1', dimensions.rotatingDiscDiv.height/2)
                .attr('x2', dimensions.rotatingDiscDiv.width/2 + dimensions.circleRadius)
                .attr('y2', dimensions.rotatingDiscDiv.height/2)
                .attr('stroke', '#adb5bd');

    var rotatingLine2 = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius * 0.707)
                .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius * 0.707)
                .attr('x2', dimensions.rotatingDiscDiv.width/2 + dimensions.circleRadius * 0.707)
                .attr('y2', dimensions.rotatingDiscDiv.height/2 + dimensions.circleRadius * 0.707)
                .attr('stroke', '#adb5bd');

    var rotatingLine3 = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2)
                .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius)
                .attr('x2', dimensions.rotatingDiscDiv.width/2)
                .attr('y2', dimensions.rotatingDiscDiv.height/2 + dimensions.circleRadius)
                .attr('stroke', '#adb5bd');

    var rotatingLine4 = rotatingDiscDiv.append('line')
                .attr('x1', dimensions.rotatingDiscDiv.width/2 + dimensions.circleRadius * 0.707)
                .attr('y1', dimensions.rotatingDiscDiv.height/2 - dimensions.circleRadius * 0.707)
                .attr('x2', dimensions.rotatingDiscDiv.width/2 - dimensions.circleRadius * 0.707)
                .attr('y2', dimensions.rotatingDiscDiv.height/2 + dimensions.circleRadius * 0.707)
                .attr('stroke', 'black');

    // rotatingLine1.attr("transform", "rotate(0," + dimensions.rotatingDiscDiv.width/2 + "," + dimensions.rotatingDiscDiv.height/2 + ")")
    //             .transition()
    //             .duration(1000)
    //             .attr("transform", "rotate(20," + dimensions.rotatingDiscDiv.width/2 + "," + dimensions.rotatingDiscDiv.height/2 + ")")

    var interpolRotate = d3.interpolateString("rotate(0," + dimensions.rotatingDiscDiv.width/2 + "," + dimensions.rotatingDiscDiv.height/2 + ")", "rotate(-180," + dimensions.rotatingDiscDiv.width/2 + "," + dimensions.rotatingDiscDiv.height/2 + ")");

    function animateLine(t) {

        rotatingLine1
                .transition()
                .duration(t)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", animateLine);

        rotatingLine2
                .transition()
                .duration(t)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", animateLine);


        rotatingLine3
                .transition()
                .duration(t)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", animateLine);


        rotatingLine4
                .transition()
                .duration(t)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", animateLine);

        circleSvgD3
                .transition()
                .duration(t)
                .ease(d3.easeLinear)
                .attrTween("transform", function(d, i, a) {
                    return interpolRotate;
                })
                .on("end", animateLine);

        

    }

    animateLine(1500);

    // rotatingLine1
    //             .transition()
    //             .duration(1000)
    //             .attr("transform", tween)

    // function tween() {
    //     return d3.interpolateString("rotate(0, 250, 200)", "rotate(100, 250, 200")
    // }
    

    }
    
    rotatingDisc();