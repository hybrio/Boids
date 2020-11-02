class Boid {
    constructor(){
        this.perception = 100;
        this.size = 15;
        this.maxAcceleration = 0.2;
        this.maxSpeed = 3;
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.direction = this.velocity.copy();
        this.right = p5.Vector.mult(this.direction, this.size);
        this.left = p5.Vector.mult(this.direction, this.size);
        this.right.rotate(9);
        this.left.rotate(-9);
        this.velocity.setMag(random(0.5,1.5));
        this.acceleration = createVector();
    }

    edges(){
        if (this.position.x > width+this.size){
            this.position.x = 0;
        } else if(this.position.x < -this.size){
            this.position.x = width;
        }
        if (this.position.y > height+this.size) {
            this.position.y = 0;
        } else if(this.position.y < -this.size){
            this.position.y = height;
        }
    }

    align(boids){
        let aim = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
            if(d < this.perception){
                aim.add(other.velocity);
                total ++;   
            }
        }
        if (total > 0){
            aim.div(total);
            aim.setMag(this.maxSpeed);
            aim.sub(this.velocity);
            aim.limit(this.maxAcceleration);
        }
        return aim;
    }

    cohesion(boids){
        let aim = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
            if(other != this && d < this.perception){
                aim.add(other.position);
                total ++;   
            }
        }
        if (total > 0){
            aim.div(total);
            aim.sub(this.position);
            aim.setMag(this.maxSpeed);
            aim.sub(this.velocity);
            aim.limit(this.maxAcceleration);
        }
        return aim;
    }

    seperation(boids){
        let aim = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
            if(other != this && d < this.perception){
                let diff = p5.Vector.sub(this.position,other.position);
                diff.div(d);
                aim.add(diff);
                total ++;   
            }
        }
        if (total > 0){
            aim.div(total);
            aim.setMag(this.maxSpeed);
            aim.sub(this.velocity);
            aim.limit(this.maxAcceleration);
        }
        return aim;
    }

    flock(boids){
        this.acceleration.mult(0);
        let alignment = this.align(boids); 
        let cohesion = this.cohesion(boids);
        let seperation = this.seperation(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        seperation.mult(seperationSlider.value());

        this.acceleration.add(alignment); 
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation);
        
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.direction = this.velocity.copy();
        this.direction.normalize();
        this.right = p5.Vector.mult(this.direction, this.size);
        this.left = p5.Vector.mult(this.direction, this.size);
        this.right.rotate(9);
        this.left.rotate(-9);
        this.velocity.limit(this.maxSpeed);
    }


    show() {
        stroke(255);
        let leftPoint = p5.Vector.add(this.right, this.position);
        let rightPoint = p5.Vector.add(this.left, this.position);
        triangle(this.position.x,this.position.y, leftPoint.x, leftPoint.y,  rightPoint.x, rightPoint.y);
    }
}