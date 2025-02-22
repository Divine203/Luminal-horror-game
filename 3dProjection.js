class _3DProjection {

    constructor() {
        this.maxDistance = 1000; // Arbitrary large distance for shading
        this.fov = 90 * Math.PI / 180;
        this.once = true;
        this.printOnce = true;
        this.defaultWallHeight = cvs.height;
        this.halfFov = this.fov / 2;
        this.horizon = cvs.height / 2;
        this.rayLength = player.numRays; // reference player.numRays
        this.sliceWidth = cvs.width / this.rayLength;
        this.textureData;
        this.currentWallHeights = [];
        this.currentWallSlicesXPos = [];

        this.entityScaleFactor = 100.5;
        this.gameEntities = gameEntities;

        this.wallSlicesToDraw = [];
        this.gameEntitiesToDraw = [];
    }



    prepWallData(rays) {
        const playerDir = player.angle * Math.PI / 180;

        for (let i = 0; i < rays.length; i++) {
            const ray = rays[i];
            const rayAngle = playerDir - this.halfFov + (i / rays.length) * this.fov;
            const dPerpendicular = ray.d * Math.cos(rayAngle - playerDir); // Correct the fish-eye effect
            const wallHeight = (this.defaultWallHeight / dPerpendicular) * 200;

            this.currentWallHeights[i] = wallHeight;
            this.currentWallSlicesXPos[i] = i * this.sliceWidth;

            const xCut = textureMap.calcTextureMap(ray.wD, ray.iP);
            const adjustedXCut = Math.min(Math.max(xCut, 0), textureMap.scale - 1); // to remove gaps in edges

            this.wallSlicesToDraw[i] = {
                ray: ray,
                textureMap: ray.wD ? textureMap[ray.wD.texture] : null,
                adjustedXCut: adjustedXCut,
                textureMapScale: textureMap.scale,
                index: i,
                wallHeight: wallHeight,
                distanceFromPlayer: ray.d,
                isWall: true
            };
        }
    }

    prepEntities() {
        gameEntities.sort((a, b) => b.distance - a.distance);

        gameEntities.forEach((e, index) => {
            e.calculatePos();

            // Calculate the angle difference between the player and the sprite
            const angleDiff = e.angleToPlayer;

            // Calculate screenX based on the angle difference and FOV
            const screenX = (cvs.width / 2) * (1 + angleDiff / ((player.FOV * Math.PI / 180) / 2));

            

            // Calculate sprite height and width
            const spriteHeight = (cvs.height / Math.round(e.distance)) * e.projData.scaleFactor;
            const spriteWidth = spriteHeight * (e.projData.ratio[0] / e.projData.ratio[1]); // Adjust aspect ratio as needed
            const shouldDraw = screenX > -spriteWidth / 2 && screenX < cvs.width + spriteWidth / 2; // Draw the sprite if it's within the screen bounds

            const yShift = Math.abs(Math.sin(angleDiff) * 50 / (e.distance) * 100) - (spriteHeight / e.projData.spriteHeightDenominator);

            this.gameEntitiesToDraw[index] = {
                image: e.image,
                xPos: screenX - spriteWidth / 2,
                yPos: (cvs.height / 2) + yShift,
                spriteWidth: spriteWidth,
                spriteHeight: spriteHeight,
                distanceFromPlayer: e.distance,
                shouldDraw: shouldDraw,
                isWall: false
            };
        });
    }

    projectTo3D() {
        let world = [...this.wallSlicesToDraw, ...this.gameEntitiesToDraw];
        world.sort((a, b) => b.distanceFromPlayer - a.distanceFromPlayer);

        world.forEach((el) => {
            if (el.isWall) {
                if (el.ray.iP) {
                    ctx.drawImage(
                        el.textureMap,
                        el.adjustedXCut, // cx
                        0, // cy
                        1, // cw
                        el.textureMapScale, // ch
                        el.index * this.sliceWidth,
                        this.horizon - el.wallHeight / 2,
                        this.sliceWidth,
                        el.wallHeight
                    );
                }
            } else {
                if (el.shouldDraw) {
                    ctx.drawImage(
                        el.image,
                        el.xPos, // Center the sprite horizontally
                        el.yPos, // Make it rest on the ground
                        el.spriteWidth,
                        el.spriteHeight
                    );
                }
            }
        });
    }


    range(start, end) {
        let result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }


}

projection = new _3DProjection();