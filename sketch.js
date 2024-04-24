let prey = [];
let predators = [];

let preyCount = 10;
let predatorCount = 10;

let predatorDeathRate = 0.005;
let preyLifeRate = 0.02;


function setup(){
  createCanvas(windowWidth,windowHeight)
  // Inisialisasi prey
  for (let i = 0; i < preyCount; i++) {
    prey.push(new Prey());
  }

  // Inisialisasi predator
  for (let i = 0; i < predatorCount; i++) {
    predators.push(new Predator());
  }
}

function draw(){
  background(0)
  noStroke()

  // Perbarui dan tampilkan predator
  for (let predator of predators) {
    predator.update();
    predator.constrain();
    predator.render();
  }

  // Perbarui dan tampilkan prey
  for (let p of prey) {
    p.update();
    p.constrain();
    p.render();

    // Deteksi kolisi dengan predator
    for (let predator of predators) {
      if (p.collide(predator)) {
        // Jika kolisi terjadi, tambahkan predator baru
        predators.push(new Predator());

        // Kurangi jumlah prey
        prey.splice(prey.indexOf(p), 1);
        break;
      }
    }
  }

  // Tingkat kematian predator
  for (let i = predators.length - 1; i >= 0; i--) {
    if (random() < predatorDeathRate) {
      predators.splice(i, 1);
    }
  }

  // Tingkat kehidupan prey
  for (let i = 0; i < preyCount; i++) {
    if (random() < preyLifeRate) {
      prey.push(new Prey());
    }
  }  
}

class Prey {
  constructor() {
    this.pos = createVector(random(windowWidth), random(windowHeight));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.maxSpeed = 1;
    this.radius = 2;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill('yellow');
    ellipse(0, 0, this.radius * 2);
    pop();
  }

  collide(predator) {
    let d = dist(this.pos.x, this.pos.y, predator.pos.x, predator.pos.y);
    return d < this.radius + predator.radius;
  }

  constrain() {
    if (this.pos.x < 5) this.pos.x = 5;
    if (this.pos.x > windowWidth) this.pos.x = windowWidth;
    if (this.pos.y < 5) this.pos.y = 5;
    if (this.pos.y > windowHeight) this.pos.y = windowHeight;
  }
}

class Predator {
  constructor() {
    this.pos = createVector(random(windowWidth), random(windowHeight));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.maxSpeed = 1;
    this.radius = 2;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill('red');
    ellipse(0, 0, this.radius * 2);
    pop();
  }

    constrain() {
    if (this.pos.x < 5) this.pos.x = 5;
    if (this.pos.x > windowWidth) this.pos.x = windowWidth;
    if (this.pos.y < 5) this.pos.y = 5;
    if (this.pos.y > windowHeight) this.pos.y = windowHeight;
  }
}

// Event listener untuk mengubah tingkat kematian predator
function setPredatorDeathRate(value) {
  predatorDeathRate = value;
}

// Event listener untuk mengubah tingkat kehidupan prey
function setPreyLifeRate(value) {
  preyLifeRate = value;
}