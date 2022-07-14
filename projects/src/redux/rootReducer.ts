import { combineReducers } from '@reduxjs/toolkit';
import { notes } from './reducers/notes';

const rootReducer = combineReducers({
    notesList: notes.reducer
});

export default rootReducer;
