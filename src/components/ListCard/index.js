import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import classnames from 'classnames'
import { ItemTypes } from '../../constants/dragAndDrop';
import { tripleDotSVG, dragDropSVG } from '../../constants/svgs'
import './index.css'


const ListCard = ({listDetails, selected, setSelectedList, findCard, moveCard}) =>{
    const { title, id } = listDetails
    const originalIndex = findCard(id).index;
    const [, drag, preview ] = useDrag({
      item: { type: ItemTypes.LIST_CARD, id, originalIndex },
      end: (dropResult, monitor) => {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            /**
             * Mave Card to to original Position.
             */
          moveCard(droppedId, originalIndex);
        }
      }
    });

    const [, drop] = useDrop({
        accept: ItemTypes.LIST_CARD,
        canDrop: () => false,
        hover({ id: draggedId }) {
          if (draggedId !== id) {
            const { index: overIndex } = findCard(id);
            moveCard(draggedId, overIndex);
          }
        }
      });

    

    return (
        <div className='list-element' ref={node => preview(drop(node))}>
            <div className='list-data'>
                <div className={'drag-drop-icon'} ref={drag} >{dragDropSVG}</div>
                <div 
                    className={classnames('tasklists-title',{"selected-title":selected})}
                    onClick={()=>setSelectedList(listDetails)}
                >{title}</div>
            </div>
            <div className='triple-dot-style'>
                {tripleDotSVG}
            </div>
        </div>
    )
}

ListCard.propTypes = {
    listDetails: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    setSelectedList: PropTypes.func,
    findCard: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired
}

ListCard.defaultProps = {
    selected: false
}

export default ListCard