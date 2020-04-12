export const parseUser = user => {
    const { Qt : { 
                    SU: id,
                    Ad: fullName,
                    vW: firstName,
                    wU: lastName,
                    UK: imageUrl,
                    zu: email
                } = {} } = user
        return {
            id,
            fullName,
            firstName,
            lastName,
            imageUrl,
            email
        }
}

export const parseTaskList = taskList => {
    const parsedListObject = taskList.reduce( (acc, {parent, ...task}) => {
        if(parent && acc[parent]){
            let subTasks = []
            if(acc[parent].subTasks){
                subTasks = [ ...acc[parent].subTasks, task ]
            }
            acc[parent] = { ...acc[parent], subTasks }
        }
        else if(parent){
            acc[parent] = {subTasks: [task]}
        }
        else {
            const { id } = task;
            const prevObj = acc[id] || {};

            acc[id] = {...task, ...prevObj}
        } 
        return acc;
    }
    ,{})

    const parsedListObjectwithSortedSubTasks = Object.values(parsedListObject).map(task => {
        let sortedSubTasks = undefined;
        if(task.subTasks){
            sortedSubTasks = task.subTasks.sort( ({position:positionA},{position:positionB}) => positionA > positionB)
        }
        return {...task,subTasks: sortedSubTasks}
    })

    return Object.values(parsedListObjectwithSortedSubTasks).sort( ({position:positionA},{position:positionB}) => positionA > positionB)
}