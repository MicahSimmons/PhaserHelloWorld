
/*************/
/* PLAYER    */
/*************/


class Player {
    constructor(scene) {
        this.rotating = 0;
        this.textMessage = "Welcome!";
        this.scene = scene;

        this.particles = new ParticleSystem(scene, this.textMessage);

        this.preload = this.preload.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.updateMove = this.updateMove.bind(this);
        this.updateRotation = this.updateRotation.bind(this);
    }

    preload() {
        this.particles.preload();
    }

    create() {
        this.textbox = this.scene.add.text(100, 450, this.textMessage, { fontFamily: 'Arial', fontSize: '24px', fill: '#ccc' });
        this.textbox.setOrigin(0.5);

        // Set up input events for mouse click
        this.scene.input.on('pointerdown', (pointer) => {
            this.rotating = 360;
        });

        this.particles.create();
    }

    updateMove(deltaTime) {
        // Move player text towards the mouse position
        const pointer = this.scene.input.activePointer;
        let target = { x: pointer.x, y: pointer.y }

        const angle = Phaser.Math.Angle.Between(this.textbox.x, this.textbox.y, target.x, target.y);
        const distance = Phaser.Math.Distance.Between(this.textbox.x, this.textbox.y, pointer.x, pointer.y);
        const speed = 1.0 * distance;

        this.textbox.x += Math.cos(angle) * speed * deltaTime / 1000;
        this.textbox.y += Math.sin(angle) * speed * deltaTime / 1000;
    }

    updateRotation(deltaTime) {
        if (this.rotating > 0) {
            this.particles.spawn(this.textbox.x, this.textbox.y, this.textbox.angle);

            // Rotate the text 360 degrees when mouse button is clicked
            const delta_angle = 360 * (deltaTime / 1000);
            this.rotating -= delta_angle;
            this.textbox.angle += delta_angle;
          } else {
            this.textbox.angle = 0;
          }
    }

    update(deltaTime) {
        this.updateMove(deltaTime);
        this.updateRotation(deltaTime);

        this.particles.update(deltaTime);
    }
}

