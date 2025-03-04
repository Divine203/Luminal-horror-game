class UI {
    constructor() {
        this.deathImg = new Image();
        this.deathImg.src = './resource/assets/u-died.png';
    }

    drawHp() {
        const fullHealthBarWidth = 200;
        const barWidth = fullHealthBarWidth * (player.hp / 100);
        let color = 'green';

        let xPos = cvs.width - (fullHealthBarWidth + 30);
        let yPos = 30

        if (barWidth <= fullHealthBarWidth / 2 && barWidth > 20) { color = 'yellow' }
        else if (barWidth <= 20) { color = 'red' }


        // health bar
        ctx.globalAlpha = .3;

        ctx.fillStyle = 'grey';
        ctx.fillRect(xPos, yPos, fullHealthBarWidth, 8);

        ctx.fillStyle = color;
        ctx.fillRect(xPos, yPos, barWidth, 8);

        ctx.globalAlpha = 1;
    }

    drawScore() {
        ctx.fillStyle = 'white';
        ctx.font = `18px consolas`
        ctx.fillText(String(player.score), 30, 30);
    }

    drawDeathScreen() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        ctx.drawImage(this.deathImg, cvs.width / 3, cvs.height / 3, this.deathImg.width, this.deathImg.height);

        ctx.fillStyle = 'white';
        ctx.font = `18px consolas`
        ctx.fillText('Final Score: ' + String(player.score), cvs.width / 2.4, (cvs.height / 3) + 200);

        ctx.fillStyle = 'white';
        ctx.font = `18px consolas`
        ctx.fillText('Press Enter to restart', cvs.width / 2.5, (cvs.height / 3) + 240);
    }

    update() {
        this.drawHp();
        this.drawScore();   

        if (player.isDead) {
            this.drawDeathScreen();
            player.angle++;
        }
    }
}

ui = new UI();