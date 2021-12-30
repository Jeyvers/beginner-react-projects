import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalData = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalData);
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
      showAlert(true, 'Please fill in all fields', 'danger');
    } else if (name && isEditing) {
      // Deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setIsEditId(null);
      setIsEditing(false);
      showAlert(true, 'Value changed', 'success');
    } else {
      // Show alert and add item to list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      showAlert(true, 'Item added successfully', 'success');
      setName('');
    }
  };

  const clearFunction = () => {
    setList([]);
    showAlert(true, 'Items deleted successfully', 'danger');
  };

  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, 'Item deleted successfully', 'danger');
  };

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setIsEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
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
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearFunction}>
            {' Clear items '}
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
