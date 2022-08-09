/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const allMessages = document.querySelector("#all-messages");
const UsernameElem = document.querySelector("#username");
const MessageElem = document.querySelector("#message");
const sendBtn = document.querySelector("#send-btn");
sendBtn.onclick = updateDB;

/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */
function updateDB(event) {
    //prevent default behavior
    event.preventDefault();

    //make a temporary object called data
    let data = {
        USERNAME: UsernameElem.value,
        MESSAGE: MessageElem.value
    };

    //print for good measure
    console.log(data);

    database.push(data);

    MessageElem.value="";
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on("child_added", addMessageToBoard);

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */
function addMessageToBoard(rowData){
    console.log(rowData);

    let data = rowData.val();

    console.log(data);

    //get the singleMessageElem
    let singleMessage = makeSingleMessageHTML(data.USERNAME, data.MESSAGE);

    //append singleMessage to #all-messages
    allMessages.append(singleMessage);
}

/** 
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */
function makeSingleMessageHTML(usernameTxt, messageTxt){
    //create a parent div
    let parentDiv = document.createElement("div");
    
    //add a .single-message class
    parentDiv.setAttribute("class", "single-message");

    //add a p tag called username
    let usernameP = document.createElement("p");

    //add a .single-message-username class to this p
    usernameP.classList.add("single-message-username");

    //update the innerHTML
    usernameP.innerHTML = usernameTxt + ":";

    //append this p tag to the parentDiv
    parentDiv.append(usernameP);

    //create a p tag called messageP
    let messageP = document.createElement("p");

    //update the innerHTML of this p tag to the appropriate data
    messageP.innerHTML = messageTxt;

    parentDiv.append(messageP);

    return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */
const form = document.querySelector("form");
form.onkeyup = (event) => {
    event.preventDefault();

    if (event.keyCode === 13){
        updateDB(event);
    }
}