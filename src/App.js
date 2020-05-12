import React, { useEffect, useState } from 'react';
import './App.css';
import { DataStore } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { PrivateNote } from "./models";

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const fetched = await DataStore.query(PrivateNote);
    setNotes(fetched || []);
  };

  const addNote = async () => {
    const newNote = new PrivateNote({
      content: "Testing",
      owner: "xxx",
    });

    await DataStore.save(newNote);
    await fetchNotes();
  }
  
  useEffect(
    () => {
      const subscription = DataStore.observe(PrivateNote).subscribe(() => {
        fetchNotes();
      });
      return () => subscription.unsubscribe();
    },
    [],
  );

  return (
    <div className="App">
      <h2>Notes</h2>
      {notes.map(({id, content}) => (
        <div key={id}>
          <h3>{id}</h3>
          <p>{content}</p>
        </div>
      ))}
      <h2>Add new</h2>
      <button onClick={() => addNote()}>
        Add new note
      </button>
    </div>
  );
}

export default withAuthenticator(App);
