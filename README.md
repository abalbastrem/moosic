# moosic
Final project of Web Developing
Proyecto final de Desarrollo de Aplicaciones Web

moosic is a platform where users are in power to discover and categorize music.
moosic es una plataforma donde los usuarios están al mando y pueden descubrir y categorizar música.

## Instructions / Instrucciones
After downloading the repository, you will need a jamendo API key. Get one at https://devportal.jamendo.com/
Files to modify:
  * ./controller/globals/JAMENDO_KEY :: Write in the jamendo API KEY
  * ./controller/globals/DBCONFIG :: Change the postgres database configuration
  * ./view/moosic-v2.html :: Change all the href and src in the first few lines to your local address
  * .view/js/methods.js :: Change url in line 2 to your local address

Once you're comfortable, you'll have to do the first database dump. Uncomment the penultimate line in .server.js where it says `db.firstDump();`
Execute ./server.js in a terminal with 'node server.js'. The first dump will take place and will take a few minutes. You can close the server after that and comment the line again, then restart server.js as usual.

Después de bajar o clonar el repositorio, neceistarás una KEY de la API de jamendo. Consigue una aquí: https://devportal.jamendo.com/
Ficheros a modificar:
  * ./controller/globals/JAMENDO_KEY :: Escribe aquí tu KEY de jamendo
  * ./controller/globals/DBCONFIG :: Cambia la configuración de la base de datos postgres
  * ./view/moosic-v2.html :: Cambia todos los href y src de las primeras lineas a tu dirección local
  * .view/js/methods.js :: Cambia la url de la segunda línea a tu dirección local
Una vez estés cómodo, vas a tener que hacer un primer dump. Descomenta la penúltima línea en .server.js, donde dice `db.firstDump();`
Ejecuta ./server.js en una terminal con 'node server.js'. El primer dump empezará de inmediato y tomará unos minutos. Puedes cerrar el servidor después de eso, comentar esa línea y ejecutar el servidor de nuevo.


### Happy joorney into music
