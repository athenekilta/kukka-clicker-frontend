import React, { useEffect } from "react";

let __i = 0;

const Timer = ({ time, ended, className= "" }) => {
  const id = `timer_${++__i}`;

  useEffect(() => {
    if (!time) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = time.getTime() - now;
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        if (typeof ended === "function") {
          ended();
        }
        clearInterval(interval);
      }
      const div = document.getElementById(id);
      if (div) {
        div.innerHTML = `${days}pv ${hours}h ${minutes}min ${seconds}sek`;
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]); 

  return(
    <span id={id} className={`${className}`}></span>
  );
};

export default Timer;