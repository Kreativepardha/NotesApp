import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        loadNotes();
    }, []);
const getUserIdFromToken = () => {
        const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
        if (token) {
            try {
                const decoded = jwt_decode(token); // Decode the token
                return decoded.userId; // Return the user ID from the decoded token
            } catch (error) {
                console.error("Error decoding token:", error);
                return null;
            }
        } else {
            return null;
        }
    };
    const addNote = () => {
        const newNote = {
            title: "",
            body: ""
        };
        setNotes(prevNotes => [...prevNotes, newNote]);
    }   

 const saveNote = async (title, body) => {
        const userId = getUserIdFromToken(); // Extract userId from token
        try {
            const response = await axios.post("https://notesapp-gts2.onrender.com/api/notes/create", {
                userId,
                title,
                body
            });
            console.log("Note saved successfully");
            return response.data;
        } catch (error) {
            console.error("Error saving note:", error);
            throw error;
        }
    }

    const loadNotes = async () => {
        try {
            const response = await axios.get("https://notesapp-gts2.onrender.com/api/notes");
            console.log("Response data:", response.data);
            if (Array.isArray(response.data.data)) {
                setNotes(response.data.data); // Set notes retrieved from the backend
            } else {
                console.error("Invalid data format:", response.data);
            }
        } catch (error) {
            console.error("Error loading notes:", error);
        }
    }
    
    
    

    const handleNoteChange = (index, field, value) => {
        setNotes(prevNotes =>
            prevNotes.map((note, i) => i === index ? { ...note, [field]: value } : note)
        );
    }

    const handleSaveBtn = async (index) => {
        const { title, body } = notes[index]; // Destructure title and body from the note
        try {
            const savedNote = await saveNote(title, body); // Pass title and body separately
            setNotes(prevNotes => {
                const updatedNotes = [...prevNotes];
                updatedNotes.splice(index, 1, savedNote); // Replace the unsaved note with the saved one
                return updatedNotes;
            });
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error("You don't have permission to create a note.");
                // Display an error message to the user
            } else {
                console.error("Error saving note:", error);
            }
        }
    }
    
    

    return (
        <div>
            <h1 id="title">Notes App</h1>
            <div id="notesContainer">
                {notes.map((note, index) => (
                    <div key={index} className='note'>
                        <div className="note-header">
                            <input
                                type="text"
                                className='note-title'
                                value={note.title}
                                onChange={(e) => handleNoteChange(index, "title", e.target.value)}
                                placeholder='title'
                            />
                            <button className='options-btn' onClick={() => handleSaveBtn(index)}>Save</button>
                        </div>
                        <textarea
                            name="note-body"
                            value={note.body}
                            onChange={(e) => handleNoteChange(index, "body", e.target.value)}
                            placeholder='take a note'
                            id=""
                            cols="25"
                            rows="8"
                        ></textarea>
                    </div>
                ))}
            </div>

            <button id="addNoteBtn" onClick={addNote}>+</button>
        </div>
    );
}

export default Notes;
