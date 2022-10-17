import { Image } from './image.js';
import { useState } from 'react';

const Message = (props) => {

	const {message, doSkip}	= props;
	const [skip, setSkip] = useState(doSkip);
	return (		
		<article>
			{skip && message.length > 500 ? message.slice(0, 500)+"..." : message}
			{skip && message.length > 500 && <p>Post is too long. Click <span className="fake_a" onClick={() => setSkip(false)}>here</span> to view full.</p> }
		</article>
	);
}
const Created = (props) => {
	const { datetime } = props;
	const date = datetime.match(/.*(?=T)/)[0]
	const time = datetime.match(/(?<=T).*(?=\.)/)[0]

	return (
			<span className="created_time">{date} {time} </span>
	)
}


const PostDetails = (props) => {
	const { title, email, username, created, opost_num, post_num, slug, openLink, onPostNumClick } = props;
	const handlePostNumClick = () => {
		onPostNumClick(post_num)
	}
	return (
		<div className="post_details">
			<span className='title'>{title}</span>
			<span className="username"> {email ? <a href={'mailto:'+email}>{username}</a> : username} </span>
			<Created datetime={created}/> 
			<span className="post_num"><a href={'/'+slug+'/'+opost_num+'#'+post_num} onClick={handlePostNumClick}>№{post_num}</a> </span>
			{openLink}
		</div>
	)
}

export const Reply = (props) => {

	const { post, slug, doSkip, opost_num, onPostNumClick } = props;
	return (
		<div className="reply">
			<div className="doubledash">>></div>
			<div className="post" >
				<PostDetails title={post.title} 
										 email={post.email}
										 username={post.username}
										 created={post.created}
										 opost_num={opost_num}
										 post_num={post.post_number}
										 slug={slug}
										 onPostNumClick={(post_num) => onPostNumClick(post_num)}
				/>
				<div className="post_body">
					{post.thumbnail && <Image thumb={post.thumbnail} img={post.file}/>}
					<Message message={post.message} doSkip={doSkip}/>
				</div>
			</div>
		</div>
	);
};

export const OPost = (props) => {

	const { post, slug, openLink, doSkip, onPostNumClick } = props;
	return (
		<div className="opost">
			<PostDetails title={post.title} 
									 email={post.email}
									 username={post.username}
									 created={post.created}
									 opost_num={post.post_number}
									 post_num={post.post_number}
									 slug={slug}
									 openLink={openLink}
									 onPostNumClick={(post_num) => onPostNumClick(post_num)}
			/>
			<div className="post_body">
				{post.thumbnail && <Image thumb={post.thumbnail} img={post.file}/>}
				<Message message={post.message} doSkip={doSkip}/>
			</div>
		</div>
	);
};
