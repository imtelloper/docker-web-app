import React, {ChangeEventHandler, FormEventHandler, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [lists, setLists] = useState<Array<{id:number, value: string}>>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get('/api/values')
      .then(res => {
        setLists(res.data)
      })
  }, [])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setValue(target.value)
  }

  const submitHandler = (e: any) => {
    e.preventDefault()
    axios.post(`/api/value`, {value: value}).then(res => {
      if (res.data.success) {
        const listArray = [...lists, {id:0, value:res.data.value}]
        setLists(listArray)
        setValue("")
      } else {
        alert('값을 DB에 넣는데 실패했습니다.')
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {lists && lists?.map((res: any, key: number) => {
            return (
              <li id={res.id} key={key}>{res.value}</li>
            )
          })}
          <form className="example" onSubmit={submitHandler}>
            <input type="text" placeholder="please input text .." onChange={changeHandler} value={value}/>
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
