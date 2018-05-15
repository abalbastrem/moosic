var array_songs_url;
var index_songs = 0;
var playtimeout;
var Spectrum;
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

  Spectrum.on("ready", function() {
    // Do whatever you need to do with the player
    $('#pause').click(function() {
        console.log(this.id+"::pause");
        $('#pause').addClass('hide');
        $('#play').removeClass('hide');
        // $('#pause').attr('id', 'play');
        Spectrum.pause();
    });

    $('#play').click(function() {
      console.log(this.id+"::play");
      $('#play').addClass('hide');
      $('#pause').removeClass('hide');
      // $('#play').attr('id', 'pause');
      Spectrum.play();
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
      // console.log(user);
      if (user === null) {
        closeNav();
        openNavLogin();
      } else {
        if (document.getElementById("like").style.color != "rgb(255, 31, 89)") {
          console.log("like");
          document.getElementById("like").style.color = "rgb(255, 31, 89)";
          console.log(user.data);
          console.log(actual_song);
          // add to playlist
          addFavoriteTrack(actual_song.id, user.data.id);

          //$('#playlist-table').append('<tr><td><img id="artwork" src="img/artwork-jamendo.jpg" height="42" width="42"></img></td><td>E. Satie - Trois Gnossiennes - I. Lent - Alessandro Simonetto</td><td>OnClassical</td><td><span id="like-playlist" class="fa fa-heart icon-playlist"></span></td><td><span id="play-playlist" class="fa fa-play icon-playlist"></span></td></tr>');

          //document.getElementById("like-playlist").style.color = "rgb(255, 31, 89)";
        } else {
          console.log("unlike");
          document.getElementById("like").style.color = "white";
          document.getElementById("like-playlist").style.color = "white";
        }
      }
    });
  });

  // click body clove slide menu
  $('#myDiagramDiv').click(function() {
    closeNav();
    closeNavMenu();
  });

  // click on playlist
  $('#playlist').click(async function() {
    if (user !== null) {
      playlist_songs = await getUserPlaylist(user.data.id);
      console.log(playlist_songs);
      createPlaylist(playlist_songs.data);
      openNavPlaylist();
    } else {
      openNavLogin();
    }
  });
});

function createPlaylist(songs) {
  console.log(songs);
  var table;
  table = '<table>';
  for (var i = 0; i < songs.length; i++) {
    // console.log(i);
    audioTrack = songs[i].audio
    console.log(audioTrack);
    table += '<tr><td><img id="artwork" src="' + songs[i].album_image + '" height="42" width="42"></img></td><td>' + songs[i].album_name + '</td><td>' + songs[i].artist_name + '</td><td><span id="like-playlist" class="fa fa-heart icon-playlist"></span></td><td><span id="play-playlist" class="fa fa-play icon-playlist" onclick="playFavSong("' + audioTrack + '")"></span></td></tr>';
  }
  table += '</table>';
  $('#playlist-table').replaceWith(table);
}

function playFavSong(audio_song) {
  console.log(audio_song);
  // Spectrum.load(audio_song);
  // Spectrum.play();
}

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
  // console.log("atention se reproducira la siguiente lista: ");

  array_songs_url = new Array();
  for (let i = 0; i < songs.data.length; i++) {
    array_songs_url.push(songs.data[i]);
  }

  $('#artwork').attr('src', array_songs_url[0].album_image);
  $('#nameSong').text(array_songs_url[0].album_name);
  $('#artistName').text(array_songs_url[0].artist_name);
  console.log(array_songs_url[0].album_name);
  actual_song = array_songs_url[0];
  console.log(actual_song);
  Spectrum.load(array_songs_url[0].audio);
  Spectrum.on("ready", function() {
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
  $('#promptTags').removeClass('hide');
  // $('#promptTags').css({'background-color':'black'});

}

async function createPrompt(song) {
  if (user == null) {
    // closeNav();
    // openNavLogin();
    id_user = 100;
  } else {
    var id_user = user.id;
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
