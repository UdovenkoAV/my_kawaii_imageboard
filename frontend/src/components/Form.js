import { useState, forwardRef } from 'react';
import { postNewPost } from '../api/services.js';
import { Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Form.css';

const Error = ({children}) => {
	return (
		<span className="error_message">
			{children}
		</span>
	)
}

export const PostForm = forwardRef((props, ref) => {

	const {slug, parent, hash, defaultUsername, maxFileSize} = props;
	const [error, setError] = useState(null);

	const validate = (values) => {
		const errors = {};
		if (!values.username) {
			errors.username = "Username field can not be empty";
		}

		if (parent && !values.file && !values.message) {
			errors.file = errors.message = "File or message is required!";
		}
		if (!parent && !values.file) {
			errors.file = "File is required!";
		}
		if (values.file && values.file.size > maxFileSize) {
			errors.file = "File is too big";
		}
		return errors;

	}

	return (
		<Formik
			validate={validate}
			innerRef={ref}
			initialValues={{
				username: defaultUsername,
				title: "",
				file: "",
				email: "",
				message: hash ? ">>"+hash.match(/(?<=#i)\d+/)+" " : "",
				parent: parent
			}}
			onSubmit = {values => {postNewPost(slug, values).then(response => {
					console.log(response);
					window.location.reload();
				}).catch(error => {
					setError(error);
				  console.log(error)
				});
			}}
		>
			{ (props) => (
				<div className="post_form">
					<Form>
						<TextField name="title" 
											 value={props.values.title} 
										   variant="standard" 
											 id="title_field" 
											 fullWidth 
											 label="Title:" 
											 onChange={props.handleChange}
						/>
						<br/>
						<TextField type="email" 
											 name="email" 
										   value={props.values.email} 
									     variant="standard"  
											 fullWidth 
						           id="email_field" 
											 label="Email:" 
											 onChange={props.handleChange}
						/>
						<br/>
						<TextField name="username" 
											 id="username_field" 
										   value={props.values.username} 
											 fullWidth 
										   variant="standard" 
						           label="Name:"
											 error={!!props.errors.username}
											 onChange={props.handleChange}/>{props.errors.username && <Error>{props.errors.username}</Error>}
						<br/>
						<Button variant="outlined" 
										id="upload_button" 
										size="small"
										component="label">
							File
							<input type="file" 
										 hidden 
										 accept="image/*, video/*" 
							       name="file" 
									   onChange={(event) => props.setFieldValue("file", event.currentTarget.files[0])}/>
						</Button>{props.errors.file && <Error>{props.errors.file}</Error>}
						<span>{props.values.file.name}</span>
						<br/>
						<TextField name="message" 
											 value={props.values.message} 
											 id="message_field" 
											 variant="outlined" 
											 multiline minRows="5" 
											 error={!!props.errors.message}
											 fullWidth 
											 label="Message:" 
											 onChange={props.handleChange}
						/>{props.errors.message && <Error>{props.errors.message}</Error>}
						<br/>
						<Button type="submit" 
										id="submit_button" 
										variant="contained">
							Submit
						</Button>
						{error && <Error>{error.message}</Error>}
					</Form>
				</div>
			)}

		</Formik>
	);
});


