import { setTasklist } from '../actions/tasklist';
import { setTasklists } from '../actions/tasklists';

var CLIENT_ID =
        "388529190966-h6jt68745ge563i9nt4apmrpmk8pedbr.apps.googleusercontent.com";


// TODO : Need to do this in a clean way.
let dispatchAction = undefined;



// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

// What all permissions are required depends on this.
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/tasks.readonly";


     /**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
 const updateSigninStatus = (isSignedIn) => {
    // TODO : need to update Status from Here to Redux Store.
   //setSighnedIn(isSignedIn);
    if (isSignedIn) {
      listTaskLists();
    } else {
      
    }
  }
  
   export  const loadTasksApi = ({dispatch}) =>  {
    dispatchAction = dispatch;
      const script = document.createElement("script");
      
      script.src = "https://apis.google.com/js/api.js";
    
      script.onload = () => {
        window.gapi.load('client:auth2', () => {
          window.gapi.client.init(
            {
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          }
          ).then(function () {
            // Listen for sign-in state changes.
              window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  
              // Handle the initial sign-in state.
              updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
          }, function(error) {
            console.log('There is error Connecting to the Application')
          });
        });
      };
    
      document.body.appendChild(script);
    }
  

        const listTaskLists = () => {
          window.gapi.client.tasks.tasklists.list({
              'maxResults': 10
          }).then(function(response) {
            var taskLists = response.result.items;
            if (dispatchAction ){
              dispatchAction(setTasklists(taskLists));
            }
          });

        }

        

    export const  getTasklist = ({listId}) => {
        window.gapi.client.tasks.tasks.list({
            'maxResults': 10,
            tasklist: listId
        }).then(function(response) {
          var taskList = response.result.items;
          if (dispatchAction ){
            dispatchAction(setTasklist(taskList, listId));
          }
        });
      }

          
  
    /**
         *  Sign in the user upon button click.
         */
        export const handleAuthClick = (event) => {
          if(window.gapi.auth2.getAuthInstance()){
            const userDetails = window.gapi.auth2.getAuthInstance().signIn();
            console.log(userDetails);
          }
        }


        // TODO : Need to check for the cleaner way toget user details.
  
        // function onSignIn(profile) {
          
        //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        //   console.log('Name: ' + profile.getName());
        //   console.log('Image URL: ' + profile.getImageUrl());
        //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        // }
        /**
         *  Sign out the user upon button click.
         */
        export const handleSignoutClick = (event) => {
          window.gapi.auth2.getAuthInstance().signOut();
        }
  