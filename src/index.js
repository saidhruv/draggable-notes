/** @format */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const notes = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non enim quis ex commodo aliquet et malesuada ante. Nulla facilisi. Aenean vehicula massa ex, quis cursus velit pulvinar sit amet. Curabitur eleifend iaculis pulvinar. In hac habitasse platea dictumst. Cras ex nisi, ullamcorper non tortor ac, accumsan eleifend libero. Aliquam ut sodales massa. Fusce scelerisque rhoncus interdum. Fusce lacinia tellus ac neque aliquet gravida. Vestibulum augue quam, hendrerit ut vulputate sit amet, sagittis quis elit. Etiam sed laoreet mi. Etiam convallis eleifend massa sed mollis.',
  },
  {
    id: '2',
    title: 'Fusce tincidunt bibendum nisl',
    content:
      'Fusce tincidunt bibendum nisl, eu facilisis erat molestie vitae. Suspendisse potenti. Curabitur ac tellus at ante finibus dignissim at sed augue. Proin lorem sem, venenatis vitae quam sed, fermentum facilisis diam. Aliquam vel tristique dolor, ut varius tortor. Etiam ut nisl lectus. Cras sollicitudin augue lacinia mauris fermentum, ultrices laoreet nulla porttitor. Nulla tincidunt nibh ex, faucibus condimentum lacus lacinia sed.',
  },
  {
    id: '3',
    title: 'Mauris nec magna mi',
    content:
      'Mauris nec magna mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper eget turpis vel pretium. Donec ultricies vulputate tempor. Vivamus posuere lorem in ipsum tempus venenatis. Cras interdum hendrerit mauris, non imperdiet sem ullamcorper quis. Mauris fermentum urna eu sem lacinia aliquam. Mauris porttitor, nisi nec ornare egestas, nisl ante porta velit, in ornare sem arcu eu nulla.',
  },
  {
    id: '4',
    title: 'Vestibulum ante ipsum primis',
    content:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas rhoncus felis odio, vel dictum sapien sollicitudin id. Sed purus leo, suscipit ac nulla tempor, posuere tempus odio. Sed vel nulla vitae magna vestibulum ullamcorper vel eu erat. Fusce maximus euismod facilisis. Pellentesque id tortor diam. Duis mollis, urna ut aliquam rhoncus, magna ligula commodo risus, sit amet porta sem tellus vitae nunc. Quisque nec vulputate urna. Nunc dapibus odio at metus maximus, vel efficitur urna suscipit. Duis sollicitudin neque felis, nec ornare libero fringilla in.',
  },
  {
    id: '5',
    title: '',
    content:
      'Praesent nisi enim, pellentesque vel consequat quis, accumsan eu dui. Praesent auctor eros vitae risus porttitor fermentum. Nullam eu est eget eros mollis blandit vel at mauris. Integer placerat vitae risus eu aliquet. Donec luctus, metus ut lacinia scelerisque, leo nibh finibus eros, nec sagittis urna odio mattis nulla. Fusce sollicitudin ac ipsum quis aliquam. Nunc luctus sapien ac hendrerit vehicula. Sed eget metus urna. Vestibulum ut rutrum dolor. Aliquam erat volutpat. Quisque condimentum convallis tristique. Proin sed lacus tincidunt, laoreet nulla vel, efficitur purus. Duis elementum id dolor non laoreet. Ut ut est massa.',
  },
];

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightgrey' : 'white',
  padding: 10,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 10 * 2,
  margin: `0 0 10px 0`,
  background: isDragging ? 'lightgrey' : 'white',
  borderRadius: 5,
  boxShadow: '#aaaaaa 5px 5px 15px',
  ...draggableStyle,
});

const ListRenderer = () => {
  const [listState, changeListState] = useState(notes);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      listState,
      result.source.index,
      result.destination.index
    );

    changeListState(items);
  };

  return (
    <div>
      <h1>Dragable Notes</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {listState.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div style={{ fontSize: 'x-large' }}>{item.title}</div>
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

ReactDOM.render(<ListRenderer />, document.getElementById('root'));
