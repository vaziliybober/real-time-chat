import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import axios from 'axios';
import routes from '../routes.js';
import actions from '../actions/index.js';
import UserNameContext from '../contexts/UserNameContext.js';

const MessageForm = (props) => {
  const userName = useContext(UserNameContext);

  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      const { currentChannelId } = props;
      const message = {
        text: values.message,
        userName,
        channelId: currentChannelId,
      };
      const data = {
        attributes: message,
      };
      try {
        await axios.post(routes.channelMessagesPath(message.channelId), { data });
        setError('');
        formik.resetForm();
      } catch (e) {
        setError(e.message);
      }
    },
  });

  const focusRef = useRef();
  useEffect(() => {
    focusRef.current.focus();
  });

  const inputClassNames = cn('mr-2 form-control', {
    'is-invalid': error !== '',
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <div className="input-group">
          <input
            className={inputClassNames}
            aria-label="message"
            autoComplete="off"
            name="message"
            type="text"
            required
            ref={focusRef}
            onChange={formik.handleChange}
            value={formik.values.message}
            disabled={formik.isSubmitting}
          />
          <button aria-label="submit" type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
          <div className="d-block invalid-feedback">{error || '\u00A0'}</div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
});

const mapDispatchToProps = {
  createMessage: actions.createMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
