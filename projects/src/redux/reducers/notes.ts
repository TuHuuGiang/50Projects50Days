import { createSlice } from "@reduxjs/toolkit";

interface INote {
    notes: any;
}

let notesList = JSON.parse(localStorage.getItem('notes') || "[]")

export const notes = createSlice({
    name: "notes",
    initialState: {
        notes: notesList
    },
    reducers: {
        addNote: (state, action) => {
            state.notes = [...state.notes, action.payload];
        },
        saveNote: (state, action) => {
            console.log(state.notes)
            state.notes = [...state.notes, action.payload]
            console.log('state.notes ', state.notes)
            localStorage.setItem("notes", JSON.stringify(state.notes));
        }
    }
});

export const { addNote, saveNote } = notes.actions;
export default notes.reducer;
