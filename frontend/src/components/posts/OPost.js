import {PostDetails} from './PostDetails.js';
import {FormatMessage} from './FormatMessage.js';
import {Image} from './Image.js';
import './posts.css';

export const OPost = (props) => {

	const { post, slug, skip, openLink, onPostNumClick } = props;
	return (
		<div id={"post_"+post.post_number} className="opost">
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
				<FormatMessage message={post.message} skip={skip} slug={slug}/>
			</div>
		</div>
	);
};