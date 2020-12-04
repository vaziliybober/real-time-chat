import React from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import cn from 'classnames';
import Feedback from 'react-bootstrap/esm/Feedback';
import routes from '../routes.js';

const NewChannelModal = (props) => {
  const { show, handleClose } = props;

  const validate = ({ channelName }) => {
    const { channels } = props;
    const channelNames = channels.map((ch) => ch.name);

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
      const data = {
        attributes: { name: channelName },
      };
      try {
        await axios.post(routes.channelsPath(), { data });
        formik.resetForm();
        handleClose();
      } catch (e) {
        formik.setErrors({
          channelName: e.message,
        });
      }
    },
  });

  const inputClasses = cn('mb-2', {
    'is-invalid': !!formik.errors.channelName,
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl name="channelName" onChange={formik.handleChange} className={inputClasses} value={formik.values.channelName} />
            <Feedback className="d-block mb-2" type="invalid">{formik.errors.channelName}</Feedback>
            <div className="d-flex justify-content-end">
              <Button className="mr-2" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { channels: { allIds, byId } } = state;
  return {
    channels: allIds.map((id) => byId[id]),
  };
};

export default connect(mapStateToProps)(NewChannelModal);
