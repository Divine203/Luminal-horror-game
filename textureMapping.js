class TextureMapping {
    constructor() {
        this.scale = 256; // texture scale
        this.path = './resource/assets/';

        this.wall1 = new Image();
        this.wall1.src = `${this.path}wall1.jpg`;
        this.wall2 = new Image();
        this.wall2.src = `${this.path}wall2.jpg`;
        this.wall3 = new Image();
        this.wall3.src = `${this.path}wall3.jpg`;
        this.wall4 = new Image();
        this.wall4.src = `${this.path}wall4.jpg`;
        this.pillar = new Image();
        this.pillar.src = `${this.path}pillar.jpg`;
        this.door = new Image();
        this.door.src = `${this.path}door.jpg`;

        this.currentTexture = 'wall1';

        this.blood1 = new Image();
        this.blood1.src = `${this.path}blood1.png`;
        this.blood2 = new Image();
        this.blood2.src = `${this.path}blood2.png`;
    }

    calcTextureMap(wc, ip) { // wallCoordinates, intersectionPoint  
        if(!wc || !ip) {
            return;
        }
        const wId = utils.calcDistance(wc.x1, wc.y1, ip.x, ip.y);   // wall Interesection distance

        let xCut = (wId % this.scale);

        return xCut;
    }

    getTextureData(image) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        tempCanvas.width = this.scale
        tempCanvas.height = this.scale;

        tempCtx.drawImage(image, 0, 0);

        return tempCtx.getImageData(0, 0, this.scale, this.scale).data;
    }
}

textureMap = new TextureMapping()