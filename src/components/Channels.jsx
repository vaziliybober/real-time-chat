import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import actions from '../actions/index.js';
import NewChannelModal from './NewChannelModal.jsx';

const Channels = (props) => {
  const { channels, currentChannelId, setCurrentChannelId } = props;

  const getSwitchHandler = (id) => () => {
    setCurrentChannelId({ id });
  };

  const [showNewChannelModal, setShowNewChannelModal] = useState(false);

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
                <ButtonGroup className="d-flex mb-2 dropdown">
                  <Button className="nav-link text-left flex-grow-1" variant={variant} onClick={getSwitchHandler(id)}>{name}</Button>
                  <Dropdown.Toggle className="flex-grow-0" variant={variant} />
                </ButtonGroup>
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
