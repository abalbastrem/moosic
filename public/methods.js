var port = 8888;
var url = "http://192.168.1.17";
// var url = "http://localhost";
var url_login = url + ":" + port + "/login";
var url_signup = url + ":" + port + "/signup";
var url_getMoosics = url + ":" + port + "/getmoosics";
var url_blindStart = url + ":" + port + "/blindstart";
var url_tags = url + ":" + port + "/gettags";
var url_addFavTrack = url + ":" + port + "/favoritetrack";
var url_getUserPlaylist = url + ":" + port + "/userfavorites";
var url_vote = url + ":" + port + "/vote";
var url_beforeVote = url + ":" + port + "/beforevote";
var url_dropFavoriteTrack = url + ":" + port + "/unfavoritetrack";
var top_tags = new Array();
var more_tags = new Array();
var user = null;
var username;


$(document).ready(function() {
  // Login
  $('#signin').click(function() {
    var email = $('input[id=email]').val();
    var password = $('input[id=password]').val();
    var params = {
      "username": email,
      "password": password
    };

    if (email != '' && password != '') {
      var options = {
        url: url_login,
        dataType: "json",
        type: "POST",
        data: "json=" + JSON.stringify(params),
        processData: true,
        success: function(data) {
          console.log('success');
          console.log(data);
          if (data.status === true) {
            user = data;
            username = data.data.username;
            // console.log(user);
            closeLogin();
            $('#register').addClass('hide');
            $('#login').addClass('hide');
            $('#logout').removeClass('hide');
            $('#loginMenuLink').addClass('hide');
            $('#usernameMenu').removeClass('hide');
            $('#yourMoosic').removeClass('hide');
            $('#usernameMenu').text("@" + username);
          } else {
            $('#loginErrorMsg').removeClass('hide');
          }
        },
        error: function(data) {
          console.log('error');
        }
      };
      $.ajax(options);
    } else {
      if (email == '') {
        $('#emailLoginDiv').addClass('required');
      } else {
        $('#emailLoginDiv').removeClass('required');
      }
      if (password == '') {
        $('#passwordLoginDiv').addClass('required');
      } else {
        $('#passwordLoginDiv').removeClass('required');
      }
      $('#loginErrorEmptyFields').removeClass('hide');
    }
  });

  // Logout
  $('#logout').click(function(){
      user = null;
      $('#register').removeClass('hide');
      $('#login').removeClass('hide');
      $('#logout').addClass('hide');
      $('#usernameMenu').addClass('hide');
      $('#loginMenuLink').removeClass('hide');
      $('#yourMoosic').addClass('hide');
      // closeNavMenu();
      closeNavTrack();
      openNavMenu();
      openNavLogin();
  });

  // Sign up
  $('#signup').click(function() {
    var name = ($('input[id=name]').val()).trim();
    var lastname = ($('input[id=lastname]').val()).trim();
    var username = ($('input[id=username-signup]').val()).trim();
    var email = ($('input[id=email-signup]').val()).trim();
    var password = ($('input[id=password-signup]').val()).trim();
    var repeatPassword = ($('input[id=repeat-password]').val()).trim();
    var sex = $('select[id=sex]').val();
    var terms = $('input[id=agreeTerms]').is(':checked');

    //console.log(name + "," + lastname + "," + username + "," + email + "," + password + "," + repeatPassword + "," + sex + "," + terms);
    var params = {
      "name": name,
      "lastname": lastname,
      "username": username,
      "email": email,
      "password": password,
      "sex": sex
    }
    console.log(params);

    validSignUp = validateSignUp(params, terms, repeatPassword);
    console.log(validSignUp);
    if (validSignUp == true) {
      console.log("login valido");
      var options = {
        url: url_signup,
        dataType: "json",
        type: "POST",
        data: "json=" + JSON.stringify(params),
        processData: true,
        success: function(data) {
          console.log('success');
          console.log(data.message);

          if (data.status === true) {
            $('#logout').removeClass('hide');
          }

          if (data.data == 1) {
            $('#loginErrorMsgUserAlreadyExists').removeClass('hide');
          } else {
            $('#loginErrorMsgUserAlreadyExists').addClass('hide');
          }

          if (data.data == 2) {
            $('#loginErrorMsgUserCouldntBeRegister').removeClass('hide');
          } else {
            $('#loginErrorMsgUserCouldntBeRegister').addClass('hide');
          }

        },
        error: function(data) {
          console.log('error');
          // console.log(data);
        }
      };
      $.ajax(options);
    } else {
      $('#loginErrorMsgUserAlreadyExists').addClass('hide');
      console.log("login no valido");
    }
  });
  // end document ready
});

