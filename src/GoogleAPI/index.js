import { setTasklist } from '../actions/tasklist';
import { setTasklists, insertTasklist } from '../actions/tasklists';
import { setUserDetails } from '../actions/userDetails';
import { parseUser, parseTaskList } from './utils'

var CLIENT_ID =
        "388529190966-h6jt68745ge563i9nt4apmrpmk8pedbr.apps.googleusercontent.com";


// TODO : Need to do this in a clean way.
let dispatchAction = undefined;



// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

// What all permissions are required depends on this.
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/tasks";


    /**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
const updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    const user = GoogleAuth.currentUser.get();
    const parsedUser = parseUser(user);
    listTaskLists();

    if(dispatchAction && parsedUser){
      dispatchAction(setUserDetails({ ...parsedUser, isSignedIn}))
    }
  } else {
    dispatchAction && dispatchAction(setUserDetails({isSignedIn}))
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
            const GoogleAuth = window.gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(GoogleAuth.isSignedIn.get());
        }, function(error) {
          console.log('There is error Connecting to the Application');
          // TODO : Need to handle If There is eroor.
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
      'maxResults': 100,
      tasklist: listId
  }).then(function(response) {
    var taskList = response.result.items;
    const parsedTaskList = parseTaskList(taskList);
    if (dispatchAction ){
      dispatchAction(setTasklist(parsedTaskList, listId));
    }
  });
}

export const addTaskList = title => {
    window.gapi.client.tasks.tasklists.insert({
        title
    }).then(function(response) {
      var taskList = response.result;
      if (dispatchAction && taskList ){
        dispatchAction(insertTasklist(taskList));
      }
    }).catch(error => {
      // TODO : Need to handle some Graceful Error Handling.
      console.log('Error While Adding List');
      console.log(error);
    });
  }

  
/**
 * 
 * @param {Id of the task yo reorder} taskId 
 * @param {Id of the list to reorder} listId 
 * @param {Id of the new parent} parent 
 * @param {Id of the new previous} previous 
 */
export const reorderTask = (taskId, listId, parent, previous) => {
    window.gapi.client.tasks.tasks.move({
      task: taskId,
      tasklist: listId,
      parent,
      previous
    }).then(
      (res) => {
        return res
      }
    ).catch(
      err=> console.log('There is error while reordering', err)
    )

}

/**
 * Function to Insert Task to the Given List.
 * 
 * @param {list Id of the List in which we want to insert Task} listId 
 * @param {Title of the task to be Added} title 
 */
export const insertTaskAPI = (listId, title) => {
  return window.gapi.client.tasks.tasks.insert({
    tasklist: listId,
    title
  }).then(
    res => res
  )
  .catch(
    err=> console.log('There is error while Inserting', err)
  )
}

          
export const handleAuthClick = (event) => {
  if(window.gapi.auth2.getAuthInstance()){
    window.gapi.auth2.getAuthInstance().signIn();
  }
}

export const handleSignoutClick = (event) => {
  window.gapi.auth2.getAuthInstance().signOut();
}
  