import React, { useState, useEffect } from "react";
import "./index.css";
import cookieImg from "./cookie.png";

function App() {
  const [cookies, setCookies] = useState(
    localStorage.getItem("cookies")
      ? parseInt(localStorage.getItem("cookies"))
      : 0
  );
  const [cookiesPerSecond, setCookiesPerSecond] = useState(
    localStorage.getItem("cookiesPerSecond")
      ? parseInt(localStorage.getItem("cookiesPerSecond"))
      : 0
  );
  const [storeItems, setStoreItems] = useState([
    { name: "Grandma", cost: 10, increment: 1 },
    { name: "Bakery", cost: 20, increment: 5 },
    { name: "Cookie Robot", cost: 30, increment: 10 },
  ]);

  const handleClick = () => {
    setCookies(cookies + 1);
    document.getElementById("cookie").classList.add("clicked");
    setTimeout(() => {
      document.getElementById("cookie").classList.remove("clicked");
    }, 300);
  };

  const handlePurchase = (item) => {
    if (cookies >= item.cost) {
      setCookies(cookies - item.cost);
      setCookiesPerSecond(cookiesPerSecond + item.increment);
    } else {
      alert("You don't enough cookies to purchase this item!");
    }
  };

  const handleReset = () => {
    setCookies(0);
    setCookiesPerSecond(0);
    localStorage.removeItem("cookies");
    localStorage.removeItem("cookiesPerSecond");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((cookies) => cookies + cookiesPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [cookiesPerSecond]);

  useEffect(() => {
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
  }, [cookies, cookiesPerSecond]);

  return (
    <div className="container">
      <header className="header">
        <h1>Cookie Clicker</h1>
        <img
          id="cookie"
          className="cookie"
          src={cookieImg}
          alt="Cookie"
          onClick={handleClick}
        />
        <p>You have {cookies} cookies</p>
        <p>You are earning {cookiesPerSecond} cookies per second</p>
        <div className="store">
          <h2>Cookie Upgrade Store</h2>
          {storeItems.map((item, index) => (
            <button key={index} onClick={() => handlePurchase(item)}>
              {item.name} - Cost: {item.cost}, Upgrade: {item.increment}
            </button>
          ))}
        </div>
        <button className="reset-button" onClick={handleReset}>
          Reset Progress
        </button>
      </header>
    </div>
  );
}

export default App;
