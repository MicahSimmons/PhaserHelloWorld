
/*************/
/* PARTICLE  */
/*************/


class Particle {
    constructor(letter, x, y, angle) {
        this.letter = letter;
        this.start = { x: x, y: y};
        this.angle = angle;
    }



    preload() {}
    create() {}

    update(deltaTime) {
        //letter.x += Math.cos(letter.move_angle) * 200 * deltaTime / 1000;
        //letter.y += Math.sin(letter.move_angle) * 200 * deltaTime / 1000;  
    
        if ((letter.x < 0) ||
            (letter.x > GAME_X_BOUNDS) ||
            (letter.y < 0) ||
            (letter.y > GAME_Y_BOUNDS)) {
          letter.destroy();
        }
    }
}

/*******************/
/* PARTICLE SYSTEM */
/*******************/

class ParticleSystem {
    constructor (scene, message) {
        this.scene = scene;
        this.textMessage = message;

        this.preload = this.preload.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.spawn = this.spawn.bind(this);
        
        this.randomLetter = this.randomLetter.bind(this);
        this.randomColor = this.randomColor.bind(this);

    }

    preload() {
        this.scene.load.image('bomb', 'images/bomb.png')
    }

    create() {
        this.targets = this.scene.physics.add.group({ collideWorldBounds: true });

        this.particles = this.scene.add.group();
        this.scene.physics.add.collider(this.targets, this.targets);
    }

    update(deltaTime) {
        this.particles.getChildren().forEach( (letter) => {
            letter.x = letter.target.x;
            letter.y = letter.target.y;

            //letter.x += Math.cos(letter.move_angle) * 200 * deltaTime / 1000;
            //letter.y += Math.sin(letter.move_angle) * 200 * deltaTime / 1000;  
            letter.angle += 5;

            /**
            if ((letter.x < 0) ||
                (letter.x > GAME_X_BOUNDS) ||
                (letter.y < 0) ||
                (letter.y > GAME_Y_BOUNDS)) {
                  letter.target.destroy();
                  letter.destroy();
            } **/
        });
    }

    randomLetter() {
        let index = Math.floor(Math.random() * this.textMessage.length);
        let letter = this.textMessage.charAt(index);
        return letter;
    }

    randomColor() {
        const randRed = Math.floor(Math.random() * 256);
        const randGreen = Math.floor(Math.random() * 256);
        const randBlue = Math.floor(Math.random() * 256);
    
        const randomColor = `rgb(${randRed}, ${randGreen}, ${randBlue})`;
        return randomColor;
    }

    spawn(x, y, angle) {
        let target = this.scene.physics.add.sprite(x, y, 'bomb');
        this.targets.add(target);
        target.setVelocityX(Math.cos(angle) * 100.0);
        target.setVelocityY(Math.sin(angle) * 20.0);
        target.setBounce(0.8);
        target.setVisible(false);
        target.setCollideWorldBounds(true);

        let particle = this.scene.add.text(x, y, this.randomLetter(), { fontFamily: 'Arial', fontSize: '24px', fill: this.randomColor() });
        particle.setOrigin(0.5);
        particle.move_angle = angle;
        particle.target = target;
        this.particles.add(particle);
    }
}