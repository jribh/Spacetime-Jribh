// Place this at the start of your code
const log = console.log;
console.log = () => {};
const warn = console.warn;
console.warn = () => {};
const error = console.error;
console.error = () => {};

function mainPage() {

    gsap.registerPlugin(ScrollTrigger);


    // for(let i=1; i<22; i++) {

    // if(i===8) {
    //     ScrollTrigger.create({
    //         trigger : `#pinned-container-${i}`,
    //         start : "top 100px",
    //         end : "bottom 830px",
    //         pin : `#sticky-viz-${i}`
    //     })
    // } else if(i===20) {
    //     ScrollTrigger.create({
    //         trigger : `#pinned-container-${i}`,
    //         start : "top 50px",
    //         end : "bottom 820px",
    //         pin : `#sticky-viz-${i}`
    //     })
    // }
    // else if(i===18) {
    //     ScrollTrigger.create({
    //         trigger : `#pinned-container-${i}`,
    //         start : "top 30px",
    //         end : "bottom 820px",
    //         pin : `#sticky-viz-${i}`
    //     })
    // }
    // else if(i===11) {
    //     ScrollTrigger.create({
    //         trigger : `#pinned-container-${i}`,
    //         start : "top 40px",
    //         end : "bottom 820px",
    //         pin : `#sticky-viz-${i}`
    //     })
    // }
    // else if(i===13) {
    //     ScrollTrigger.create({
    //         trigger : `#pinned-container-${i}`,
    //         start : "top 40px",
    //         end : "bottom 820px",
    //         pin : `#sticky-viz-${i}`
    //     })
    // }
    // else if(i===15) {
    //     ScrollTrigger.create({
    //         trigger : `#pinned-container-${i}`,
    //         start : "top 40px",
    //         end : "bottom 820px",
    //         pin : `#sticky-viz-${i}`
    //     })
    // }
    // else {
    //     ScrollTrigger.create({
    //         trigger : `#pinned-container-${i}`,
    //         start : "top 100px",
    //         end : "bottom 650px",
    //         pin : `#sticky-viz-${i}`
    //     })        
    // }

    // }

    // for top banner

    //slider

    let slider = document.querySelector("#top-banner-range");
    let bannerCircleSvg = document.querySelector("#banner-circle-svg");
    let bannerFireCircle = document.querySelector("#banner-fire-circle");

    let fireTrailSvg = document.querySelector("#fire-trail-svg");
    let bannerFireTrail = document.querySelector("#banner-fire-trail");

    let rocket = document.querySelector("#rocket-png-banner")

    let starsDiv = document.querySelector("#stars-div");

    let bannerWhiteTop = document.querySelector("#banner-white-top");
    let bannerBlue3Top = document.querySelector("#banner-blue-3-top");
    let bannerBlue2Top = document.querySelector("#banner-blue-2-top");

    let bannerWhiteBottom = document.querySelector("#banner-white-bottom");
    let bannerBlue3Bottom = document.querySelector("#banner-blue-3-bottom");
    let bannerBlue2Bottom = document.querySelector("#banner-blue-2-bottom");

    fireTrailSvg.style.height = 10;

    let topReduce, t, t2, t3, t4;

    slider.addEventListener("input", function() {

        let val = slider.value/1000;

        // val is 0.001 to 1

        bannerCircleSvg.style.width = 28.808 * val * 2 + 28.808;
        bannerCircleSvg.style.height = 28.808 * val * 2 + 28.808;

        topReduce = (28.808 * val * 2 + 28.808) / 2;

        bannerFireCircle.style.top = `${240 - topReduce}px`;
        bannerFireCircle.style.right = `${56.25-val*2}%`;

        // fire trail

        fireTrailSvg.style.height = 10 + 10 * val;

        bannerFireTrail.style.top = `${232 - ((5 + 10 * val) * val) / 4}px`
        bannerFireTrail.style.right = `${57-val}%`;

        // rocket

        rocket.style.width = `${350 - 350 * val * 0.3}px`;
        rocket.style.height = "122.82px";

    })

    slider.addEventListener("input", function() {

        let val = slider.value/1000;

        // background stars

        t = -44.44 * val + 50.44;

        t2 = -13.13 * val + 20.13;

        t3 = -10.1 * val + 15.1;

        t4 = -9.595 * val + 12.095;

        starsDiv.style.animation = `wave ${t}s linear infinite`;

        // divs

        bannerBlue2Top.style.animation = `wave ${t2}s linear infinite`;
        bannerBlue2Bottom.style.animation = `wave ${t2}s linear infinite`;

        bannerBlue3Top.style.animation = `wave ${t3}s linear infinite`; 
        bannerBlue3Bottom.style.animation = `wave ${t3}s linear infinite`; 

        bannerWhiteTop.style.animation = `wave ${t4}s linear infinite`; 
        bannerWhiteBottom.style.animation = `wave ${t4}s linear infinite`; 

    })

    // top banner ends

    // opacity when scrolled into view

    let leftAlignedText = document.querySelectorAll(".left-aligned-text");

    let viewportHeight = window.innerHeight;

    let textBoxesYHeighArray = [];

    document.addEventListener("scroll", function() {

        for(let i=0; i<leftAlignedText.length; i++) {

            textBoxesYHeighArray[i] = leftAlignedText[i].getBoundingClientRect().top;

            if(textBoxesYHeighArray[i]/viewportHeight < 0.65) {

                leftAlignedText[i].style.opacity = 1;
                leftAlignedText[i].style.transition = "opacity 0.25s"
    
            } else {
    
                leftAlignedText[i].style.opacity = 0.2;
    
            }

        }

    })

    // right aligned text

    let rightAlignedText = document.querySelectorAll(".right-aligned-text");

    let textBoxesYHeighArrayRight = [];

    document.addEventListener("scroll", function() {

        for(let i=0; i<leftAlignedText.length; i++) {

            textBoxesYHeighArrayRight[i] = rightAlignedText[i].getBoundingClientRect().top;

            if(textBoxesYHeighArrayRight[i]/viewportHeight < 0.65) {

                rightAlignedText[i].style.opacity = 1;
                rightAlignedText[i].style.transition = "opacity 0.25s"
    
            } else {
    
                rightAlignedText[i].style.opacity = 0.2;
    
            }

        }

    })

    // photon tube text

    let photonTubeParagraphs = document.querySelectorAll(".photon-tube-para");

    let paraHeights = [];

    document.addEventListener("scroll", function() {

        for(let i=0; i<photonTubeParagraphs.length; i++) {

            paraHeights[i] = photonTubeParagraphs[i].getBoundingClientRect().top;

            if(paraHeights[i]/viewportHeight < 0.7) {

                photonTubeParagraphs[i].style.opacity = 1;
                photonTubeParagraphs[i].style.transition = "opacity 0.25s"
    
            } else {
    
                photonTubeParagraphs[i].style.opacity = 0.2;
    
            }

        }

    })

}

mainPage();



