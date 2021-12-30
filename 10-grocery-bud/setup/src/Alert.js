import React, { useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Alert = ({ type, msg }) => {
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
