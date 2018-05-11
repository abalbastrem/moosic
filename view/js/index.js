var array_songs_url;
var index_songs = 0;
var playtimeout;
var Spectrum;
// document is ready.
$(document).ready(function() {
  // Waves audio
  Spectrum = WaveSurfer.create({
    container: '#audio-spectrum',
    progressColor: "#03a9f4",
    height: 40,
    barWidth: 1,
  });

  Spectrum.on("ready", function() {
    // Do whatever you need to do with the player
    $('#play').click(function() {
      // console.log(this.id);
      if (this.id === 'pause') {
        $('#pause').removeClass('fa fa-pause').addClass('fa fa-play');
        $('#pause').attr('id', 'play');
        Spectrum.pause();
      } else {
        $('#play').removeClass('fa fa-play').addClass('fa fa-pause');
        $('#play').attr('id', 'pause');
        Spectrum.play();
      }
    });
    $('#play-playlist').click(function() {
      // console.log(this.id);
      if (this.id === 'pause') {
        $('#pause').removeClass('fa fa-pause').addClass('fa fa-play');
        $('#pause').attr('id', 'play');
        Spectrum.pause();
      } else {
        $('#play').removeClass('fa fa-play').addClass('fa fa-pause');
        $('#play').attr('id', 'pause');
        Spectrum.play();
      }
    });
    // forward 10s the song
    $('#forward').click(function() {
      // Spectrum.skipForward();
      console.log("skip song");
      playNextSong();
    });
    // backward 10s the song
    $('#backward').click(function() {
      console.log("skipback song");
      playSongBefore();
      // Spectrum.skipBackward();
    });
    // like
    $('#like').click(function() {
      if (document.getElementById("like").style.color != "rgb(255, 31, 89)") {
        console.log("like");
        document.getElementById("like").style.color = "rgb(255, 31, 89)";
        // add to playlist
        $('#playlist-table').append('<tr><td><img id="artwork" src="img/artwork-jamendo.jpg" height="42" width="42"></img></td><td>E. Satie - Trois Gnossiennes - I. Lent - Alessandro Simonetto</td><td>OnClassical</td><td><span id="like-playlist" class="fa fa-heart icon-playlist"></span></td><td><span id="play-playlist" class="fa fa-play icon-playlist"></span></td></tr>');
        document.getElementById("like-playlist").style.color = "rgb(255, 31, 89)";
      } else {
        console.log("unlike");
        document.getElementById("like").style.color = "white";
        document.getElementById("like-playlist").style.color = "white";
      }
    });
  });

  // click body clove slide menu
  $('#myDiagramDiv').click(function() {
    closeNav();
    closeNavMenu();
  });


  // load the song
  //Spectrum.load('https://mp3l.jamendo.com/?trackid=1501986&format=mp31&from=app-e106f235');
});

function playNext() {
  console.log(index_songs);
  if (index_songs < array_songs_url.length) {
    Spectrum.load(array_songs_url[index_songs]);
    index_songs++;
  }
}

function playNextSong() {
  clearTimeout(playtimeout);
  console.log(index_songs);
  playNext();
}

function playSongBefore() {
  clearTimeout(playtimeout);
  if (index_songs > 0) {
    console.log(index_songs);
    index_songs--;
    playNext();
  } else {
    console.log(index_songs > 0);
  }
}

function playSongs(songs) {
  console.log("atention se reproducira la siguiente lista: ");
  // console.log(songs);
  array_songs_url = new Array();
  for (let i = 0; i < songs.data.length; i++) {
    array_songs_url.push(songs.data[i].audio);
  }
  // console.log(array_songs_url);
  Spectrum.load(array_songs_url[0]);
  Spectrum.on("ready", function() {
    Spectrum.play();
    playtimeout = setTimeout(playNext, Spectrum.getDuration() * 1000 + (500));
    console.log("Se reproducira la siguiente cancion pasados: " + Spectrum.getDuration() + " Segundos");
  });
  openNavMenu();
  openNavTrack();
}


// Slide menu functions
function openNavMenu() {
  // document.getElementById("mySideMenu").style.width = "350px";
  document.getElementById("mySidenavBg").style.width = "350px";
  document.getElementById("mySidenavTrack").style.width = "350px";
  document.getElementById("icon-open").style.opacity = 0;
}

function closeNavMenu() {
  document.getElementById("mySideMenu").style.width = "0";
  document.getElementById("mySidenavBg").style.width = "0";
  document.getElementById("icon-open").style.opacity = 1;
}

// open right menu
function openNavTrack() {
  document.getElementById("mySidenavTrack").style.width = "350px";
  document.getElementById("mySideMenu").style.width = "0";
}
// close right menu
function closeNav() {
  document.getElementById("mySideMenu").style.width = "350px";
  document.getElementById("mySidenavLogin").style.width = "0";
  document.getElementById("mySidenavTrack").style.width = "0";
  document.getElementById("mySidenavRegister").style.width = "0";
  document.getElementById("mySidenavPlaylist").style.width = "0";
  document.getElementById("mySidenavAbout").style.width = "0";
  document.getElementById("mySidenavContact").style.width = "0";
}
// open login
function openNavLogin() {
  document.getElementById("mySidenavLogin").style.width = "350px";
  document.getElementById("mySideMenu").style.width = "0";

}
// open Register
function openNavRegister() {
  document.getElementById("mySidenavRegister").style.width = "350px";
  document.getElementById("mySideMenu").style.width = "0";
}

// open playlist
function openNavPlaylist() {
  document.getElementById("mySidenavPlaylist").style.width = "350px";
  document.getElementById("mySideMenu").style.width = "0";
}

// open about
function openNavAbout() {
  document.getElementById("mySidenavAbout").style.width = "350px";
  document.getElementById("mySideMenu").style.width = "0";
}

// open contact
function openNavContact() {
  document.getElementById("mySidenavContact").style.width = "350px";
  document.getElementById("mySideMenu").style.width = "0";
}
