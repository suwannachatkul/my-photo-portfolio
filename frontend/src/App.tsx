import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/UI/Header";


function App() {

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };
  }, []);
  
  return (
    <React.Fragment>
      <Header isAtPageTop={isAtTop} />
    </React.Fragment>
  );
}

export default App;
