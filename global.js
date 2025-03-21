const cvs = document.querySelector('canvas');
const textureSelect = document.getElementById('textureSelect');
const form = document.querySelector('.form--cont');
const ctx = cvs.getContext('2d');

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
    GHOST: 'ghost',
    TEDDY: 'teddy',
};

const GHOST_STATES = {
    FOLLOW_PLAYER: 'followPlayer',
    APPEAR_BEHIND: 'appearBehind',
    APPEAR_INFRONT: 'appearInfront',
    ZOOM_PAST: 'zoomPass'
};

const EntityProjData = {
    flowerVase: {
        scaleFactor: 100.5,
        ratio: [1,3],
        spriteHeightDenominator: 16
    },
    ghost: {
        scaleFactor: 200,
        ratio: [16,23],
        spriteHeightDenominator: 2.3
    },
    teddy: {
        scaleFactor: 50,
        ratio: [133,128],
        spriteHeightDenominator: 999999999999
    },
}

let player;
let gameEntities;

let ui;

let utils;
let map;
let textureMap;
let projection;


let render3D = true;
let shouldDraw = true;
let showPlayer = true;

let gameStarted = false;
