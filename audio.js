class gameAudio {
    constructor() {
        this.refresh = true
        this.soundPath = './resource/audio/sound-effects/'
        this.musicPath = './resource/audio/'

        this.music = {
            calm: new Audio(`${this.musicPath}calm-bg.mp3`)
        }

        this.currentMusic = this.music.calm

        this.sound = {
            footsteps: {
                file: new Audio(`${this.soundPath}footsteps.wav`),
                volume: 0.4
            },
            blood: {
                file: new Audio(`${this.soundPath}blood.mp3`),
                volume: 0.4
            },
            jumpscareSoft: {
                file: new Audio(`${this.soundPath}jumpscare-soft.mp3`),
                volume: 0.4
            },
            jumpscareLoud1: {
                file: new Audio(`${this.soundPath}jumpscare-loud1.mp3`),
                volume: 0.4
            }
        }
    }

    playAudio = (audio_file) => {
        audio_file.file.volume = audio_file.volume
        audio_file.file.play();
        if (!audio_file.file.ended || !audio_file.file.paused) {
            audio_file.file.currentTime = 0;
            audio_file.file.play();
        }
    }

    playFootSteps = (bool) => {
        if (bool) {
            this.sound.footsteps.file.volume = 0.5;
            this.sound.footsteps.file.play();
            this.sound.footsteps.file.removeEventListener('ended', this.footstepsLoop);

            this.footstepsLoop = () => this.playFootSteps(true);

            this.sound.footsteps.file.addEventListener('ended', this.footstepsLoop);
        } else {
            this.sound.footsteps.file.pause();
            
            this.sound.footsteps.file.removeEventListener('ended', this.footstepsLoop);
        }
    };
    
    playBackgroundMusic = (bool) => {
        if (bool) {
            this.currentTime = 0;
            this.currentMusic.volume = 0.8;
            this.currentMusic.play();

            this.currentMusic.addEventListener('ended', () => {
                this.playBackgroundMusic(true);
            });
        }
        else this.currentMusic.pause()

    }
}


let audio = new gameAudio()

