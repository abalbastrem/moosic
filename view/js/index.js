var array_songs_url;
var index_songs = 1;
var playtimeout;
var Spectrum;
var Spectrum2;
var actual_song;
var playlist_songs;

// document is ready.
$(document).ready(function() {
  // Waves audio
  Spectrum = WaveSurfer.create({
    container: '#audio-spectrum',
    progressColor: "#03a9f4",
    height: 40,
    barWidth: 1,
  });

  Spectrum2 = WaveSurfer.create({
    container: '#audio-spectrum2',
    progressColor: "#03a9f4",
    height: 40,
    barWidth: 1,
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

  Spectrum.on("ready", function() {
    // Do whatever you need to do with the player
    $('#pause').click(function() {
      console.log(this.id + "::pause");
      $('#pause').addClass('hide');
      $('#play').removeClass('hide');
      // $('#pause').attr('id', 'play');
      Spectrum.pause();
    });

    $('#play').click(function() {
      console.log(this.id + "::play");
      $('#play').addClass('hide');
      $('#pause').removeClass('hide');
      // $('#play').attr('id', 'pause');
      Spectrum2.stop();
      Spectrum.play();
    });

    // like
    $('#like').click(function() {
      // console.log(user);
      if (user === null) {
        closeNav();
        openNavLogin();
      } else {
        if (document.getElementById("like").style.color != "rgb(255, 31, 89)") {
          console.log("like");
          document.getElementById("like").style.color = "rgb(255, 31, 89)";
          addFavoriteTrack(actual_song.id, user.data.id);
        }
      }
    });
  });

  // click body clove slide menu
  $('#myDiagramDiv').click(function() {
    closeNav();
    closeNavTrack();
  });

  // click on playlist
  $('#yourMoosic').click(async function() {
    if (user !== null) {
      playlist_songs = await getUserPlaylist(user.data.id);
      // console.log(playlist_songs);
      createPlaylist(playlist_songs.data);
      openNavPlaylist();
    } else {
      openNavLogin();
    }
  });
});

function createPlaylist(songs) {
  // console.log(songs);
  var table;
  table = '<table id=playlist-table>';
  for (var i = 0; i < songs.length; i++) {
    // console.log(i);
    audioTrack = songs[i].audio
    // console.log(audioTrack);
    // console.log("funcionando");
    table += '<tr><td><img id="artwork" src="' + songs[i].album_image + '" height="42" width="42"></img></td><td>' + songs[i].name + '</td><td>' + songs[i].artist_name + '</td><td><span id="like-playlist" class="fa fa-times" icon-playlist"></span></td><td><span id="play-playlist" class="fa fa-play icon-playlist" onclick="playFavSong(\'' + songs[i].audio + '\')"></span></td></tr>';
  }
  table += '</table>';
  $('#playlist-table').replaceWith(table);
}

function playFavSong(audio_song) {
  // console.log(audio_song);
  Spectrum2.load(audio_song);
  $('#audio-spectrum2').removeClass('hide');
  Spectrum2.on("ready", function() {
    $('#pause').addClass('hide');
    $('#play').removeClass('hide');
    Spectrum.stop();
    Spectrum2.play();
  });
}

function playNext() {
  actual_song = array_songs_url[index_songs];
  console.log('LLAMADO PLAYNEXT' + index_songs);
  if (index_songs < array_songs_url.length) {
    // console.log(array_songs_url);
    Spectrum.load(array_songs_url[index_songs].audio);
    document.getElementById("like").style.color = "white";
    $('#artwork').attr('src', array_songs_url[index_songs].album_image);
    $('#nameSong').text(array_songs_url[index_songs].name);
    $('#artistName').text(array_songs_url[index_songs].artist_name);
    Spectrum.on("ready", function() {
      Spectrum2.stop();
      $('#audio-spectrum').removeClass('hide');
      Spectrum.play();
      playtimeout = setTimeout(playNext, Spectrum.getDuration() * 1000 + (500));
      promptimeout = setTimeout(function() {
        showPrompt(array_songs_url[index_songs])
      }, (Spectrum.getDuration() * 1000) / 8);

    });
  }
}

function playNextSong() {
  clearTimeout(playtimeout);
  clearTimeout(promptimeout);
  index_songs++;
  playNext();
}

function playSongBefore() {
  clearTimeout(playtimeout);
  clearTimeout(promptimeout);
  if (index_songs > 0) {
    console.log(index_songs);
    index_songs--;
    playNext();
  } else {
    console.log(index_songs > 0);
  }
}

function playSongs(songs) {
  // console.log("atention se reproducira la siguiente lista: ");

  array_songs_url = new Array();
  for (let i = 0; i < songs.data.length; i++) {
    array_songs_url.push(songs.data[i]);
  }
  document.getElementById("like").style.color = "white";
  $('#artwork').attr('src', array_songs_url[0].album_image);
  $('#nameSong').text(array_songs_url[0].name);
  $('#artistName').text(array_songs_url[0].artist_name);
  console.log(array_songs_url[0].name);
  actual_song = array_songs_url[0];
  console.log(actual_song);
  Spectrum.load(array_songs_url[0].audio);
  Spectrum.on("ready", function() {
    Spectrum2.stop();
    Spectrum.play();
    playtimeout = setTimeout(playNext, Spectrum.getDuration() * 1000 + (500));
    promptimeout = setTimeout(function() {
      showPrompt(songs.data[0])
    }, (Spectrum.getDuration() * 1000) / 8); //(Spectrum.getDuration() * 1000) / 4 + (500)
    // console.log("Se reproducira la siguiente cancion pasados: " + Spectrum.getDuration() + " Segundos");
  });
  // alert("songs");
  $('#audio-spectrum').removeClass('hide');
  $('#play').addClass('hide');
  $('#pause').removeClass('hide');
  $('#backward').removeClass('hide');
  $('#forward').removeClass('hide');
  $('#like').removeClass('hide');
  openNavMenu();
  openNavTrack();
}

function showPrompt(song) {
  console.log("LA DURACION ES " + Spectrum.getDuration());
  createPrompt(song);
  if (user != null) {
    $('#promptTags').removeClass('hide');
  }
  // $('#promptTags').css({'background-color':'black'});

}

async function createPrompt(song) {
  if (user == null) {
    // closeNav();
    // openNavLogin();
    id_user = 100;
  } else {
    var id_user = user.data.id;
  }
  // console.log("CREAR PROMPT CON LOS VALORES DE " + beforeVote(song.id, 66));
  /*
  <form id="formTags">
    <input id="pop" type="checkbox" value="pop">Pop</input>
    <input id="rock" type="checkbox" value="rock">Rock</input>
    <input id="trap" type="checkbox" value="trap">Trap</input>
    <input id="submitTags" type="button" value="READY!"/>
  </form>
  */
  var tags_by_song = await beforeVote(song.id, 66);
  console.log(tags_by_song);
  var s = '';
  // s += '<form id="formTags" type="POST">';
  for (let i = 0; i < tags_by_song.data.length; i++) {
    tag = (tags_by_song.data[i]).toLowerCase();
    var like = "like";
    var dislike = "dislike";
    s += '<div id="' + tag + '"><h3> ' + tag + ' </h3>';
    s += '<button type="button" onclick="hideTag(this.id), tagToVoteLike(' + song.id + ', ' + id_user + ', this.id)" id="' + tag + '"  class="btn btn-success btn-circle btn-lg"><i class="glyphicon glyphicon-thumbs-up"></i></button>';
    s += '<button type="button" onclick="hideTag(this.id), tagToVoteNull(' + song.id + ', ' + id_user + ', this.id)" id="' + tag + '"  class="btn btn-warning btn-circle btn-lg"><i class="far fa-meh"></i></button>';
    s += '<button type="button" onclick="hideTag(this.id), tagToVoteDislike(' + song.id + ', ' + id_user + ', this.id)" id="' + tag + '" class="btn btn-danger btn-circle btn-lg"><i class="glyphicon glyphicon-thumbs-down"></i></button></div>';
    // s += '<input id="' + tags_by_song.data[i] + '" type="checkbox" value="' + tags_by_song.data[i] + '">' + tags_by_song.data[i] + '</input><br>';
  }
  // s+= '<br><br><button type="button" id="submitTags" class="btn btn-info btn-circle btn-xl"><i class="glyphicon glyphicon-ok"></i></button>';
  // s += '</form>';

  document.getElementById('promptTags').innerHTML = s;

  $('#submitTags').click(function() {
    $('#promptTags').addClass('hide');
  });
}

function hideTag(id_div) {
  console.log(id_div);
  $('#' + id_div).addClass('hide');
}

function tagToVoteDislike(id_track, id_user, tag) {
  console.log('A votar en dislike ' + id_track + ", " + id_user + ", " + tag);
  vote(id_track, id_user, 'dislike', tag);
}

function tagToVoteLike(id_track, id_user, tag) {
  console.log('A votar en like ' + id_track + ", " + id_user + ", " + tag);
  vote(id_track, id_user, 'like', tag);
}

function tagToVoteNull(id_track, id_user, tag) {
  console.log('A votar en null ' + id_track + ", " + id_user + ", " + tag);
  vote(id_track, id_user, 'zero', tag);
}



// Slide menu functions
function openNavMenu() {
  document.getElementById("mySidenavBg").style.width = "350px";
  document.getElementById("mySidenavTrack").style.width = "350px";
  document.getElementById("icon-open").style.opacity = 0;
}

function openNavMenuUser() {
  document.getElementById("mySidenavTrack").style.width = "0";
  // document.getElementById("mySideMenu").style.width = "350px";
}

function closeNavMenu() {
  // document.getElementById("mySideMenu").style.width = "0";
  document.getElementById("mySidenavBg").style.width = "0";
  document.getElementById("icon-open").style.opacity = 1;
}

function closeNavTrack() {
  document.getElementById("mySidenavTrack").style.width = "0";
  // document.getElementById("mySideMenu").style.width = "0";
  document.getElementById("mySidenavBg").style.width = "0";
  document.getElementById("icon-open").style.opacity = 1;
}

// open right menu
function openNavTrack() {
  document.getElementById("mySidenavTrack").style.width = "350px";
  // document.getElementById("mySideMenu").style.width = "0";
}
// close right menu
function closeNav() {
  // document.getElementById("mySideMenu").style.width = "350px";
  document.getElementById("mySidenavLogin").style.width = "0";
  document.getElementById("mySidenavTrack").style.width = "350px";
  document.getElementById("mySidenavRegister").style.width = "0";
  document.getElementById("mySidenavPlaylist").style.width = "0";
}
// close login
function closeLogin() {
  document.getElementById("mySidenavLogin").style.width = "0";
  document.getElementById("mySidenavBg").style.width = "0";
  document.getElementById("icon-open").style.opacity = 1;
}


// open login
function openNavLogin() {
  document.getElementById("mySidenavTrack").style.width = "0";
  document.getElementById("mySidenavLogin").style.width = "350px";
  // document.getElementById("mySideMenu").style.width = "0";

}
// open Register
function openNavRegister() {
  document.getElementById("mySidenavRegister").style.width = "350px";
  document.getElementById("mySidenavLogin").style.width = "0";
}

// open playlist
function openNavPlaylist() {
  document.getElementById("mySidenavPlaylist").style.width = "350px";
  document.getElementById("mySidenavTrack").style.width = "0";
}
