import { useState, useEffect, useRef } from 'react';
import { getThread } from '../api/services.js';
import { useParams, useLocation } from 'react-router-dom';
import { PostForm } from './forms.js';
import { Thread } from './thread.js'

export function ThreadDetail(props){

	const [thread, setThread] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);
	const location = useLocation();
	const { slug, id } = useParams();
	const formRef = useRef();

	const handlePostNumClick = (post_num) => {
		formRef.current.setFieldValue('message', formRef.current.values.message+'>>'+post_num+" ");
	}

	useEffect(() => {
		getThread(slug, id).then((result) => {
			setThread(result.data);
			setIsLoaded(true);
		}).catch((error) => {
			setError(error);
			console.log(error);
		  setIsLoaded(true);
		});
	}, [slug, id]);


	if (!isLoaded){
		return (
			<h2>Loading..</h2>
		)
	} else if (error) {
		return (
			<div className="error">
				<h2>{error.message}</h2>
			</div>
		)
	} else {
		return (
			<div className="thread_details">
				<PostForm ref={formRef} slug={slug} parent={thread.opost.id} hash={/#i\d+/.test(location.hash) && location.hash}/>
				<div className="back_button"><h2><a href={'/'+slug}>[Back]</a></h2></div>
				<Thread thread={thread} hash={/#\d+/.test(location.hash) && location.hash} slug={slug} onPostNumClick={(post_num) => handlePostNumClick(post_num)}/>
			</div>
		)
	}

}
