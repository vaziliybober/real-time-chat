import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices/index.js';

export default () => {
  const dispatch = useDispatch();
  const { name, args } = useSelector((state) => state.modals);

  return [name, args, {
    closeModal: () => dispatch(actions.closeModal()),
    showAddChannelsModal: () => dispatch(actions.setModal({ name: 'addChannelModal' })),
    showRemoveChannelsModal: (id) => dispatch(actions.setModal({ name: 'removeChannelModal', args: { removeId: id } })),
    showRenameChannelsModal: (id) => dispatch(actions.setModal({ name: 'renameChannelModal', args: { renameId: id } })),
  }];
};
