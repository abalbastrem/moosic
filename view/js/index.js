// document is ready.
$(document).ready(function() {
  // Waves audio
  var Spectrum = WaveSurfer.create({
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
    // forward 10s the song
    $('#forward').click(function() {
      // Spectrum.skipForward();
      console.log("skip song");
    });
    // backward 10s the song
    $('#backward').click(function() {
      console.log("skipback song");
      // Spectrum.skipBackward();
    });
    // like
    $('#like').click(function() {
      if (document.getElementById("like").style.color != "rgb(255, 31, 89)") {
        console.log("like");
        document.getElementById("like").style.color = "rgb(255, 31, 89)";
      } else {
        console.log("unlike");
        document.getElementById("like").style.color = "white";
      }
    });
  });
  // load the song
  Spectrum.load('https://mp3l.jamendo.com/?trackid=1501986&format=mp31&from=app-e106f235');
});

// Login

// Send TAGS. Array json
function sendTags() {
  var tags = {
    "tags": ["rock", "pop", "indie"]
  };

  var port = 8888;
  var url_s = "http://192.168.1.17:" + port + "/test";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "text",
    type: "POST",
    data: "test=holi",
    processData: true,
    success: function(data) {
      console.log('success');
      console.log(data);
    },
    error: function(data) {
      console.log('error');
      console.log(data);
    }
  };
  $.ajax(options);
}

// Slide menu functions
function openNavMenu() {
  document.getElementById("mySideMenu").style.width = "350px";
  document.getElementById("mySidenavBg").style.width = "350px";
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
