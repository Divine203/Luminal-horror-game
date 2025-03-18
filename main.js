const renderCanvas = (engine) => {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    if (showPlayer) {
        player.update();
    }


    if (gameStarted) {
        gameEntities.forEach(e => {
            e.update();
        });
    }

    if (render3D) {
        projection.projectFloorAndCeiling();
        projection.prepWallData(player.rays);
        projection.prepEntities();
        projection.projectTo3D();

        ui.update();

        player.bloodstains.forEach((b, i) => {
            if (!b.draw()) player.bloodstains.splice(i, 1);
        });

        if (player.hp <= 20) {
            player.drawRedMist();
        }
    }

    requestAnimationFrame(engine);
}

gameEntities.forEach(e => {
    e.applyLogic();
})

// if (shouldDraw) {
    form.style.display = 'none';
// } else {
//     form.style.display = 'block';
// }



const engine = () => {
    renderCanvas(engine);
    if (!render3D) {
        map.drawMap();
        gameEntities.forEach((entity) => {
            entity.draw();
        });
    }
    if (!player.isDead && gameStarted) {
        movement();
    }
}



map.textureSelect();
if (shouldDraw) {
    // map.mapCreator();
}

engine();