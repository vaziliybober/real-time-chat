import React, {
  useRef, useEffect, useContext,
} from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import axios from 'axios';
import {
  Form, FormGroup, InputGroup, FormControl, Button,
} from 'react-bootstrap';

import routes from '../routes.js';
import { actions } from '../slices/index.js';
import UserNameContext from '../contexts/UserNameContext.js';

const MessageForm = (props) => {
  const userName = useContext(UserNameContext);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validateOnChange: false,
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
        formik.resetForm();
      } catch (e) {
        formik.setErrors({
          message: e.message,
        });
      }
    },
  });

  const focusRef = useRef();
  useEffect(() => {
    focusRef.current.focus();
  });

  const cnInput = cn('mr-2', {
    'is-invalid': !!formik.errors.message,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <InputGroup>
          <FormControl
            className={cnInput}
            aria-label="message"
            autoComplete="off"
            name="message"
            required
            ref={focusRef}
            onChange={formik.handleChange}
            value={formik.values.message}
            disabled={formik.isSubmitting}
          />
          <Button aria-label="submit" type="submit" disabled={formik.isSubmitting}>Submit</Button>
          <FormControl.Feedback className="d-block" type="invalid">{formik.errors.message}</FormControl.Feedback>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

const mapStateToProps = (state) => {
  const { channels: { currentId } } = state;
  return {
    currentChannelId: currentId,
  };
};

const mapDispatchToProps = {
  createMessage: actions.createMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
