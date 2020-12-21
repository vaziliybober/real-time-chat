import React from 'react';

import AddModal from './AddModal.jsx';
import RemoveModal from './RemoveModal.jsx';
import RenameModal from './RenameModal.jsx';
import useModals from '../hooks/useModals.js';

const ModalsManager = () => {
  const [name, args, { closeModal }] = useModals();

  return (
    <>
      <AddModal show={name === 'addChannelModal'} onClose={closeModal} args={args} />
      <RemoveModal show={name === 'removeChannelModal'} onClose={closeModal} args={args} />
      <RenameModal show={name === 'renameChannelModal'} onClose={closeModal} args={args} />
    </>
  );
};

export default ModalsManager;
