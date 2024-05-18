// CaissePage.js
import React, { useState } from "react";
import "../css/CaissePage.css";

export const CaissePage = () => {
  const [inputValue, setInputValue] = useState(""); // etat local de la valeur 
  // une fois le boutton est clique la valeur changera 
  const handleButtonClick = (value) => {
    setInputValue(inputValue + value);
  };

  return (
    <>
  
      <div className="title">Fond de la caisse</div>
      <input
        type="text"
        placeholder="Entrez le fond de caisse"
      />
      <table id="calcu" className="caisse-table">
        <tbody>
        <tr> Ouvrir la caisse </tr>

          <tr>
            <td colSpan="4">
              <input type="text" id="result" value={inputValue} /> {}
            </td>
          </tr>
          <tr>
            <td><input type="button" value="C" onClick={() => setInputValue("")} /></td> {}
            <td><input type="button" value="1" onClick={() => handleButtonClick("1")} /></td>
            <td><input type="button" value="2" onClick={() => handleButtonClick("2")} /></td>
            <td><input type="button" value="3" onClick={() => handleButtonClick("3")} /></td>
          </tr>
          <tr>
            <td><input type="button" value="." onClick={() => handleButtonClick(".")} /></td>
            <td><input type="button" value="4" onClick={() => handleButtonClick("4")} /></td>
            <td><input type="button" value="5" onClick={() => handleButtonClick("5")} /></td>
            <td><input type="button" value="6" onClick={() => handleButtonClick("6")} /></td>
          </tr>
          <tr>
            <td><input type="button" value="0" onClick={() => handleButtonClick("0")} /></td>
            <td><input type="button" value="7" onClick={() => handleButtonClick("7")} /></td>
            <td><input type="button" value="8" onClick={() => handleButtonClick("8")} /></td>
            <td><input type="button" value="9" onClick={() => handleButtonClick("9")} /></td>
          </tr>
        </tbody>
      </table>
      
    </>
  );
};

export default CaissePage;
