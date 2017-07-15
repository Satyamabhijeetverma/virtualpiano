
var songs = [{
      'name': 'I would love to change the world',
      'artist': 'Jetta',
      'album': '',
      'duration': '3:10',
     'fileName': 'song1.mp3'
  },
  {
      'name': 'Shape of you',
      'artist': 'Ed Sheeran',
      'album': '',
      'duration': '3:55',
      'fileName': 'song2.mp3'
  },
  {
      'name': 'Girl I need you',
      'artist': 'Arijit Singh',
      'album': 'Bhaagi',
      'duration': '4:57',
      'fileName': 'song3.mp3'
  },
  {
      'name': 'Tu hai ki nhi',
      'artist': 'Ankit Tiwari',
      'album': 'Roy',
      'duration': '5:34',
      'fileName': 'song4.mp3'
  }]
              function fancyTimeFormat(time)
          {
          // Hours, minutes and seconds
          // ~~this means Math.floor here
          var hrs = ~~(time / 3600);
          var mins = ~~((time % 3600) / 60);
          var secs = time % 60;

          // Output like "1:01" or "4:03:59" or "123:03:59"
          var ret = "";

          if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
          }

          ret += "" + mins + ":" + (secs < 10 ? "0" : "");
          ret += "" + secs;
          return ret;
          }
              //function is defined here
              function toggleSong() {
          var song = document.querySelector('audio');
          if(song.paused == true) {
          $('.play-icon').removeClass('fa-play').addClass('fa-pause');
          song.play();
          }
          else {
          $('.play-icon').removeClass('fa-pause').addClass('fa-play');
          song.pause();
          }
       }
            function updateCurrentTime() {
                var song = document.querySelector('audio');
                var currentTime = Math.floor(song.currentTime); //Math.floor removes decimal
                currentTime = fancyTimeFormat(currentTime); //Make the time look good
                var duration = Math.floor(song.duration);
                duration = fancyTimeFormat(duration);
                $('.time-elapsed').text(currentTime);
                $('.song-duration').text(duration);
              }
              function addSongNameClickEvent(songName,position) {
                  var id = '#song' + position;
                $(id).click(function() {
                    var audio = document.querySelector('audio');
                    var currentSong = audio.src;
                    if(currentSong.search(songName) != -1)
                    {
                     toggleSong();
                    }
                    else {
                      audio.src = songName;
                      toggleSong();
                    }
                    });
                    }

              window.onload = function() {
                updateCurrentTime();
                setInterval(function() {
                updateCurrentTime();
                },1000);
                  for(var i =0; i < songs.length;i++) {
                      var obj = songs[i];
                      var name = '#song' + (i+1);
                      var song = $(name);
                      song.find('.song-name').text(obj.name);
                      song.find('.song-artist').text(obj.artist);
                      song.find('.song-album').text(obj.album);
                      song.find('.song-length').text(obj.duration);
                      addSongNameClickEvent(obj.fileName,i+1)
                  }
                }

                  $('.welcome-screen button').on('click', function() {
                      var name = $('#name-input').val();
                      if (name.length > 2) {
                          var message = "Welcome, " + name;
                          $('.main .user-name').text(message);
                          $('.welcome-screen').addClass('hidden');
                          $('.main').removeClass('hidden');
                      } else {
                          $('#name-input').addClass('error');
                      }
                  });
                  $('.play-icon').on('click', function() {
                    toggleSong();  //here we call function toggleSong by function name
                  });
                  $('body').on('keypress', function(event) {
                    if (event.keyCode == 32) {
                    toggleSong(); //here we call function toggleSong by function name
                    }
                });
