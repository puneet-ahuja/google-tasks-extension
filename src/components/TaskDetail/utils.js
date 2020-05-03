/**
 * Funtion to update a task in the list of all the tasks.
 * @param {Complete list of the selected List ID.} tasklist 
 * @param {Complete Task to be updated} updateTask 
 * @returns {New list Object with Updated Value}
 */
export const updateTaskList = (tasklist, updateTask) => {
    return tasklist.map(
        (task) => {
            if(task.id === updateTask.id){
                return updateTask;
            }
            if (task.subTasks && task.subTasks.length){
                task.subTasks = updateTaskList(task.subTasks, updateTask)
            }
            return task;
        }
    )
}