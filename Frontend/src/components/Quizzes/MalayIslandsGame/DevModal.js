import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const CustomModal = ({ handleClose, visible, id }) => {
  const [nameInput, setNameInput] = useState('');

  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleModalSubmit = () => {
    const newData = {
      name: nameInput,
      id: id
    };
    console.log(newData);

    // API call to update JSON file
    fetch('http://localhost:5002/api/games/update-names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    handleClose();
  };

  return (
    <div>
      <Modal
        isOpen={visible}
        contentLabel="Name Input Modal"
        appElement={document.getElementById('app')}
      >
        <h2>Enter Name</h2>
        <input type="text" value={nameInput} onChange={handleInputChange} />
        <button onClick={handleModalSubmit}>Submit</button>
      </Modal>
    </div>
  );
};

CustomModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default CustomModal;
