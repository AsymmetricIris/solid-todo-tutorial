//component/AddTodo/index.js

import {
    addDatetime,
    addStringNoLocale,
    addUrl,
    createThing,
    getSolidDataset,
    getSourceUrl,
    getThing,
    getUrlAll,
    saveSolidDatasetAt,
    setThing,
  } from "@inrupt/solid-client";

import { useSession } from "@inrupt/solid-ui-react";
import React, { useEffect, useState } from "react";
import { getOrCreateTodoList } from "../../utils";

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";
const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const TODO_CLASS = "http://www.w3.org/2002/12/cal/ical#Vtodo";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";

function AddTodo() {
  const { session } = useSession();
  const [todoList, setTodoList] = useState();
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    if (!session) return;
    (async () => {
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}todos/`;
      const list = await getOrCreateTodoList(containerUri, session.fetch);
      setTodoList(list);
    })();
  }, [session]);

  const addTodo = async (text) => {
    const indexUrl = getSourceUrl(todoList);

    //create todo with some text
    const todoWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, text);

    //add data to the todo
    const todoWithDate = addDatetime(
      todoWithText,
      CREATED_PREDICATE,
      new Date()
    );

    //give the todo a type (todo type not datatype)
    const todoWithType = addUrl(todoWithDate, TYPE_PREDICATE, TODO_CLASS);

    //add the todo to the list
    const updatedTodoList = setThing(todoList, todoWithType);

    //save the updated list to the pod
    const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedTodoList, {
      fetch: session.fetch,
    });
    setTodoList(updatedDataset);
  };

  //TODO
  //this is a "handle" that does smth
  const handleSubmit = async (event) => {
    event.preventDefault();
    addTodo(todoText);
  };

  //TODO
  //this is a "handle" that does smth
  const handleChange = (e) => {
    e.preventDefault();
    setTodoText(e.target.value);
  };

  //TODO - understand
  //return some markup
  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <label htmlFor="todo-input">
          <input
            id="todo-input"
            type="text"
            value={todoText}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>
    </>
  );
}

// function AddTodo() { 
//     const { session } = useSession();
//     const addTodo = async (text) => 
//     {
//         //create todo and give it some text
//         const indexUrl = getSourceUrl(todoList);
//         const todoWithText = addStringNoLocale
//         (
//             createThing(),
//             "http://schema.org/text",
//             text
//         );

//         //add a creation date to the todo
//         const todoWithDate = addDatetime
//         (
//             todoWithText,
//             "http://www.w3.org/2002/12/cal/ical#created",
//             new Date()
//         );

//         //add a type to the todo
//         const todoWithType = addUrl(todoWithDate, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", "http://www.w3.org/2002/12/cal/ical#Vtodo");
        
//         //add the todo to an updated clone todoList
//         const updatedTodoList = setThing(todoList, todoWithType);

//         //overwrite the previous todo list in the pod with the updated one
//         const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedTodoList, {
//             fetch: session.fetch,
//         });
//         setTodoList(updatedDataset);
//     };
// }

// function AddTodo() {
//     const { session } = useSession();
//     const [ todoList, setTodoList ] = useState();

//     useEffect(() => {
//         if (!session) return;
//         (async () => {
//             const profileDataset = await getSolidDataset( session.info.webId, {
//                 fetch: session.fetch,
//             });
//             const profileThing = getThing(profileDataset, session.info.webId);
//             const podsUrls = getUrlAll(
//                 profileThing,
//                 "http://www.w3.org/ns/pim/space#storage"
//             );
//             const pod = podsUrls[0];
//             const containerUri = `${pod}todos/`;
//             const list = await getOrCreateTodoList(containerUri, session.fetch);
//             setTodoList(list);
//         })();
//     }, [session]);

//     return <button classname="add-button">Add Todo</button>; 
// }

export default AddTodo;