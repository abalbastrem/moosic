# moosic 0.8
Final project of Web Developing

moosic is a platform where users are in power to discover and categorize music.
moosic uses Jamendo's API in order to provide music in a new way.
moosic is programmed in node and uses a postgres database, so make sure you have both installed.

## Instructions
You will need a jamendo API key. Get one at [https://devportal.jamendo.com/](URL)\
Modify the file *./controller/globals/JAMENDO_KEY* and substitute the current key with the one you got from jamendo.\
If this is too cumbersome, you can also use my key: e106f235

you'll now have to modify the database credentials to access your postgres database in *./controller/globals/DBCONFIG* Just rename the file called *DBCONFIG.EXAMPLE* inside */config* to *DBCONFIG* and modify your postgres user and password in there.

### populating the database
If this is your first time setting up moosic, you need to populate the database.

Using a terminal, go to the project root and execute
`node populate_db`

Populating the database will take a few minutes since you're fetching over 10 thousand tracks from Jamendo. 


When the database is populated, you can start the app normally with `node server`.
Now use your preferred browser and type `localhost:8888` in the url bar.

Congratulations, now you can start listening to thousands of moosics at your own pace.

## Known bugs
* visible vertical and horizontal scrollbars
* soundwaves take a bit to load and in the meanwhile, a small scrollbar is visible in its place
* If clicking happens to fast, the app crashes
* moosics only show as favoorites in the 'favoorite moosics' playlist, but not during normal play
* sometimes lines will be drawn over a circular node
* when finishing a moosic, the player will just repeat it
* after signing up, there is no confirmation of success, but you can login manually by going to the login tab

### Happy joorney into moosic !
