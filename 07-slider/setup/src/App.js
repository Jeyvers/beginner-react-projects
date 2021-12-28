import React, { useState, useEffect } from 'react';
import data from './data';
import Slider from './slider';
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      // cleanup function
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span> reviews
        </h2>
      </div>
      {/* What way is better when passing in multiple props? */}
      <Slider people={people} index={index} setIndex={setIndex} />
    </section>
  );
}

export default App;
