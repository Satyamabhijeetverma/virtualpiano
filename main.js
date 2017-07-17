var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon
var songs = [{
      'name': 'I would love to change the world',
      'artist': 'Jetta',
      'album': '',
      'duration': '3:10',
     'fileName': 'song1.mp3',
     'image': 'song1.jpg'
  },
  {
      'name': 'Shape of you',
      'artist': 'Ed Sheeran',
      'album': '',
      'duration': '3:55',
      'fileName': 'song2.mp3',
      'image': 'song2.jpg'
  },
  {
      'name': 'Girl I need you',
      'artist': 'Arijit Singh',
      'album': 'Bhaagi',
      'duration': '4:57',
      'fileName': 'song3.mp3',
      'image': 'song3.jpg'
  },
  {
      'name': 'Tu hai ki nhi',
      'artist': 'Ankit Tiwari',
      'album': 'Roy',
      'duration': '5:34',
      'fileName': 'song4.mp3',
      'image': 'song4.jpg'
  },
  {
      'name': 'Faded',
      'artist': 'Alan walker',
      'album': 'Faded',
      'duration': '3:32',
      'fileName': 'song5.mp3',
      'image': 'song5.jpg'
  }]
  var songNumber = 1;
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
       function changeCurrentSongDetails(songObj) {
          $('.current-song-image').attr('src','img/' + songObj.image)
          $('.current-song-name').text(songObj.name)
          $('.current-song-album').text(songObj.album)
          }

            function updateCurrentTime() {
                var song = document.querySelector('audio');
                var currentTime = Math.floor(song.currentTime); //Math.floor removes decimal
                currentTime = fancyTimeFormat(currentTime); //Make the time look good
                var duration = Math.floor(song.duration);
                duration = fancyTimeFormat(duration);
                $('.time-elapsed').text(currentTime);
                $('.song-duration').text(duration);
                var time=song.currentTime/song.duration*100;
                $('.progress-filled').css("width",time+"%");
              }
              function timejump(){
               var song =  document.querySelector('audio')
               song.currentTime = song.duration - 5;
               }
              function addSongNameClickEvent(songObj,position) {
                  var songName = songObj.fileName;
                  var id = '#song' + position;
                $(id).click(function() {
                    var audio = document.querySelector('audio');
                    var currentSong = audio.src;
                    if(songNumber != position)
                    {
                     audio.src = songName;
                     songNumber=position;
                     changeCurrentSongDetails(songObj); // Function Call
                   }
                   toggleSong();
                    });
                    }

              window.onload = function() {
                changeCurrentSongDetails(songs[0]); //calling function to display the image initially
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
                      addSongNameClickEvent(obj,i+1)
                  }
                    $('#songs').DataTable({paging:false});
                }
                  $('audio').on('ended',function() {
                    var audio = document.querySelector('audio');
                    if(currentSongNumber < 5) {
                      var nextSongObj = songs[currentSongNumber];
                       audio.src = nextSongObj.fileName; // Change Soure
                       toggleSong(); // Play Next Song
                       changeCurrentSongDetails(nextSongObj); // Update Image
                       currentSongNumber = currentSongNumber + 1; // Change State // Play the next song
                    }
                    else {
                       $('.play-icon').removeClass('fa-pause').addClass('fa-play').addClass('fa-play');// Stop Playing
                       audio.currentTime = 0;
                    }
                    })
                  $('.welcome-screen button').on('click', function() {
                      var name = $('#name-input').val();
                      if (name.length > 3) {
                          var message = "Welcome, " + name;
                          $('.main .user-name').text(message);
                          $('.welcome-screen').addClass('hidden');
                          $('.main').removeClass('hidden');
                      } else {
                          $('#name-input').addClass('error');
                      }
                  });
                     $('.fa-random').on('click',function() {
                      $('.fa-random').toggleClass('disabled')
                      willShuffle = 1 - willShuffle;
                      });
                     $('.fa-repeat').on('click',function() {
                      $('.fa-repeat').toggleClass('disabled')
                      willLoop = 1 - willLoop;
                  });

                  $('.play-icon').on('click', function() {
                    toggleSong();  //here we call function toggleSong by function name
                  });
                ('body').on('keypress',function(event) {
                    var target = event.target;
                    if (event.keyCode == 32 && target.tagName !='INPUT')
                    {
                        toggleSong();
                    }
                });
