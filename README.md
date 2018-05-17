# moosic 1.0
Final project of Web Developing
Proyecto final de Desarrollo de Aplicaciones Web

moosic is a platform where users are in power to discover and categorize music.
moosic es una plataforma donde los usuarios están al mando y pueden descubrir y categorizar música.

## ENG Instructions
After downloading the repository, you will to populate the database. There is two ways of doing this: either import our current database dump or create one your own.
<u>Import our database dump way:</u>
In postgresql, create a user named 'pc18'. With this user, create a database named 'music_final'. Connect to said database and import the file *moosic_final_export.pgsql* with `\i moosic_final_export.pgsql`
<u>Create a new database of your own way:</u>
You will need a jamendo API key. Get one at [https://devportal.jamendo.com/](URL)
Modify the file *./controller/globals/JAMENDO_KEY* and substitute the current key with the one you got from jamendo.
Regardless of the method, you'll have to modify these files in the following ways:
  * *./controller/globals/DBCONFIG* :: Change the postgres database configuration
  * *./view/moosic-v2.html* :: Change all the href and src in the first few lines to your server
  * *.view/js/methods.js* :: Change url in line 2 to your server

If you're doing your own dump, you'll have to do the following to successfully do the dump:
Uncomment the penultimate line in .server.js where it says `db.firstDump();`
Execute *./server.js* in a terminal with `node server.js`. The first dump will take place and will take a few minutes. You can close the server after that and comment the line again, then restart server.js as usual.


## SPA Instrucciones
Después de bajar o clonar el repositorio, vas a tener que popular la base de datos. Hay dos maneras de hacerlo: o bien importar nuestro dump actual o bien crear uno propio.
<u>Si importas nuestro dump:</u>
En postgres, crea el usuario 'pc18'. Con este usuario, crea la base de datos 'music_final'.
Conéctate a esta BBDD e importa el archivo *moosic_final_export.pgsql* con `\i moosic_final_export.pgsql`
<u>Si haces un dump propio:</u>
Necesitarás una key de la API de jamendo. Consigue una aquí: [https://devportal.jamendo.com/](URL)
Modifica el fichero *./controller/globals/JAMENDO_KEY* y substituye su key por la key que has conseguido de jamendo.
Independientemente del método que uses para el dump, tendrás que modificar los siguientes ficheros de las siguientes maneras:
  * *./controller/globals/DBCONFIG* :: Cambia la configuración de la base de datos postgres
  * *./view/moosic-v2.html* :: Cambia todos los href y src de las primeras lineas a tu dirección de servidor
  * *.view/js/methods.js* :: Cambia la url de la segunda línea a tu dirección de servidor

Si estás haciendo tu propio dump, vas a tener que hacer lo siguiente:
Descomenta la penúltima línea en *.server.js*, donde dice `db.firstDump();`
Ejecuta ./server.js en una terminal con `node server.js`. El primer dump empezará de inmediato y tomará unos minutos. Puedes cerrar el servidor después de eso, comentar esa línea y ejecutar el servidor de nuevo.

## ENG Known bugs
* visible vertical and horizontal scrollbars
* soundwave take a bit to load and meanwhile, a small scrollbar is visible in its place
* If clicking happens to fast, the app crashes
* moosics only show as favoorites in the 'favoorite moosics' playlist, but not during normal play
* sometimes lines will be drawn over a circular node
* when finishing a moosic, the player will just repeat it

## SPA bugs conocidos
* scrollbars vertical y horizontal visibles
* la onda sonora tarda un poco en cargar, y entretanto aparece una pequeña scrollbar
* si se clicka demasiado rápido, la app se cuelga
* las moosics sólo aparecen como favoritas en la playlist 'favoorite moosics', pero no durante la reproducción normal
* ocasionalmente, las líneas se dibujan por encima de los nodos circulares
* cuando finaliza una moosic, el player la repite en loop

### Happy joorney into moosic !