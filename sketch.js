const flock = [];

let alignSlider,cohesionSlider,seperationSlider;

function setup() {
    createCanvas(1000, 1000);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    seperationSlider = createSlider(0, 5, 1, 0.1);
    for (let i = 0; i< 100; i++){
        flock.push(new Boid());
    }
  }

function draw() {
    background(50);

    for (let boid of flock){
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
  }