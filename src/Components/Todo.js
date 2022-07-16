import React from "react";
import './Todo.css';
import { useState,useEffect } from "react";

import todoIcon from './icons8-todo-list-100.png';


const getLocalData =() => {

    const lists = localStorage.getItem("todoList");

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }

}

const Todo = () =>{


    const [newItem,setnewItem]=useState("");
    const [addnewEntry,setaddnewEntry] = useState(getLocalData());

    const inputHandler = (event) => {
      
        setnewItem(event.target.value);

    }

    const addButtonHandler = () => {

        if(!newItem)
        {
            alert("Plz enter a task");
        }
        else{

            let data = {
                id:Math.random().toString(),
                name: newItem
            }
            setaddnewEntry([...addnewEntry,data]);
        } 

        setnewItem("");

    }

    const deletitem = (index) => {
         
        const updatedItems = addnewEntry.filter(clickedItem => clickedItem.id!==index);
        setaddnewEntry(updatedItems);
    }

    // _________________________________________________
    // Storing data in local storage  : 
         
    useEffect(()=>{
         localStorage.setItem("todoList",JSON.stringify(addnewEntry))
    },[addnewEntry]);
    

    
    
    

    return (

        <div className="main-container">
        

            <div className="child-container">

                <figure>
                   <img src={todoIcon} alt="" />
                   <figcaption>To-do list App</figcaption>
                </figure>
                   

                <div className="add-items">
                   <input type="text"  placeholder="✍️ Add new item" value={newItem} onChange={inputHandler}/>
                   <i className="fa fa-plus add-btn" onClick={addButtonHandler}></i>
                </div>

                {/*show items*/ }
                {
                    addnewEntry.map(
                        task => {
                            return(
                             
                               <div className="show-items">
                               
                               <h3>{task.name}</h3>
            
                               <div className="todo-items">

                               <i className="fa fa-trash-o " onClick={() => deletitem(task.id)}></i>

                               </div>
                               
                               </div>
                            );
                        }
                    )
                }

            
                

            </div>
              
        </div>
        
    );

};

export default Todo;