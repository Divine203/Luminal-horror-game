class Entity {
    constructor({ x, y, width, heigth, type, imgName, isStatic }) {
        this.pos = {
            x,
            y
        };
        this.width = width;
        this.heigth = heigth;
        this.type = type;
        this.isStatic = isStatic;
        this.projData = EntityProjData[type];
        this.image = new Image();
        this.image.src = `./resource/assets/${imgName}`;

        

        this.dx;
        this.dy;
        this.distance;
        this.angleToPlayer; //radians
    }

    draw() {
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.heigth);
    }

    calculatePos() {
        this.dx = this.pos.x - player.pos.x;
        this.dy = this.pos.y - player.pos.y;
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    
        // Calculate angle to player and normalize it to [-PI, PI]
        this.angleToPlayer = Math.atan2(this.dy, this.dx) - (player.angle * Math.PI / 180);
        this.angleToPlayer = ((this.angleToPlayer + Math.PI) % (2 * Math.PI)) - Math.PI;
    }

    update() {
        this.draw();
    }

}

gameEntities = [
    new Entity({ x: 580, y: 50, width: 20, heigth: 50, type: EntityTypes.FLOWER_VASE, imgName: 'flower-vase.png', isStatic: true }),
    new Entity({ x: 380, y: 150, width: 20, heigth: 50, type: EntityTypes.GHOST, imgName: 'ghost.png', isStatic: false }),
    new Entity({ x: 660, y: 150, width: 20, heigth: 50, type: EntityTypes.TEDDY, imgName: 'teddy.png', isStatic: true })
];