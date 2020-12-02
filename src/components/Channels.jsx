import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

const Channels = (props) => {
  const { channels, currentChannelId } = props;
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => {
          const btnClass = id === currentChannelId ? 'btn-primary' : 'btn-light';
          const buttonClasses = cn('nav-link btn-block mb-2 text-left btn', btnClass);
          return (
            <li key={id} className="nav-item">
              <button type="button" className={buttonClasses}>{name}</button>
            </li>
          );
        })}
      </ul>
    </div>
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

};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
