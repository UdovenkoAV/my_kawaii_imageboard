import {PostDetails} from './PostDetails.js';
import {FormatMessage} from './FormatMessage.js';
import {Image} from './Image.js';
import './posts.css';

export const Reply = (props) => {

	const { post, slug, skip, opost_num, isHighlighted, onPostNumClick, onPostLinkClick } = props;
	
	return (
		<div id={"post_"+post.post_number} className="reply">
			<div className="doubledash">>></div>
			<div className={`post ${isHighlighted && "highlighted"}`} >
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
					<FormatMessage message={post.message} slug={slug} skip={skip} onPostLinkClick={(replyNum) => onPostLinkClick(replyNum) }/>
				</div>
			</div>
		</div>
	);
};