function validateSignUp(params, terms, repeatPassword) {
  console.log(name);
  var validSignUp = true;

  if (params.password != repeatPassword) {
    console.log("password no identical");
    $('#loginErrorMsgRepeatPass').removeClass('hide');
    validSignUp = false;
  } else {
    $('#loginErrorMsgRepeatPass').addClass('hide');
  }

  // required camps red
  if (params.name == '') {
    $('#nameDiv').addClass('required');
    validSignUp = false;
  } else {
    $('#nameDiv').removeClass('required');
  }
  if (params.lastname == '') {
    $('#lastnameDiv').addClass('required');
    validSignUp = false;
  } else {
    $('#lastnameDiv').removeClass('required');
  }
  if (params.username == '') {
    $('#usernameDiv').addClass('required');
    validSignUp = false;
  } else {
    $('#usernameDiv').removeClass('required');
  }
  if (params.email == '') {
    $('#emailDiv').addClass('required');
    validSignUp = false;
  } else {
    $('#emailDiv').removeClass('required');
  }
  if (params.password == '') {
    $('#passwordDiv').addClass('required');
    validSignUp = false;
  } else {
    $('#passwordDiv').removeClass('required');
  }
  if (repeatPassword == '') {
    $('#repeatPasswordDiv').addClass('required');
    validSignUp = false;
  } else {
    $('#repeatPasswordDiv').removeClass('required');
  }

  return validSignUp;
}

function promptTags() {
  $('#submitTags').click(function() {
    var pop = $('input[id=pop]').val();
    var trap = $('input[id=trap]').val();
    var rock = $('input[id=rock]').val();
    console.log(pop);
    console.log(rock);
    console.log(trap);
    $('#promptTags').addClass('hide');
  });
}

async function getTracks(tagsArray) {
  console.log("IN FUNCTION getTracks")
  var tags = {
    "tags": tagsArray
  };
  var options = {
    url: url_getMoosics,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(tags),
    processData: true,
  };
  const result = await $.ajax(options);
  playSongs(result);
  return result;
}

async function beforeVote(id_track, id_user) {
  console.log("IN FUNCTION beforeVote")
  var args = {
    "id_track": id_track,
    "id_user": id_user // track es 1344749 y id_user = 66
  };

  var options = {
    url: url_beforeVote,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
    processData: true,
  };
  const res = await $.ajax(options);
  return res;
}

function vote(id_track, id_user, vote, tag) {
  console.log("IN FUNCTION vote")
  var args = {
    "id_track": id_track,
    "id_user": id_user,
    "vote": vote,
    "tag": tag
  };

  var options = {
    url: url_vote,
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

async function getTags(tag) {
  console.log("IN FUNCTION getTags")
  var args = {
    "tags": tag
  };
  var options = {
    url: url_tags,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
    processData: true,
  };
  const result = await $.ajax(options);
  return result;
}

// playlist
function addFavoriteTrack(id_track, id_user) {
  console.log("IN FUNCTION addFavoriteTrack")
  var args = {
    "id_track": id_track,
    "id_user": id_user,
  };

  var options = {
    url: url_addFavTrack,
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

function dropFavoriteTrack(id_track, id_user) {
  console.log("ELIMINAMOS " + id_track + ", " + id_user);
  var args = {
    "id_track": id_track,
    "id_user": id_user
  };

  //console.log(url_s);
  //console.log(tags);

  var options = {
    url: url_dropFavoriteTrack,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
    processData: true,
    success: function(data) {
      console.log('success');
      console.log(data);
      return true;
    },
    error: function(data) {
      console.log('error');
      console.log(data);
      return false;
    }
  };
  $.ajax(options);
}

async function getUserPlaylist(id_user) {
  console.log("IN FUNCTION getUserPlaylist")
  var args = {
    "id_user": id_user
  };

  var options = {
    url: url_getUserPlaylist,
    dataType: "json",
    type: "POST",
    data: 'json=' + JSON.stringify(args),
    processData: true,
  };
  const res = await $.ajax(options);
  return res;

}


// init function for top tags
(function getTopTags() {
  console.log("IN FUNCTION getTopTags")
  console.log("GETTOPTAGS");
  // var port = 9229;
  var options = {
    url: url_blindStart,
    type: "POST",
    success: function(data) {
      console.log('success get top tags');
      console.log(data);
      top_tags = data.data.slice(0, 10);
      console.log(top_tags);
    },
    error: function(data) {
      console.log('error getting top tags');
      console.log(data);
    }
  };
  $.ajax(options);
  // const result = await $.ajax(options);
  // return result;
})();
