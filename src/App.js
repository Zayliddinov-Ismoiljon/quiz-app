import React from 'react';
import { useState } from 'react';
import './App.css';
import Home from './Component/Home';
import TestContainer from './Component/test_container';

function App() {

  const [categoryId, setCategoryId] = useState(null)
  const [isStart, setIsStart] = useState(false);

  return (
    <>
      <div className="container p-5">
      { !isStart ? <Home setCategoryId={setCategoryId} categoryId={categoryId} setIsStart={setIsStart} />
       :  <TestContainer categoryId={categoryId} setIsStart={setIsStart} />
       } 
      </div>
    </>
  );
}

export default App;
