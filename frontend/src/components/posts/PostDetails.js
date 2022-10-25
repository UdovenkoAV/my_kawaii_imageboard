import { Created } from './Created.js';

export const PostDetails = (props) => {
	const { title, email, username, created, opost_num, post_num, slug, openLink, onPostNumClick } = props;
	const handlePostNumClick = () => {
		onPostNumClick(post_num);
	}
	return (
		<div className="post_details">
			<span className='title'>{title}</span>
			<span className="username"> {email ? <a href={'mailto:'+email}>{username}</a> : username} </span>
			<Created datetime={created}/> 
			<span className="post_num"><a href={'/'+slug+'/'+opost_num+'#i'+post_num} onClick={handlePostNumClick}>№{post_num}</a> </span>
			{openLink}
		</div>
	);
}
