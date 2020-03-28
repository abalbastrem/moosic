var port = 8888;
var url = "http://localhost"
var url_login = url + ":" + port + "/login";
var url_signup = url + ":" + port + "/signup";
var url_getMoosics = url + ":" + port + "/getmoosics";
var url_blindStart = url + ":" + port + "/blindstart";
var url_tags = url + ":" + port + "/gettags";
var top_tags = new Array();
var more_tags = new Array();


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
          closeNav();
          closeNavMenu();
          //data = JSON.parse(data);
          // alert(data.data['name'] + " " + data.data['lastname']);
          // $('#promptTags').removeClass('hide');
          // promptTags();
          $('#register').addClass('hide');
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

          if (data.message == 'user already exists') {
            $('#loginErrorMsgUserAlreadyExists').removeClass('hide');
          } else {
            $('#loginErrorMsgUserAlreadyExists').addClass('hide');
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

  // if terms not checked
  if (!terms) {
    console.log("not checked");
    $('#loginErrorMsgAgreeTerms').removeClass('hide');
    validSignUp = false;
  } else {
    $('#loginErrorMsgAgreeTerms').addClass('hide');
  }

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

// function getTracks(tagsArray) {
//   var tags = {
//     "tags": tagsArray
//   };
//   var options = {
//     url: url_getMoosics,
//     dataType: "json",
//     type: "POST",
//     data: 'json=' + JSON.stringify(tags),
//     processData: true,
//     success: function(data) {
//       console.log('success get tracks');
//       console.log(data);
//     },
//     error: function(data) {
//       console.log('error');
//       console.log(data);
//     }
//   };
//   $.ajax(options);
// }

async function getTracks(tagsArray) {
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

async function getTags(tag) {
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

// init function for top tags
(function getTopTags() {
  var port = 8888;
  var options = {
    url: url_blindStart,
    type: "POST",
    success: function(data) {
      console.log('success get top tags');
      console.log(data);
      // top_tags = JSON.parse(data.data);
      top_tags = data.data.slice(0, 10);
      // console.log(top_tags);
    },
    error: function(data) {
      console.log('error');
      console.log(data);
    }
  };
  $.ajax(options);
})();


function beforeVote() {
  var args = {
    "id_track": 1344749,
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
