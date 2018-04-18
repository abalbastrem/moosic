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

// var wavesurfer = WaveSurfer.create({
//     container: '#waveform',
//     scrollParent: true
// });
//
// wavesurfer.load('audio/id.mp3');
//
// wavesurfer.on('ready', function () {
//     wavesurfer.play();
// });

// functions of buttons play, pause, forward, backward
