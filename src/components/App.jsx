import React from 'react';

export default (props) => {
  const { channels } = props;

  const channelElements = channels.map((channel) => (
    <li className="list-group-item" key={channel.id}>{channel.name}</li>
  ));

  return <ul className="list-group">{channelElements}</ul>;
}