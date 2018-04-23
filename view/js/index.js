$(document).ready(function(){
  // Waves audio
  var Spectrum = WaveSurfer.create({
      container: '#audio-spectrum',
      // Add some color to the audio spectrum
      progressColor: "#03a9f4",
      barWidth: 1,
      skipLength: 20.0
  });

  Spectrum.on("ready", function(){
      // Do whatever you need to do with the player
      $('#play').click(function(){
        // alert(this.id);
        if (this.id === 'pause') {
          // alert('pausando');
          $('#pause').removeClass('fa fa-pause').addClass('fa fa-play');
          //$('#play').removeAttr('id', 'pause');
          $('#pause').attr('id', 'play');
          Spectrum.pause();
        } else {
          $('#play').removeClass('fa fa-play').addClass('fa fa-pause');
          //$('#play').removeAttr('id', 'play');
          $('#play').attr('id', 'pause');
          Spectrum.play();
        }
      });

      $('#stop').click(function(){
        // alert('btn-stop')
        $('#pause').removeClass('fa fa-pause').addClass('fa fa-play');
        $('#play').removeAttr('id', 'pause');
        $('#pause').attr('id', 'play');
        Spectrum.stop();
      });

      $('#forward').click(function(){
        // alert('btn-forward')
        Spectrum.skipForward();
      });

      $('#backward').click(function(){
        // alert('btn-backward')
        Spectrum.skipBackward();
      });
  });

  Spectrum.load('https://mp3l.jamendo.com/?trackid=1501986&format=mp31&from=app-e106f235');
});

// Button object

var buttons = {
    play: document.getElementById("play"),
    pause: document.getElementById("pause"),
    pause: document.getElementById("stop"),
    backward: document.getElementById("backward"),
    forward: document.getElementById("forward")
};

// Slide menu functions
function openNav() {
    document.getElementById("mySidenav").style.width = "650px";
    document.getElementById("footer").style.width = "650px";
    document.getElementById("mySidenavBg").style.width = "650px";
    document.getElementById("icon-open").style.opacity = 0;
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("footer").style.width = "0";
    document.getElementById("mySidenavBg").style.width = "0";
    document.getElementById("icon-open").style.opacity = 1;
}
