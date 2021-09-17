


//Create a gameboardState module
    //create an 2d array gameboardMap for the gameboard
        //create three arrays for each row of the game board
    
    //create a setTargetMark function with an x, y cordinate and a playermark
        //assign the playermark to the array

    //create a getTargetMark with an x, y
        //return a string at location x,y

    //return an object that has the edit function within

//create a player function factory with playermark and name
    //create a array varible playerMark
    //create a function that gets playermark

    //return a object that conatins the getters and setters

//create a module for controlling the display

    //create a function createGameboard taking gameMaps 2d grid
        //create a varible gameContainer as a new DOM div
        //create a varible boardContainer as a new dom div
        //create a varible controlContainer as a new dom div
        //create a varible headerContainer as a new dom div
        //append the last three varibles to gameContainer

        //create a varible gameTitle as a new DOM div
        // assign "Tic tac toe" to textArea
        // create a varible currentPlayer as a new DOM divs
        // assign player.getName to textArea
        //append both gameTitle and currentPlayer to headerContainer

        //create a varible PlayerContainer as a new div
        //create and append two playerName divs
        //create a varible playButton as a new button
        //create a eventlistor on playButton 
            // call startgame function on game Module

        //loop over Map array both x and y
            //create a varible to create a element div
            //assign varibles classlist to gridItem
            //set id to array values
            //append item to gameboardContainer DIV
            //add eventlisnor 
                // call playerMove function with x, y as location
        //return true;

    //create a varible that takes a nodelist of divs items for the grid
    //create a function updateGameDisplay, updating visuals taking player.mark
        //create two loops going over the 2d arrays
            //create a varible for DOM query (ID 11, 12, 12, 21, 22, 23, etc)
            //change varible.inntertext to player mark


//create a game module for controling gamestates
    //create currentPlayer value
    //create playerOne with player factor function
    //Do this again with playerTwo

    //check if a map is made
        //if a map isn't made call display.createGameboard

    //create a startgame function
        //set playerOne name based on value of playerOne input
        //Same but with player two
        //create two players with names
        //assign currentPlayer to playerOne

        

    //create a varible that determens if the game is started
    //create a playerMove function the uses selection and player.mark
        //check if mark as been made at this location alreay
            //call a setter for gameboard module to update the map
            //call a display function to update the DOM
            //check if game is won or tied


            