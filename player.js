class Player {
    constructor() {
        this.pos = {
            x: 400,
            y: 200
        }
        this.speed = 6;
        this.rotSpeed = 2.5;
        this.rotVel = 0;
        this.width = 30;
        this.height = 30;
        this._3dheight = 75;
        this.angle = 0; // in degrees
        this.dx = 0;
        this.dy = 0;
        this.speedSin = 0;
        this.speedCos = 0;

        this.defaultRayLength = cvs.width * 2;
        this.rayLenth = cvs.width * 2;
        this.rays = [];
        this.backRay;

        this.canMoveForward = true;
        this.canMoveBack = true;

        this.FOV = 90; // field of view
        this.numRays = 360;
        this.rayoffsetAngles = Array.from({ length: this.numRays }, (v, k) => (k * (this.FOV / this.numRays) - (this.FOV / 2))); // [1, ...90]

        this.isInSector = false;
        
    }

    drawCollisionBox() {
        let posX = (-this.width / 2) * 1.5;
        let posY = (-this.height / 2) * 1.5;
        let width = this.width * 1.5;
        let height = this.height * 1.5;
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.rect(posX, posY, width, height);
        ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
        ctx.fill();
        ctx.restore();
    }

    drawRotatingRect() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.restore();
    }

    drawPlayerHands3D() {

        const img = textureMap.playerHandGun;

        ctx.filter = `brightness(.5)`;
        ctx.drawImage(img, 450, (cvs.height - 260), img.width/4, img.height/4);
        ctx.filter = "none";
    }

    checkWallCollisions() {
        const centerFrontRay = this.rays[(this.rays.length/2)-1];
        const backRay = this.backRay;

        if(centerFrontRay.d < 30) {
            this.canMoveForward = false;
        } else {
            this.canMoveForward = true;
        }

        if(backRay.l < 30) {
            this.canMoveBack = false;
        } else {
            this.canMoveBack = true;
        }
    }

    drawRays() {
        // backRay
        this.backRay = new Ray();
        let reverseAngleOfPlayer = 180;
        let { x1, y1, x2, y2 } = this.calcRayPoints(reverseAngleOfPlayer, this.rayLenth);
        this.backRay.angle = reverseAngleOfPlayer;
        this.backRay.x1 = x1;
        this.backRay.y1 = y1;
        this.backRay.x2 = x2;
        this.backRay.y2 = y2;
        this.rayCastMap(this.backRay, map.mapLines);
        
        if (!render3D) {
            this.backRay.drawRay(this.backRay.angle, this.angle, this.width, this.height, this.pos.x, this.pos.y);
        }

        //
        for (let i = 0; i < this.rayoffsetAngles.length; i++) {
            let ray = new Ray();
            let { x1, y1, x2, y2 } = this.calcRayPoints(this.rayoffsetAngles[i], this.rayLenth);
            ray.angle = this.rayoffsetAngles[i];
            ray.x1 = x1;
            ray.y1 = y1;
            ray.x2 = x2;
            ray.y2 = y2;
            this.rayCastMap(ray, map.mapLines);
            this.rays[i] = { d: ray.l, iP: ray.intersectionPoint, color: ray.lineIntersectionColor, wD: ray.wallData, fD: ray.floorData };
            if (!render3D) {
                ray.drawRay(this.rayoffsetAngles[i], this.angle, this.width, this.height, this.pos.x, this.pos.y);
            }
        }
    }

    calcRayPoints(rayOffsetAngle, rayLenth) {
        let x1 = this.pos.x + this.width / 2;
        let y1 = this.pos.y + this.height / 2;
        let { x2, y2 } = utils.calcEndPoint(x1, y1, rayLenth, ((rayOffsetAngle + this.angle) * (Math.PI / 180))); // convert angle to radians 

        return { x1, y1, x2, y2 };
    }

    rayCastMap(ray, mapLines) {
        let closestIntersection = null;
        let minDistance = Infinity;

        mapLines.forEach(mapLine => {
            let intersectionPoint = utils.findIntersection(ray.x1, ray.y1, ray.x2, ray.y2, mapLine.x1, mapLine.y1, mapLine.x2, mapLine.y2);
            if (intersectionPoint) {
                let distance = utils.calcDistance(ray.x1, ray.y1, intersectionPoint.x, intersectionPoint.y);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIntersection = intersectionPoint;
                    ray.intersectionPoint = intersectionPoint;
                    ray.lineIntersectionColor = mapLine.color;
                    ray.wallData = mapLine;
                }
            }
        });

        if (closestIntersection) {
            ray.l = Math.ceil(minDistance);
        } else {
            ray.l = this.defaultRayLength;
        }

        let { x1, y1, x2, y2 } = this.calcRayPoints(ray.angle, ray.l);
        ray.x1 = x1;
        ray.y1 = y1;
        ray.x2 = x2;
        ray.y2 = y2;
    }

    movement() {
        const angleInRadians = this.angle * (Math.PI / 180);
        this.dx = Math.cos(angleInRadians) * this.speed;
        this.dy = Math.sin(angleInRadians) * this.speed;
    }

    update() {
        if (!render3D) {
            this.drawRotatingRect();
        }

        this.drawRays();
        this.movement();
        this.checkWallCollisions();
    }
}

player = new Player();
