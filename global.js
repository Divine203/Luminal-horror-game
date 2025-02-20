const cvs = document.querySelector('canvas');
const textureSelect = document.getElementById('textureSelect');
const form = document.querySelector('.form--cont');
const ctx = cvs.getContext('2d');

// Set to default behavior (overwrites previous drawings)
// ctx.globalCompositeOperation = "source-over";

cvs.width = 1080;
cvs.height = 620;

const keys = {
    right: { pressed: false },
    left: { pressed: false },
    up: { pressed: false },
    down: { pressed: false },

    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },

    u: { pressed: false },
    j: { pressed: false },
    h: { pressed: false },
    k: { pressed: false },

    x: { pressed: false }
};

const EntityTypes = {
    FLOWER_VASE: 'flowerVase',
};

let player;
let gameEntities;


let utils;
let map;
let textureMap;
let projection;


let render3D = false;
let shouldDraw = true;
let showPlayer = false;



