// TODO : Need to add Keys from Here.




// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/tasks.readonly";


     /**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
 const updateSigninStatus = (isSignedIn) => {
    console.log('Sighned in Status Change',isSignedIn)
    // TODO : need to update Status from Here to Redux Store.
   //setSighnedIn(isSignedIn);
    if (isSignedIn) {
      listTaskLists();
    } else {
      
    }
  }
  
   export  const loadTasksApi = () =>  {
      const script = document.createElement("script");
      
      script.src = "https://apis.google.com/js/api.js";
    
      script.onload = () => {
        window.gapi.load('client:auth2', () => {
          window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          }).then(function () {
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
  
   /**
         * Print task lists.
         */
        const listTaskLists = () => {
          window.gapi.client.tasks.tasklists.list({
              'maxResults': 10
          }).then(function(response) {
              // TODO : Need to Add Data to Redux Store After Retrieval.
            var taskLists = response.result.items;
            if (taskLists && taskLists.length > 0) {
              for (var i = 0; i < taskLists.length; i++) {
                var taskList = taskLists[i];
                console.log(taskList.title + ' (' + taskList.id + ')');
              }
            } else {
              console.log('No task lists found.');
            }
          });
        }
  
    /**
         *  Sign in the user upon button click.
         */
        export const handleAuthClick = (event) => {
          window.gapi.auth2.getAuthInstance().signIn();
        }
  
        /**
         *  Sign out the user upon button click.
         */
        export const handleSignoutClick = (event) => {
          window.gapi.auth2.getAuthInstance().signOut();
        }
  