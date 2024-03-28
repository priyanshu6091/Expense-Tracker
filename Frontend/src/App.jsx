import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import dotenv from 'dotenv';

// process.env.NODE_ENV === 'production' && process.env.file && require('dotenv').config({ path: process.env.file });
// const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log(BASE_URL+"hello");
function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions,setTransactions]=useState([]);
  useEffect(()=>{
    getTransactions().then(setTransactions)
  },[])

async function getTransactions(){
    const url = `http://localhost:3000/api/transactions`;
    const response=await fetch(url);
    return await response.json();
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const url = `http://localhost:3000/api/transaction`;
    console.log(url);
    const price=name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ 
        price,
        name:name.substring(price.length+1), 
        datetime, 
        description 
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Result:', data);
      // Reset form fields after successful submission if needed
      setName('');
      setDatetime('');
      setDescription('');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  let balance=0;
  for(const transaction of transactions){
    balance= balance + transaction.price;
  }
  return (
    <>
      <main>
        <h1>Rs.{balance}</h1>
        <form onSubmit={handleSubmit}>
          <div className="basic">
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Amount"
            />
            <input
              type="datetime-local"
              value={datetime}
              onChange={(ev) => setDatetime(ev.target.value)}
            />
          </div>

          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Description"
            />
          </div>

          <button type="submit">Add Transaction</button>
        </form>
        <div className="transactions">
          {transactions.length > 0 && transactions.map(transaction =>(
          <div className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price "+(transaction.price<0 ? 'red':'green')}>{transaction.price}</div>
              <div className="datetime">{transaction.datetime}</div>
            </div>
          </div>
          ))}
          
        </div>
      </main>
    </>
  );
}

export default App;
