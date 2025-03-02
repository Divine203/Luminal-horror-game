const renderCanvas = (engine) => {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    if (showPlayer) {
        player.update();
    }

    gameEntities.forEach(e => {
        e.update();
    })

    if (render3D) {
        projection.projectFloorAndCeiling();
        projection.prepWallData(player.rays);
        projection.prepEntities();
        projection.projectTo3D();
        player.drawPlayerHands3D();
    }

    requestAnimationFrame(engine);
} 

gameEntities.forEach(e => {
    e.applyLogic();
})

if (shouldDraw) {
    form.style.display = 'none';
} else {
    form.style.display = 'block';
}



const engine = () => {
    renderCanvas(engine);
    if(!render3D) {
        map.drawMap();
        gameEntities.forEach((entity) => {
            entity.draw();
        });
    } 
    movement();
}

map.textureSelect();
if(shouldDraw) {
    map.mapCreator();
}

engine();