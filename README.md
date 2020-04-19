# moosic 0.5
Final project of Web Developing
by Albert Balbastre (design and backend), Jordi Capellades (frontend) and Jhonny Meneses (database)

moosic is a platform where users are in power to discover and categorize music.
moosic uses Jamendo's API in order to provide music in a new way.

## Requirements
1. node
2. postgres

## Instructions
You will need a jamendo API key. Get one [here](https://devportal.jamendo.com/).\
Put your jamendo key in *./config/JAMENDO_KEY.EXAMPLE* and rename the file to *JAMENDO_KEY*.\
If this is too cumbersome, you can also use my key: e106f235

you'll now have to modify the database credentials to access your postgres database in *./config/DBCONFIG* Just rename the file called *DBCONFIG.EXAMPLE* inside */config* to *DBCONFIG* and modify your postgres user and password in there.

### populating the database
If this is your first time setting up moosic, you need create and populate the database.

Using a terminal, go to the project root and execute
`node populate_db`

Populating the database will take a few minutes since you're fetching over 10,000 tracks from Jamendo with all their metadata. 


When the database is populated, you can start the app normally executing `node server` in the terminal.
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
* clicking are is square when the visual nodes are circles

### Happy joorney into moosic !
