export class Player {
  constructor() {
    this.audio = new Audio();
    this.setupAudioEvents();
  }

  setupAudioEvents() {
    this.audio.addEventListener('ended', () => {
      document.dispatchEvent(new CustomEvent('songEnded'));
    });

    this.audio.addEventListener('timeupdate', () => {
      document.dispatchEvent(new CustomEvent('timeUpdate', {
        detail: {
          currentTime: this.audio.currentTime,
          duration: this.audio.duration
        }
      }));
    });
  }

  loadAndPlay(song) {
    if (!song) return;
    
    const url = URL.createObjectURL(song.file);
    this.audio.src = url;
    this.audio.play();
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  seekTo(time) {
    this.audio.currentTime = time;
  }

  setVolume(volume) {
    this.audio.volume = volume / 100;
  }
}
