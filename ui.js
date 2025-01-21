export class UI {
  constructor(eventHandler) {
    this.eventHandler = eventHandler;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Player controls
    document.getElementById('play-btn').addEventListener('click', () => {
      this.eventHandler('play');
      this.togglePlayButton();
    });
    
    document.getElementById('next-btn').addEventListener('click', () => {
      this.eventHandler('next');
    });
    
    document.getElementById('prev-btn').addEventListener('click', () => {
      this.eventHandler('prev');
    });

    // Progress bar
    const progressContainer = document.querySelector('.progress-container');
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const duration = document.querySelector('#duration').getAttribute('data-duration');
      this.eventHandler('seekTo', percent * duration);
    });

    // Volume control
    document.getElementById('volume-slider').addEventListener('input', (e) => {
      this.eventHandler('setVolume', e.target.value);
    });

    // Time updates
    document.addEventListener('timeUpdate', (e) => {
      this.updateProgress(e.detail.currentTime, e.detail.duration);
    });

    // Song ended
    document.addEventListener('songEnded', () => {
      document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i>';
    });
  }

  updatePlaylist(songs) {
    const songList = document.getElementById('song-list');
    songList.innerHTML = songs.map(song => `
      <li class="song-item" data-id="${song.id}">
        <span>${song.name}</span>
        <i class="fas fa-play"></i>
      </li>
    `).join('');

    // Add click handlers to songs
    songList.querySelectorAll('.song-item').forEach(item => {
      item.addEventListener('click', () => {
        this.eventHandler('selectSong', item.dataset.id);
        this.highlightCurrentSong(item.dataset.id);
        document.getElementById('play-btn').innerHTML = '<i class="fas fa-pause"></i>';
      });
    });
  }

  highlightCurrentSong(songId) {
    document.querySelectorAll('.song-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.id === songId) {
        item.classList.add('active');
      }
    });
  }

  togglePlayButton() {
    const playBtn = document.getElementById('play-btn');
    if (playBtn.innerHTML.includes('fa-play')) {
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  updateProgress(currentTime, duration) {
    const progressBar = document.getElementById('progress-bar');
    const currentTimeElement = document.getElementById('current-time');
    const durationElement = document.getElementById('duration');
    
    const percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    
    currentTimeElement.textContent = this.formatTime(currentTime);
    durationElement.textContent = this.formatTime(duration);
    durationElement.setAttribute('data-duration', duration);
  }

  formatTime(seconds) {
    if (!seconds) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}