import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setIsEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 3000);
    return () => clearTimeout(alertTimeout);
  }, [alert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Display alert
      setAlert({
        show: true,
        msg: 'Please fill in all fields',
        type: 'danger',
      });
    } else if (name && isEditing) {
      // Deal with edit
    } else {
      // Show alert and add item to list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setAlert({
        show: true,
        msg: 'Item added successfully',
        type: 'success',
      });
      setName('');
    }
  };

  const clearFunction = () => {
    setList([]);
    setAlert({
      show: true,
      msg: 'Items deleted successfully',
      type: 'success',
    });
  };

  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    setAlert({
      show: true,
      msg: 'Item deleted successfully',
      type: 'success',
    });
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>Grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} deleteItem={deleteItem} />
          <button className='clear-btn' onClick={clearFunction}>
            {' '}
            Clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
