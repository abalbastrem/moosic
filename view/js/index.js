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

// Waves audio

// var Spectrum = WaveSurfer.create({
//     container: '#audio-spectrum',
//     scrollParent: true,
//     progressColor: "#03a9f4"
// });
//
// Spectrum.on("ready", function(){
//     // Do something when the file has been loaded
//
//     // Do whatever you need to do with the player
//     Spectrum.play();
//     Spectrum.pause();
//     Spectrum.stop();
// });
//
// Spectrum.load('audio/id.mp3');

// wavesurfer.on('ready', function () {
//     wavesurfer.play();
// });

// functions of buttons play, pause, forward, backward
