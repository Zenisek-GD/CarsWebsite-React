

import { useState } from 'react'
import MessageDisplay from './components/MessageDisplay';
import PrimaryButton from './components/PrimaryButton';
import './App.css'


function App() {
  const [count, setCount] =useState(0);
  return(
    <>
      <h1>Hello Mundo!</h1>
      <MessageDisplay message= {count}/>
      <PrimaryButton  label='Click me' onclick={() => setCount((count) => count + 1)}/>
    </>
  );
};

export default App