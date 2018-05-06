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

    validLogin = validateLogin(params, terms, repeatPassword);
    console.log(validLogin);
    if (validLogin == true) {
      console.log("login valido");
      // if (password == repeatPassword) {
      //   var options = {
      //     url: url_signup,
      //     dataType: "json",
      //     type: "POST",
      //     data: "json="+JSON.stringify(params),
      //     processData: true,
      //     success : function(data) {
      //       console.log('success');
      //       console.log(data);
      //     },
      //     error: function(data) {
      //       console.log('error');
      //       // console.log(data);
      //     }
      //   };
      //   $.ajax(options);
      // } else {
      //   $('#loginErrorMsgRepeatPass').removeClass('hide');
      // }
    }
  });
});

function validateLogin(params, terms, repeatPassword) {

  console.log(name);
  var validLogin = true;

  // if terms not checked
  if (!terms) {
    console.log("not checked");
    $('#loginErrorMsgAgreeTerms').removeClass('hide');
    validLogin = false;
  } else {
    $('#loginErrorMsgAgreeTerms').addClass('hide');
  }

  if (params.password != repeatPassword) {
    console.log("password no identical");
    $('#loginErrorMsgRepeatPass').removeClass('hide');
    validLogin = false;
  } else {
    $('#loginErrorMsgRepeatPass').addClass('hide');
  }

  // required camps red
  if (params.name == '') {
    $('#nameDiv').addClass('required');
    validLogin = false;
  } else {
    $('#nameDiv').removeClass('required');
  }
  if (params.lastname == '') {
    $('#lastnameDiv').addClass('required');
    validLogin = false;
  } else {
    $('#lastnameDiv').removeClass('required');
  }
  if (params.username == '') {
    $('#usernameDiv').addClass('required');
    validLogin = false;
  } else {
    $('#usernameDiv').removeClass('required');
  }
  if (params.email == '') {
    $('#emailDiv').addClass('required');
    validLogin = false;
  } else {
    $('#emailDiv').removeClass('required');
  }
  if (params.password == '') {
    $('#passwordDiv').addClass('required');
    validLogin = false;
  } else {
    $('#passwordDiv').removeClass('required');
  }
  if (repeatPassword == '') {
    $('#repeatPasswordDiv').addClass('required');
    validLogin = false;
  } else {
    $('#repeatPasswordDiv').removeClass('required');
  }

  return validLogin;
}
