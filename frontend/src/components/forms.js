import { useState, forwardRef } from 'react';
import { postNewPost } from '../api/services.js';
import { Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export const PostForm = forwardRef((props, ref) => {

	const {slug, parent, hash} = props;
	const [error, setError] = useState(null);
	return (
		<Formik
			innerRef={ref}
			initialValues={{
				username: "Anonimous",
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
											 onChange={props.handleChange}/>
						<br/>
						<Button variant="outlined" 
										id="upload_button" 
										size="small" 
										component="label">
							Image
							<input type="file" 
										 hidden accept="image/*" 
							       name="file" 
									   onChange={(event) => props.setFieldValue("file", event.currentTarget.files[0])}/>
						</Button>
						<span>{props.values.file.name}</span>
						<br/>
						<TextField name="message" 
											 value={props.values.message} 
											 id="message_field" 
											 variant="outlined" 
											 multiline minRows="5" 
											 fullWidth 
											 label="Message:" 
											 onChange={props.handleChange}/>
						<br/>
						<Button type="submit" 
										id="submit_button" 
										variant="contained">
							Submit
						</Button>
						{error && <span className="error_message">{error.message}</span>}
					</Form>
				</div>
			)}

		</Formik>
	);
});


