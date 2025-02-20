class Ray {
    constructor() {
        // walls
        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
        this.color = "yellow";
        this.angle = null;
        this.l; // l for length
        this.wallData = null;
        this.intersectionPoint = null;
        this.lineIntersectionColor = null; // [255, 0, 0]
    }
    
    drawRay(angleOffset, pAngle, pWidth, pHeight, pX, pY) { // angleOffset is in degrees
        ctx.save();
        ctx.beginPath();
        ctx.translate(pX + pWidth/2, pY + pHeight/2);
        ctx.rotate((angleOffset + pAngle) * Math.PI/180);
        ctx.rect((-pWidth/2) + (pWidth/2), (-pHeight/2) + (pHeight/2), this.l, 1);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

}