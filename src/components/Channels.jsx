import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, ButtonGroup, Dropdown, Modal,
} from 'react-bootstrap';

import useChannels from '../hooks/useChannels.js';
import routes from '../routes.js';
import ChannelNameForm from './ChannelNameForm.jsx';
import AddModal from './AddModal.jsx';
import RemoveModal from './RemoveModal.jsx';

const Channels = () => {
  const [
    { channels, currentChannelId },
    { setCurrentChannelId },
  ] = useChannels();

  const getSwitchHandler = (id) => () => {
    setCurrentChannelId(id);
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removeId, setRemoveId] = useState();

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameId, setRenameId] = useState();

  const handleRename = async ({ channelName }) => {
    const params = {
      id: renameId,
    };
    const data = {
      attributes: { name: channelName },
    };
    await axios.patch(routes.channelPath(renameId), { data, params });
    setShowRenameModal(false);
  };

  return (
    <>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Button onClick={() => setShowAddModal(true)} variant="link" className="ml-auto p-0">+</Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name, removable }) => {
          const variant = id === currentChannelId ? 'primary' : 'light';
          if (removable) {
            return (
              <li key={id} className="nav-item">
                <Dropdown>
                  <ButtonGroup className="d-flex mb-2 dropdown">
                    <Button className="nav-link text-left flex-grow-1" variant={variant} onClick={getSwitchHandler(id)}>{name}</Button>
                    <Dropdown.Toggle className="flex-grow-0" variant={variant} />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {
                        setShowRemoveModal(true);
                        setRemoveId(id);
                      }}
                      >
                        Remove
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        setShowRenameModal(true);
                        setRenameId(id);
                      }}
                      >
                        Rename
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </ButtonGroup>
                </Dropdown>
              </li>

            );
          }
          return (
            <li key={id} className="nav-item">
              <Button onClick={getSwitchHandler(id)} variant={variant} className="btn-block nav-link text-left mb-2">{name}</Button>
            </li>
          );
        })}
      </ul>
      <AddModal show={showAddModal} onClose={() => setShowAddModal(false)} />
      <RemoveModal
        show={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        removeId={removeId}
      />

      <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChannelNameForm
            channelNames={channels.map((ch) => ch.name)}
            onSubmit={handleRename}
            onCancel={() => setShowRenameModal(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Channels;
