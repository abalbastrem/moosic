// Send TAGS. Array json
function sendTags() {
  var tags = {
    "tags": ["rock", "pop", "indie"]
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/test";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(tags),
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


function signup() {
  var params = {
    "name": "Albert",
    "lastname": null,
    "username": 'AAlbert',
    "password": "1234",
    "email": "albert@gmail.com",
    "sex": null
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/signup";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(params),
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

function login() {
  var params = {
    "username": 'AAlbert',
    "password": "1234"
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/login";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(params),
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


function getTracks() {
  var tags = {
    "tags": ["Rock", "Pop", "Indie"]
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/getmoosics";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(tags),
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

function beforeVote() {
  var args = {
    "id_track": 1367863,
    "id_user": 66 // track es 1344749 y id_user = 66
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/beforevote";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
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
  // Resultados esperados
  /*
  {Rock,acidjazz}
  */

}

function vote() {
  var args = {
    "id_track": 1482417,
    "id_user": 66,
    "vote": "like",
    "tag": "Rock"
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/vote";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
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
  // Resultados esperados
  /*
  {Rock,acidjazz}
  */

}

function addFavoriteTrack() {
  var args = {
    "id_track": 10632,
    "id_user": 66,
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/favoritetrack";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
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
  // Resultados esperados
  /*
  {Rock,acidjazz}
  */

}
function dropFavoriteTrack() {
  var args = {
    "id_track": 10632,
    "id_user": 66,
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/unfavoritetrack";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
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

function getUserPlaylist() {
  var args = {
    "id_user": 66
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/userfavorites";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
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

function beforeMoods() {
  var args = {
    "id_user": 66,
    "id_track": 1344750
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/beforemoods";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
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


function voteMood() {
  var args = {
    "id_user": 66,
    "id_track": 1344750,
    "moods_like": ['Happy', 'Anxious', 'Epic'],
    "moods_zero": ['Frantic', 'Energetic', 'Melancholic', 'Depressive', 'Calm']
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/moods";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
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


function getTags() {
  var args = {
    "tags": ['Rock', 'Pop', 'Indie']
  };

  var port = 8888;
  var url_s = "http://localhost:" + port + "/getTags";
  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_s,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
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
