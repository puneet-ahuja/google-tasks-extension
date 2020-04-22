// TODO : Need to Test this functionality.
/***
 * This is function to find a card from the list of all the cards.
 * This function is not tested.
 * We need to test This,
 */
export const findCardDetails = ( cards, idToSearch ) => {

    let parentId = null;

    for( let index = 0 ; index < cards.length ; index++){
        const card = cards[index];
    
        const {id : cardId, subTasks } = card
        if(cardId === idToSearch){
            return { 
                card,
                parentId,
                hasSubtask : !!(subTasks && subTasks.length)
            }
        }
        if(subTasks && subTasks.length){
            const searchedElement = findCardDetails(subTasks, idToSearch)
            if(searchedElement){
                return {
                    ...searchedElement,
                    parentId: cardId
                }
            }
        }
    }
    return null;
}

// TODO : Need to test this functionality before Merging.
/**
 * 
 * @param {List Of all the cards} cards 
 * @param {id of the card to remove} idToRemove 
 * 
 * @returns Card - If Card is found
 *          Null - If no card is found.
 */
export const removeTask = ( tasks, idToRemove ) => {

    for( let index = 0 ; index < tasks.length ; index++){
        const card = tasks[index];
        const {id : cardId, subTasks } = card

        if(cardId === idToRemove){
            tasks.splice(index,1);
            return {
                tasks,
                removedTask: card
            };
        }
        if(subTasks && subTasks.length){
            const {removedTask, tasks: subTasksAfterremoval} = removeTask(subTasks, idToRemove) || {}

            if(removedTask){
                card.subTasks = subTasksAfterremoval
                return {
                    tasks ,
                    removedTask
                };
            }
        }
    }
    return null;
}


/**
 * Funtion to insert Task at the perfect place.
 * @param {List of cards available in the state} cards 
 * @param {Selected Card to be inserted} cardToInsert 
 * @param {Id or the parent} parentId 
 * @param {Id of the oarent Sibling} parentSibling 
 * 
 * @returns { new Cards State.}
 */
export const insertTask = (cards , cardToInsert, parentId, previous) => {
    let newCards = [ ...cards ];
    let selectedList = [];

    if(parentId){
        const parent = newCards.find( ({ id }) => id===parentId )
        if(previous && parent.subTasks) {
            parent.subTasks.splice(selectedList.findIndex(({id})=> id === previous)+1,0,cardToInsert)
        }
        else if(!previous && parent.subTasks){
            parent.subTasks = [ cardToInsert, ...parent.subTasks ]
        }
        else{
            parent.subTasks = [ cardToInsert ]
        }
    }
    else if(previous) {
        newCards.splice(newCards.findIndex(({id})=> id === previous)+1, 0, cardToInsert);
    }
    else {
        newCards = [cardToInsert, ...newCards]
    }
    return newCards;
}

/**
 * 
 * @param {Details of source Task Card} sourceDetails 
 * @param {Details of TRaget Task} targetDetails 
 * @param {Drop Zone} zone 
 * @returns {An object - That specifies if we can move or not. Also return parent and previoud value.}
 */
export const canMove = ( sourceDetails, targetDetails, zone) => {
    const {
        card:sourceCard, 
        parentId: sourceParentId, 
        hasSubtask: sourceHasSubtask
    } = sourceDetails

    const {
        card:targetCard, 
        parentId: targetParentId, 
        hasSubtask: targetHasSubtask
    } = targetDetails

    // Case of Parent with Subtask
    if(sourceHasSubtask){
        // For Own Child. 
        if(targetParentId === sourceCard.id){
            return {status: false};
        }
        // Target is parent
        if( !targetParentId) {
            return {
                status:true,
                parentId: null,
                parentSibling: targetCard.id
            };
        }
        // Target is child
        if( targetParentId ) {
            return {
                status:true,
                parentId: null,
                parentSibling: targetParentId
            };
        }
    }
    // Case if Source is a parent without child.
    if(!sourceParentId && !sourceHasSubtask){

        // TODO : Will verify this behaviour in the next phase.
        // Target is parent with child
        // if(!targetParentId && targetHasSubtask){
        //     return {
        //         status:true,
        //         parentId: targetCard.id,
        //         parentSibling: null
        //     };
        // }


        // Target is parent
        if(!targetParentId){
            return {
                status:true,
                parentId: null,
                parentSibling: targetCard.id
            };
        }

        // Target is child(NOt Last with Zone 1) 
        if(targetParentId){
            return {
                status:true,
                parentId: targetParentId,
                parentSibling: targetCard.id
            };
        }

        // TODO : Need to add condition  (Drop on child in zone 1)
    }
    return {status: false};
}