var port = 8888;
var url_login = "http://192.168.1.17:" + port + "/login";
var url_signup = "http://192.168.1.17:" + port + "/signup";



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
          $('#promptTags').removeClass('hide');
          promptTags();
          $('#register').addClass('hide');
        },
        error: function(data) {
          console.log('error');
          // console.log(data);
        }
      };
      $.ajax(options);
    } else {
      console.log("nombre o pass vacio");
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

    console.log(name + "," + lastname + "," + username + "," + email + "," + password + "," + repeatPassword + "," + sex + "," + terms);
    var params = {
      "name": name,
      "lastname": lastname,
      "username": username,
      "email": email,
      "password": password,
      "sex": sex
    }
    console.log(params);

    validSignIn = validateSignIn(params, terms, repeatPassword);
    console.log(validSignIn);
    if (validSignIn == true) {
      console.log("login valido");
        var options = {
          url: url_signup,
          dataType: "json",
          type: "POST",
          data: "json="+JSON.stringify(params),
          processData: true,
          success : function(data) {
            console.log('success');
            console.log(data);
          },
          error: function(data) {
            console.log('error');
            // console.log(data);
          }
        };
        $.ajax(options);
    }
  });
});

function validateSignIn(params, terms, repeatPassword) {

  console.log(name);
  var validSignIn = true;

  // if terms not checked
  if (!terms) {
    console.log("not checked");
    $('#loginErrorMsgAgreeTerms').removeClass('hide');
    validSignIn = false;
  } else {
    $('#loginErrorMsgAgreeTerms').addClass('hide');
  }

  if (params.password != repeatPassword) {
    console.log("password no identical");
    $('#loginErrorMsgRepeatPass').removeClass('hide');
    validSignIn = false;
  } else {
    $('#loginErrorMsgRepeatPass').addClass('hide');
  }

  // required camps red
  if (params.name == '') {
    $('#nameDiv').addClass('required');
    validSignIn = false;
  } else {
    $('#nameDiv').removeClass('required');
  }
  if (params.lastname == '') {
    $('#lastnameDiv').addClass('required');
    validSignIn = false;
  } else {
    $('#lastnameDiv').removeClass('required');
  }
  if (params.username == '') {
    $('#usernameDiv').addClass('required');
    validSignIn = false;
  } else {
    $('#usernameDiv').removeClass('required');
  }
  if (params.email == '') {
    $('#emailDiv').addClass('required');
    validSignIn = false;
  } else {
    $('#emailDiv').removeClass('required');
  }
  if (params.password == '') {
    $('#passwordDiv').addClass('required');
    validSignIn = false;
  } else {
    $('#passwordDiv').removeClass('required');
  }
  if (repeatPassword == '') {
    $('#repeatPasswordDiv').addClass('required');
    validSignIn = false;
  } else {
    $('#repeatPasswordDiv').removeClass('required');
  }

  return validSignIn;
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

function getTracks(tagsArray) {
  var tags = {
    "tags": tagsArray
  };

  var port = 8888;
  var url_s = "http://192.168.1.17:" + port + "/get";
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

// getTracks(new Array('rock','pop','trap'));
