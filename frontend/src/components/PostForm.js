import React, { useState, forwardRef } from 'react';
import { Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { postNewPost, postFile } from '../api/services.js';
import './PostForm.css';

function FormError({ children }) {
  return (
    <span className="error_message">
      {children}
    </span>
  );
}

export const PostForm = forwardRef(({
  slug, parent, hash, defaultUsername, maxFileSize, handleAfterFormSubmit,
}, ref) => {
  const [formError, setFormError] = useState(null);
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username field can not be empty';
    }
    if (parent && !values.file && !values.message) {
      // eslint-disable-next-line no-multi-assign
      errors.file = errors.message = 'File or message is required!';
    }
    if (!parent && !values.file) {
      errors.file = 'File is required!';
    }
    if (values.file && values.file.size > maxFileSize) {
      errors.file = 'File is too big';
    }
    return errors;
  };
  const sendFormData = (values, fileId) => {
    const formData = { ...values, file: fileId };
    postNewPost(slug, formData).then((response) => {
      handleAfterFormSubmit(response.data);
    }).catch((error) => { setFormError(error); });
  };
  const sendFile = (values) => {
    postFile({ file: values.file }).then((response) => {
      sendFormData(values, response.data.id);
    }).catch((error) => {
      setFormError(error);
    });
  };
  const handleSubmit = (values, { resetForm }) => {
    if (values.file) {
      sendFile(values);
    } else {
      sendFormData(values, null);
    }
    resetForm();
  };

  return (
    <Formik
      validate={validate}
      innerRef={ref?.current.formikRef}
      initialValues={{
        username: defaultUsername,
        title: '',
        file: '',
        email: '',
        message: hash ? `>>${hash.match(/(?<=#i)\d+/)} ` : '',
        parent,
      }}
      onSubmit={handleSubmit}
    >
      { (props) => (
        <div className="post_form">
          <Form>
            <TextField
              name="title"
              value={props.values.title}
              variant="standard"
              id="title_field"
              fullWidth
              label="Title:"
              onChange={props.handleChange}
            />
            <br />
            <TextField
              name="email"
              value={props.values.email}
              variant="standard"
              id="email_field"
              fullWidth
              label="Email:"
              onChange={props.handleChange}
            />
            <br />
            <TextField
              name="username"
              value={props.values.username}
              variant="standard"
              id="username_field"
              fullWidth
              label="Name:"
              error={!!props.errors.username}
              onChange={props.handleChange}
            />
            {props.errors.username && <FormError>{props.errors.username}</FormError>}
            <br />
            <Button
              variant="outlined"
              id="upload_button"
              size="small"
              component="label"
            >
              File
              <input
                type="file"
                hidden
                accept="image/*, video/*"
                name="file"
                onChange={(event) => props.setFieldValue('file', event.currentTarget.files[0])}
              />
            </Button>
            {props.errors.file && <FormError>{props.errors.file}</FormError>}
            <span>{props.values.file.name}</span>
            <br />
            <TextField
              inputRef={ref?.current.messageFieldRef}
              name="message"
              value={props.values.message}
              id="message_field"
              variant="outlined"
              multiline
              minRows="5"
              error={!!props.errors.message}
              fullWidth
              label="Message:"
              onChange={props.handleChange}
            />
            {props.errors.message && <FormError>{props.errors.message}</FormError>}
            <br />
            <Button
              type="submit"
              id="submit_button"
              variant="contained"
            >
              Submit
            </Button>
            {formError && <FormError>{formError.message}</FormError>}
          </Form>
        </div>
      )}
    </Formik>
  );
});
