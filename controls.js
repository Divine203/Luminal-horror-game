const controls = () => {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (keys.down.pressed === false && player.canMoveForward) {
                    keys.up.pressed = true;
                }
                break;
            case 'ArrowLeft':
                if (keys.right.pressed === false) {
                    keys.left.pressed = true;
                }
                break;
            case 'ArrowRight':
                if (keys.left.pressed === false) {
                    keys.right.pressed = true;
                }
                break;
            case 'ArrowDown':
                if (keys.up.pressed === false && player.canMoveBack) {
                    keys.down.pressed = true;
                }
                break;
            case 'a':
                if (keys.d.pressed === false) {
                    keys.a.pressed = true;
                }
                break;
            case 'd':
                if (keys.a.pressed === false) {
                    keys.d.pressed = true;
                }
                break;
            case 'w':
                if (keys.s.pressed === false) {
                    keys.w.pressed = true;
                }
                break;
            case 's':
                if (keys.w.pressed === false) {
                    keys.s.pressed = true;
                }
                break;


            case 'u':
                if (keys.j.pressed === false) {
                    keys.u.pressed = true;
                }
                break;
            case 'h':
                if (keys.k.pressed === false) {
                    keys.h.pressed = true;
                }
                break;
            case 'j':
                if (keys.u.pressed === false) {
                    keys.j.pressed = true;
                }
                break;
            case 'k':
                if (keys.h.pressed === false) {
                    keys.k.pressed = true;
                }
                break;


            case 'q':
                // render3D = !render3D;
                break;

            case 'Enter':
                player.restart();
                gameStarted = true;
                audio.playBackgroundMusic(true);

                break;
    

            case 'c':
                // shouldDraw = !shouldDraw;
                // if (shouldDraw) {
                //     form.style.display = 'none';
                // } else {
                //     form.style.display = 'block';
                // }
                break;

            case 'p':
                // showPlayer = !showPlayer;
                break;

            case 'm':
                map.saveMap();
                break;

            case 'x':
                keys.x.pressed = true;
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                keys.up.pressed = false;
                audio.playFootSteps(false);

                break;
            case 'ArrowLeft':
                keys.left.pressed = false;
                

                break;
            case 'ArrowRight':
                keys.right.pressed = false;

                break;
            case 'ArrowDown':
                keys.down.pressed = false;
                audio.playFootSteps(false); 

                break;

            case 'a':
                keys.a.pressed = false;

                break;
            case 'd':
                keys.d.pressed = false;

                break;
            case 'w':
                keys.w.pressed = false;

                break;
            case 's':
                keys.s.pressed = false;

                break;


            case 'u':
                keys.u.pressed = false;

                break;
            case 'h':
                keys.h.pressed = false;

                break;
            case 'j':
                keys.j.pressed = false;

                break;
            case 'k':
                keys.k.pressed = false;

                break;


            case 'x':
                keys.x.pressed = false;
                break;
        }
    });
}

const movement = () => {
    if (keys.up.pressed) {
        if (player.canMoveForward) {
            audio.playFootSteps(true);
            player.pos.x += player.dx;
            player.pos.y += player.dy;
        }
    } else if (keys.down.pressed) {
        if (player.canMoveBack) {
            audio.playFootSteps(true);
            player.pos.x += -player.dx;
            player.pos.y += -player.dy;
        }
    }
    if (keys.left.pressed) {
        player.rotVel = -player.rotSpeed;
    } else if (keys.right.pressed) {
        player.rotVel = player.rotSpeed;
    } else {
        player.dx = 0;
        player.dy = 0;
        player.rotVel = 0;
    }

    player.angle += player.rotVel;
}


controls();






// -- control --
/**
 *      up - down - left - right => control player movement
 *      Q                        => switch 2D and 3D
 *      C                        => disable/enable map drawing
 *      P                        => show/hide player
 *      X                        => delete hovered line or node
 *      W - A - S - D            => control already drawn lines position
 *      U - H - J - K            => move the entire map (2D)  
 *  
 */