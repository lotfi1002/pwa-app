import Layout from "../components/Layout/Layout";
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OtherComponent from '../components/OtherComponent'

export const DasBoardPage = () => {
   
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const password = params.get('password');
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    return (
      
      <>
      <Layout>
        <header className="App-header2">
        <h2>Welcome, {username}</h2>
        <p>Your password is: {password}</p>
        <br></br>
        <h3>Pass value between components </h3>
        <form>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a value"
        />
         
      </form>
        <OtherComponent value={inputValue} />
        </header>
        </Layout>
      </>
    );
}
