// A variable that we will use to store processed images
let src, img;
let slider1, slider2, slider3, slider4, slider5, slider6;
let osc, osc2, osc3;
let sel1,sel2,sel3;
let button;
let toggle = false;

let time = 1;
let fr = 50;
let counter = 0;
let imageIndex = 0;

// Run once before start.
// Most static image heavy-lifting should go here.
function setup() {
    //frameRate(fr);
  
  
    // Create a fullscreen canvas
    createCanvas(windowWidth, windowHeight);
    

    // button = createButton(toggle);
    // button.mousePressed(toggleValue);
    // button.position(200, 200);

    //RVal
    slider1 = createSlider(0, 255);
    slider1.position(10, 10);

    //GVal
    slider2 = createSlider(0, 255);
    slider2.position(10, 40);

    //BVal
    slider3 = createSlider(0, 255);
    slider3.position(10, 70);

    //AVal
    slider4 = createSlider(0, 255);
    slider4.position(10, 100);

    //WVal
    slider5 = createSlider(0, 1000);
    slider5.position(10, 130);

    //frameVal
    slider6 = createSlider(1, 60);
    slider6.position(10, 160);


    // sel1 = createSelect();
    // sel1.position(10 + 150, 10);
    // sel1.option('sine');
    // sel1.option('square');
    // sel1.option('sawtooth');
    // sel1.option('triangle');
    // sel1.changed(osc1Event);

    // sel2 = createSelect();
    // sel2.position(10 + 150, 40);
    // sel2.option('sine');
    // sel2.option('square');
    // sel2.option('sawtooth');
    // sel2.option('triangle');
    // sel2.changed(osc2Event);

    // sel3 = createSelect();
    // sel3.position(10 + 150, 70);
    // sel3.option('sine');
    // sel3.option('square');
    // sel3.option('sawtooth');
    // sel3.option('triangle');
    // sel3.changed(osc3Event);


    //Initial state
    // osc1Event();
    // osc2Event();
    // osc3Event();

     
    osc = new p5.Oscillator();
    osc.freq(220);
    osc.setType('triangle');
    osc.amp(0.5);
    osc.start();

    osc2 = new p5.Oscillator();
    osc2.freq(100);
    osc2.setType('square');
    osc2.amp(0.5);
    osc2.start();

    osc3 = new p5.Oscillator();
    osc3.freq(300);
    osc3.setType('sawtooth');
    osc3.amp(0.5);
    osc3.start();
}


// function osc1Event() {
//     let oc1 = sel1.value();
//     osc = new p5.Oscillator();
//     osc.freq(220);
//     osc.setType('oc1');
//     osc.amp(0.5);
//     osc.start();
// }

// function osc2Event() {
//     let oc2 = sel2.value();
//     osc2 = new p5.Oscillator();
//     osc2.freq(220);
//     osc2.setType('oc2');
//     osc2.amp(0.5);
//     osc2.start();
// }

// function osc3Event() { 
//     let oc3 = sel3.value();
//     osc3 = new p5.Oscillator();
//     osc3.freq(220);
//     osc3.setType('oc3');
//     osc3.amp(0.5);
//     osc3.start();
// }

// Run every frame
function draw() {
    
    let r = slider1.value();
    let g = slider2.value();
    let b = slider3.value();
    let a = slider4.value();
    let w = slider5.value();

    let frSlider = slider6.value();
    frameRate(frSlider);

    fill('white');
    text('R:' + r, 150, 25);
    textSize(15);

    fill('white');
    text('G:' + g, 150, 55);
    textSize(15);

    fill('white');
    text('B:' + b, 150, 85);
    textSize(15);

    fill('white');
    text('alpha:' + a, 150, 115);
    textSize(15);

    fill('white');
    text('Bar Width:' + w, 150, 145);
    textSize(15);


    //src = patternVerticalBandsImage(width, height, w, [r, g, b, a]);
    src = mathPatternDanny(width, height, w, r, g, b, a);
    // Use the generated image as background
    background(src);
    //image(src, 10, 10);

    src.loadPixels();

    //---V1: MOUSE HOVER---
    let x = mouseX;
    let y = mouseY;

    //Position of the rgba channel
    let index = (x + y * src.width) * 4;
    let rindex = index + 0;
    let gindex = index + 1;
    let bindex = index + 2;

    //ColorVal of the rgba channel 
    let rVal = src.pixels[rindex];
    let gVal = src.pixels[gindex];
    let bVal = src.pixels[bindex];


    console.log(map(rVal, 0, 255, 65, 500));
    osc.freq(map(rVal, 0, 255, 65, 500));
    osc2.freq(map(bVal, 0, 255, 65, 500));
    osc3.freq(map(gVal, 0, 255, 65, 500));

    // Create checker pattern
    //img = patternCheckersImage(width, height, mouseX, mouseY);
    //img = ColorpatternCheckersImage(width, height, mouseX, mouseY, [30, 100, 253, 150]);
    //img = patternCheckersImage(width, height, mouseX, mouseY);

}


// function toggleValue() {
//     if (mousePressed(toggle) = false) {
//         toggle = true;
//         osc.start();
//     } else {
//         toggle = false;
//         osc.stop();
//     }
// }


function mousePressed() {
   
    if (osc.started) {
        osc.stop();
    }
    else {
        osc.start();
    }

    if (osc2.started) {
        osc2.stop();
    }
    else {
        osc2.start();
    }

    if (osc3.started) {
        osc3.stop();
    }
    else {
        osc3.start();
    }
}

// Save the image when key pressed
function keyPressed() {
    if (key == 's' || key == 'S') {
        img.save('frame_' + frameCount, 'png');
    }
}