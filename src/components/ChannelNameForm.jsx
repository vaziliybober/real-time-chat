import React, { useRef, useEffect } from 'react';
import {
  Button, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import cn from 'classnames';
import Feedback from 'react-bootstrap/esm/Feedback';

const ChannelNameForm = (props) => {
  const { onSubmit, onCancel } = props;

  const validate = ({ channelName }) => {
    const { channelNames } = props;

    const errors = {};
    if (channelName.length === 0) {
      errors.channelName = 'Required';
    } else if (channelName.length < 3 || channelName.length > 20) {
      errors.channelName = 'Must be 3 to 20 characters';
    } else if (channelNames.includes(channelName)) {
      errors.channelName = 'Must be unique';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validate,
    validateOnChange: true,
    onSubmit: async ({ channelName }) => {
      try {
        await onSubmit({ channelName });
      } catch (e) {
        formik.setErrors({
          channelName: e.message,
        });
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const inputClasses = cn('mb-2', {
    'is-invalid': !!formik.errors.channelName,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl name="channelName" ref={inputRef} onChange={formik.handleChange} className={inputClasses} value={formik.values.channelName} />
        <Feedback className="d-block mb-2" type="invalid">{formik.errors.channelName}</Feedback>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting}>Submit</Button>
        </div>
      </FormGroup>
    </Form>
  );
};

export default ChannelNameForm;
