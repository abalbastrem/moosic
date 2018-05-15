# moosic
Final project of Web Developing
Proyecto final de Desarrollo de Aplicaciones Web

moosic is a platform where users are in power to discover and categorize music.
moosic es una plataforma donde los usuarios están al mando y pueden descubrir y categorizar música.

## Instructions / Instrucciones
After downloading the repository, you will need a jamendo API key. Get one at https://devportal.jamendo.com/
Files to modify:
  * ./controller/globals/JAMENDO_KEY :: Write in the jamendo API KEY
  * ./controller/globals/DBCONFIG :: Change the database configuration
  * ./view/moosic-v2.html :: Change all the href and src in the first few lines to your local address
  * .view/js/methods.js :: Change url in line 2 to your local address
Execute ./server.js in a terminal with 'node server.js'