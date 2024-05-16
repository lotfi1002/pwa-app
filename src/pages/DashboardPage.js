import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OtherComponent from '../components/OtherComponent'
import { useAuth } from '../hooks/AuthProvider';
import Layout from '../components/Layout/Layout';


export const DashboardPage = () => {

    const auth = useAuth();
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
         <button onClick={() => auth.logOut()} className="btn-submit"> Deconnect</button>
      </form>
        <OtherComponent value={inputValue} />
        </header>
        </Layout>
      </>
    );
}
