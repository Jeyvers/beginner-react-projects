import React from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';

function slider({ people, index, setIndex }) {
  return (
    <div className='section-center'>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;

        let position = 'nextSlide';

        if (personIndex === index) {
          position = 'activeSlide';
        }

        if (
          personIndex === index - 1 ||
          (index === 0 && personIndex === people.length - 1)
        ) {
          position = 'lastSlide';
        }

        return (
          <article className={position} key={id}>
            <img src={image} alt={name} className='person-img' />
            <h4>{name}</h4>
            <p className='title'>{title} </p>
            <p className='text'>{quote} </p>
            <FaQuoteRight className='icon' />
          </article>
        );
      })}
      <button className='prev' onClick={() => setIndex(index - 1)}>
        <FiChevronLeft />
      </button>
      <button className='next' onClick={() => setIndex(index + 1)}>
        <FiChevronRight />
      </button>
    </div>
  );
}

export default slider;
// Some explanation of the css' relationship with the js
/* 
Display flex on parent container (section-center) lines them up in one row. 
Position absolute sits them one on top of the other in the center. 
Css transform property moves the items to the left and right. By default all the slides will have the nextSlide classname, the last and active slide will be added to the active review and the review that was recently shown.
Overflow hidden removes the other two from the container, opacity 0 makes all articles invisible, only the activeSlide will have the opacity of 1. 

 */
