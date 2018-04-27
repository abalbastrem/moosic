// document is ready.
$(document).ready(function() {
  // Waves audio
  var Spectrum = WaveSurfer.create({
    container: '#audio-spectrum',
    progressColor: "#03a9f4",
    barWidth: 3,
    skipLength: 10.0
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
    // stop the song
    $('#stop').click(function() {
      $('#pause').removeClass('fa fa-pause').addClass('fa fa-play');
      $('#pause').attr('id', 'play');
      Spectrum.stop();
    });
    // forward 10s the song
    $('#forward').click(function() {
      Spectrum.skipForward();
    });
    // backward 10s the song
    $('#backward').click(function() {
      Spectrum.skipBackward();
    });
  });
  // load the song
  Spectrum.load('https://mp3l.jamendo.com/?trackid=1501986&format=mp31&from=app-e106f235');
});

// Login

// Send TAGS. Array json
(function sendTags() {
  var tags = {"tags":["rock","pop","indie"]};

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
})();

// Slide menu functions
// open right menu
function openNav() {
  document.getElementById("mySidenav").style.width = "650px";
  document.getElementById("footer").style.width = "650px";
  document.getElementById("mySidenavBg").style.width = "650px";
  document.getElementById("icon-open").style.opacity = 0;
}
// close right menu
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("footer").style.width = "0";
  document.getElementById("mySidenavBg").style.width = "0";
  document.getElementById("icon-open").style.opacity = 1;
}
