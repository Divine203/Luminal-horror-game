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
        this.imgName = imgName;
        this.image = new Image();
        this.image.src = `./resource/assets/${this.imgName}`;

        this.dx;
        this.dy;
        this.distance;
        this.angleToPlayer; //radians

        this.speed = 2;

        this.ghostState = GHOST_STATES.ZOOM_PAST;
        this.isGhostWithWeapon = false;
        this.hasTeleportedFront = false;
        this.hasTeleportedBack = false;
        this.stateTimer = 0;
        this.maxStateTime = 10000; // 10 seconds max before switching

        this.lastBloodTime = 0;

        if (this.type === EntityTypes.GHOST) {
            this.pickNewState();
        }

    }

    draw() {
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.heigth);
    }

    normalizeAngle(angle) {
        return Math.atan2(Math.sin(angle), Math.cos(angle)); // Keeps it between -π and π
    }

    pickNewState() {
        const availableStates = Object.values(GHOST_STATES).filter(state => state !== this.ghostState);
        this.ghostState = availableStates[Math.floor(Math.random() * availableStates.length)];
        this.stateTimer = Date.now() + (Math.random() * (this.maxStateTime - this.minStateTime) + this.minStateTime);
    }

    switchToWeapon() {
        this.imgName = 'sc-granny-weapon.png';
        this.image.src = `./resource/assets/${this.imgName}`;
        this.isGhostWithWeapon = true;
    }

    switchToIdle() {
        this.imgName = 'sc-granny-idle.png';
        this.image.src = `./resource/assets/${this.imgName}`;
        this.isGhostWithWeapon = false;
    }

    calculatePos() {
        this.dx = this.pos.x - player.pos.x;
        this.dy = this.pos.y - player.pos.y;
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        // Calculate angle to player and normalize it to [-PI, PI]
        this.angleToPlayer = this.normalizeAngle(Math.atan2(this.dy, this.dx) - (player.angle * Math.PI / 180));
        this.angleToPlayer = ((this.angleToPlayer + Math.PI) % (2 * Math.PI)) - Math.PI;
    }

    followPlayer() {
        this.switchToWeapon();

        this.hasTeleportedFront = false;
        this.hasTeleportedBack = false;

        let dx = player.pos.x - this.pos.x;
        let dy = player.pos.y - this.pos.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 300) {
            // If ghost is too far, move quickly to get closer
            this.pos.x += (dx / distance) * (this.speed * 2);
            this.pos.y += (dy / distance) * (this.speed * 2);
        } else if (distance > 180) {
            // Normal following behavior when within range
            this.pos.x += (dx / distance) * this.speed;
            this.pos.y += (dy / distance) * this.speed;
        }
    }

    dropBlood() {
        const now = Date.now();

        if (this.isGhostWithWeapon) {
            if (this.distance <= 200 && now - this.lastBloodTime >= 1000) {
                player.drawBlood(); // Call the draw function
                this.lastBloodTime = now; // Update last drop time
            }
        }
    }


    appearBehindPlayer() {
        if (this.hasTeleportedBack) return;

        this.switchToWeapon();

        let offsetDistance = 200; // Distance behind player
        this.pos.x = player.pos.x - Math.cos(player.angle * Math.PI / 180) * offsetDistance;
        this.pos.y = player.pos.y - Math.sin(player.angle * Math.PI / 180) * offsetDistance;

        this.hasTeleportedBack = true;
    }

    appearInfrontOfPlayer() {
        if (this.hasTeleportedBack) return;

        this.switchToWeapon();

        let offsetDistance = 200; // Distance behind player
        this.pos.x = player.pos.x + Math.cos(player.angle * Math.PI / 180) * offsetDistance;
        this.pos.y = player.pos.y + Math.sin(player.angle * Math.PI / 180) * offsetDistance;

        this.hasTeleportedBack = true;
    }


    zoomPastPlayer() {
        this.hasTeleportedFront = false;
        this.hasTeleportedBack = false;

        this.switchToIdle();

        let speed = 7; // Move faster than normal

        // Move in a straight line past the player
        this.pos.x += Math.cos(player.angle * Math.PI / 180) * speed;
        this.pos.y += Math.sin(player.angle * Math.PI / 180) * speed;
    }

    applyLogic() {
        if (this.type == EntityTypes.GHOST) {
            setInterval(() => {
                this.pickNewState();
            }, this.maxStateTime);
        }
    }

    update() {
        if (this.type == EntityTypes.GHOST) {
            switch (this.ghostState) {
                case GHOST_STATES.FOLLOW_PLAYER:
                    this.followPlayer();
                    break;
                case GHOST_STATES.APPEAR_BEHIND:
                    this.appearBehindPlayer();
                    break;
                case GHOST_STATES.ZOOM_PAST:
                    this.zoomPastPlayer();
                    break;
                case GHOST_STATES.APPEAR_INFRONT:
                    if (player.hp < 20) {
                        this.appearInfrontOfPlayer();
                    } else {
                        this.followPlayer();
                    }
                    break;
            }

            this.dropBlood();
        }
    }

}

gameEntities = [
    new Entity({ x: 580, y: 50, width: 20, heigth: 50, type: EntityTypes.FLOWER_VASE, imgName: 'flower-vase.png', isStatic: true }),
    new Entity({ x: 380, y: 150, width: 20, heigth: 50, type: EntityTypes.GHOST, imgName: 'sc-granny-idle.png', isStatic: false }),
    new Entity({ x: 660, y: 150, width: 20, heigth: 50, type: EntityTypes.TEDDY, imgName: 'teddy.png', isStatic: true })
];