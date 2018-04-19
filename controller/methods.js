const db = require('./database');

exports.testdb = async function() {
  try {
    console.log("::::: test query to database");
    await db.client.connect();
    var result = await db.client.query("SELECT * FROM genero");
    var ret = "";
    result.rows.forEach(function(element) {
      // console.log(element.name);
      ret += element.name + " ";
    });
    // await db.client.query("CREATE TABLE tablatest(col1 text, col2 text, col3 text)");
    // await db.client.query("INSERT INTO tablatest(col1, col2, col3) VALUES('pedro','romero','pakistan')");
    await db.client.end();
    console.log("::::: test query finished");
    console.log("::::: in function RESPONSE:\n" + ret);
    return ret;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};
