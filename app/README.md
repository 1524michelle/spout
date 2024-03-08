# Backend Documentation

To start the development server at port 5000, run `node server.js`

## API

### Landing Page
1. `GET /` - Retrieves the landing page HTML.

### Rules Page
1. `GET /rules` - Retrieves the rules page HTML.

### Look Away Page
1. `GET /lookaway` - Retrieves the look away page HTML.

### Pick Topic Page
1. `GET /picktopic` - Retrieves the pick topic page HTML.

2. `POST /picktopic` - Handles the selection of a topic card.

### Pick Phrase Page
1. `GET /pickphrase` - Retrieves the pick phrase page HTML.

2. `POST /pickphrase` - Handles the selection of a phrase card.

### Timer Page
1. `GET /timer` - Retrieves the timer page HTML.

### Timer Running Page
1. `GET /timerrunning?topic={selected_topic}` - Retrieves the timer running page HTML with the selected topic included.

Example: GET /timerrunning?topic=Michael%20Jackson

### Timer Done Page
1. `GET /timerdone` - Retrieves the timer done page HTML.

2. `GET /playagain` - Resets the game and redirects to the rules page.

## Pages

1. Landing page: logo, "start game" button that redirects to rules page

2. Rules page: rules, contains a "got it" button that redirects to look away page

3. Look away page: flashes a 3 second countdown that automatically redirects to pick topic page

4. Pick topic page: contains 3 cards with topics on them that redirect to pick phrase page

5. Pick phrase page: contains 3 cards with phrases on them that redirect to timer page

6. Timer page: contains a "play" button that redirects to timer running page

7. Timer running page: flashes a 30s countdown that automatically redirects to timer done page

8. Timer done page: contains a "play again" button that redirects to rules page
