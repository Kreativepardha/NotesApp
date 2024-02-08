import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import axios from 'axios';

const PASSWORD = "mypassword";

const Dashboard = () => {
    
    const [notes, setNotes] = useState([]);
    const token =localStorage.getItem("token")
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [optionsMenuVisibility,setOptionsMenuVisibility] = useState([])

    useEffect(() => {
        getNotes();
     }, [token]);

                
    const getNotes =async()=>{
        try{
                const response = await axios.get("http://localhost:4000/api/notes",{
                headers:{
                    Authorization:token
                }
                })
               setNotes(response.data)
               setOptionsMenuVisibility(new Array(response.data.length).fill(false));
            }catch(error){
                console.error(error)
               }
            }

    const handleSaveBtn = async (title,body)=>{
        try {
            await saveNote(title,body);
            setTitle("")
            setBody("");
            console.log("Note saved succesffuly")
        } catch (error) {
            console.error(error)
        }
    }

    const toggleOptionsMenu = (index)=>{
        setOptionsMenuVisibility(prevVisibility =>{
         const newVisibility =[...prevVisibility];
           newVisibility[index]=!newVisibility[index]
           return newVisibility
        })
    }
  
    const addNote = ()=>{
        const newNote = {
            title:"",
            body:""
        };
        setNotes(prevNotes =>[...prevNotes,newNote])
    }

        const handleNoteChange  = (index,field,value) =>{
            setNotes(prevNotes =>
                prevNotes.map((note,i)=> i === index ? {...note ,[field]:value} : note
                )
                );
        }

    const createNote= async(title,body)=>{

            try {
                const response = await axios.post("http://localhost:4000/api/notes/create",{
                   title,
                   body
                },{
                    headers:{
                        Authorization: token
                    }
                });
            
                   await getNotes();
                   setTitle("");
                   setBody("");
                  
            } catch (error) {
                console.error(error);
            }
    }

   




 
    useEffect(() => {
        const addNoteBtn = document.getElementById("addNoteBtn");
    
        addNoteBtn.addEventListener("click", addNote);
    
        return () => {
            addNoteBtn.removeEventListener("click", addNote);
        };
    }, []);

    const renderNotes = () => {
        return (
            <div>
     

                {notes.map((note,index)=>(
                    <div   key={index} className='note' >
                        <div className="note-header">
                            <input type="text" className='note-title'  value={note.title} onChange={(e)=>handleNoteChange(index,"title",e.target.value)} placeholder='title' />
                            <button className='options-btn'
                            onClick={()=>toggleOptionsMenu(index)}>
                                ...</button>


                                {optionsMenuVisibility[index ] && (  
                                     <div className="options-menu">
                                <button className="option-btn reminder-btn">Set Reminder</button>
                                <button className="option-btn hide-btn">Hide {" "} </button>
                                <button className="option-btn ">Update </button>
                                <button className="option-btn delete-btn">Delete</button>
                                <button className="option-btn save-btn" onClick={()=>handleSaveBtn(note.title, note.body)} >Save</button>
                            </div>
                            )}
                        </div>
                        <textarea name="note-body" defaultValue={note.body} placeholder='take a note' value={note.body} onChange={(e)=>handleNoteChange(index,"body",e.target.value)} id="" cols="30" rows="10"></textarea>
                    </div>
            
                ))}
                
      
              


            </div>
        )
    }
    return (
        <div>
            <h1 id="title">Notes App</h1>
            <div id="notesContainer">
            {renderNotes()}
            </div>

            <button id="addNoteBtn">+</button>
          

            <div className="options-menu">
                <button id="reminderOption" className="option-btn reminder-btn">Set Reminder</button>
                <button id="hideOption" className="option-btn hide-btn">Hide</button>
                <button id="deleteOption" className="option-btn delete-btn">Delete</button>
                <button id="saveOption" className="option-btn save-btn">Save</button>
            </div>
        </div>
    );
}


    
    
    export default Dashboard;
