//component/AddTodo/index.js

import {
    addDatetime,
    addStringNoLocale,
    addUrl,
    createThing,
    getSourceUrl,
    saveSolidDatasetAt,
    setThing,
  } from "@inrupt/solid-client";
  import { useSession } from "@inrupt/solid-ui-react";
  import React, { useState } from "react";
  
  const TEXT_PREDICATE = "http://schema.org/text";
  const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
  const TODO_CLASS = "http://www.w3.org/2002/12/cal/ical#Vtodo";
  const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
  
  function AddTodo({ todoList, setTodoList }) {
    const { session } = useSession();
    const [todoText, setTodoText] = useState("");
  
    const addTodo = async (text) => {
      const indexUrl = getSourceUrl(todoList);
      const todoWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, text);
      const todoWithDate = addDatetime(
        todoWithText,
        CREATED_PREDICATE,
        new Date()
      );
      //add a type (not datatype) to the todo
      const todoWithType = addUrl(todoWithDate, TYPE_PREDICATE, TODO_CLASS);
      //add the todo to the list
      const updatedTodoList = setThing(todoList, todoWithType);
      //save the updated list to the pod
      const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedTodoList, {
        fetch: session.fetch,
      });
      setTodoList(updatedDataset);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      addTodo(todoText);
      setTodoText("");
    };
  
    const handleChange = (e) => {
      e.preventDefault();
      setTodoText(e.target.value);
    };
  
    //TODO - understand
    //return some markup
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
          <label htmlFor="todo-input">
            <input
              id="todo-input"
              type="text"
              value={todoText}
              onChange={handleChange}
            />
          </label>
          <button className="add-button" type="submit">Add Todo</button>
        </form>
    );
  }
  
  export default AddTodo;

//   TODO - why broken?
//   import {
    //     addDatetime,
    //     addStringNoLocale,
    //     addUrl,
    //     createThing,
    //     getSolidDataset,
    //     getSourceUrl,
    //     getThing,
    //     getUrlAll,
    //     saveSolidDatasetAt,
    //     setThing,
    //   } from "@inrupt/solid-client";
    
    // import { useSession } from "@inrupt/solid-ui-react";
    // import React, { useEffect, useState } from "react";
    // import { getOrCreateTodoList } from "../../utils";
    
    // const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";
    // const TEXT_PREDICATE = "http://schema.org/text";
    // const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
    // const TODO_CLASS = "http://www.w3.org/2002/12/cal/ical#Vtodo";
    // const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    
    // function AddTodo() {
    //   const { session } = useSession();
    //   const [todoList, setTodoList] = useState();
    //   const [todoText, setTodoText] = useState("");
    
    //   const addTodo = async (text) => {
    //     const indexUrl = getSourceUrl(todoList);
    
    //     //create todo with some text
    //     const todoWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, text);
    //     //NOTE: when createThing() is called without name or URL inputs, random id is assigned
    
    //     //add data to the todo
    //     const todoWithDate = addDatetime(
    //       todoWithText,
    //       CREATED_PREDICATE,
    //       new Date()
    //     );
    
    //     //give the todo a type (todo type not datatype)
    //     const todoWithType = addUrl(todoWithDate, TYPE_PREDICATE, TODO_CLASS);
    
    //     //add the todo to the list
    //     const updatedTodoList = setThing(todoList, todoWithType);
    
    //     //save the updated list to the pod
    //     const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedTodoList, {
    //       fetch: session.fetch,
    //     });
    //     setTodoList(updatedDataset);
    //   };
    
    //   //TODO
    //   //this is a "handle" that does smth
    //   const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     addTodo(todoText);
    //     setTodoText("");
    //   };
    
    //   //TODO
    //   //this is a "handle" that does smth
    //   const handleChange = (e) => {
    //     e.preventDefault();
    //     setTodoText(e.target.value);
    //   };
    
    //   //TODO - understand
    //   //return some markup
    //   return (
    //     <>
    //       <form onSubmit={handleSubmit} className="todo-form">
    //         <label htmlFor="todo-input">
    //           <input
    //             id="todo-input"
    //             type="text"
    //             value={todoText}
    //             onChange={handleChange}
    //           />
    //         </label>
    //         <button type="submit" className="add-button">
    //           Add Todo
    //         </button>
    //       </form>
    //     </>
    //   );
    // }
    
    // export default AddTodo;