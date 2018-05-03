// Send TAGS. Array json
function sendTags() {
  var tags = {
    "tags": ["rock", "pop", "indie"]
  };

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
}
