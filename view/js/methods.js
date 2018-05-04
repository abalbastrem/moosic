var port = 8888;
var url_login = "http://192.168.1.17:" + port + "/login";
var url_signup = "http://192.168.1.17:" + port + "/signup";

$(document).ready(function(){
  // Login
  $('#signin').click(function(){
    var email = $('input[id=email]').val();
    var password= $('input[id=password]').val();
    var params = {
      "username":email,
      "password":password
    };
    if (email != '' && password != '') {
      var options = {
        url: url_login,
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
    } else {
        console.log("nombre o pass vacio");
        $('#loginErrorEmptyFields').removeClass('hide');
    }
  });

  // Sign up
  $('#signup').click(function(){
    var name = $('input[id=name]').val();
    var lastname = $('input[id=lastname]').val();
    var username = $('input[id=username-signup]').val();
    var email = $('input[id=email-signup]').val();
    var password = $('input[id=password-signup]').val();
    var repeatPassword = $('input[id=repeat-password]').val();
    var sex = $('select[id=sex]').val();
    var terms = $('input[id=agreeTerms]').is(':checked');


    // if terms not checked
    if (!terms) {
      console.log("not checked");
      $('#loginErrorMsgAgreeTerms').removeClass('hide');
    }

    // required camps red
    if (name.trim() == '') {
      $('#nameDiv').addClass('required');
    }
    if (lastname.trim() == '') {
      $('#lastnameDiv').addClass('required');
    }
    if (username.trim() == '') {
      $('#usernameDiv').addClass('required');
    }
    if (email.trim() == '') {
      $('#emailDiv').addClass('required');
    }
    if (password.trim() == '') {
      $('#passwordDiv').addClass('required');
    }
    if (repeatPassword.trim() == '') {
      $('#repeatPasswordDiv').addClass('required');
    }

    console.log(name + "," + lastname + "," + username + "," + email + "," + password + "," + repeatPassword + "," + sex + "," + terms);
    var params = {
      "name":name,
      "lastname":lastname,
      "username":username,
      "email":email,
      "password":password,
      "sex":sex
    }
    console.log(params);
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
  });
});
