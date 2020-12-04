import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Button, ButtonGroup, Dropdown, Modal,
} from 'react-bootstrap';
import actions from '../actions/index.js';
import routes from '../routes.js';
import NewChannelModal from './NewChannelModal.jsx';

const Channels = (props) => {
  const { channels, currentChannelId, setCurrentChannelId } = props;

  const getSwitchHandler = (id) => () => {
    setCurrentChannelId({ id });
  };

  const [showNewChannelModal, setShowNewChannelModal] = useState(false);
  const [showRemoveChannelModal, setShowRemoveChannelModal] = useState(false);
  const [removeId, setRemoveId] = useState();

  const handleRemove = async () => {
    const params = {
      id: removeId,
    };
    try {
      await axios.delete(routes.channelPath(removeId), { params });
      setShowRemoveChannelModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Button onClick={() => setShowNewChannelModal(true)} variant="link" className="ml-auto p-0">+</Button>
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
                        setShowRemoveChannelModal(true);
                        setRemoveId(id);
                      }}
                      >
                        Remove
                      </Dropdown.Item>
                      <Dropdown.Item>Rename</Dropdown.Item>
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
      <NewChannelModal
        show={showNewChannelModal}
        handleClose={() => setShowNewChannelModal(false)}
      />
      <Modal show={showRemoveChannelModal} onHide={() => setShowRemoveChannelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure?
          <div className="d-flex justify-content-between">
            <Button className="mr-2" variant="secondary" onClick={() => setShowRemoveChannelModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleRemove}>
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  const { currentChannelId, channels: { allIds, byId } } = state;
  return {
    currentChannelId,
    channels: allIds.map((id) => byId[id]),
  };
};

const mapDispatchToProps = {
  setCurrentChannelId: actions.setCurrentChannelId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
