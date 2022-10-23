import {useState} from 'react';
import {OPost, Reply} from './posts';

export const Thread = (props) => {
	const { openLink, thread, hash, slug, skip, onPostNumClick } = props;
	const [isSkiped, setIsSkiped] = useState(skip);
	const [highlightReplyNum, setHighlightReplyNum] = useState(hash && hash.slice(1));

	const handlePostLinkClick = (replyNum) => {
		setHighlightReplyNum(replyNum);
	}
	return (
		<div className="thread">
			<OPost post={thread.opost} skip={skip} slug={slug} openLink={openLink} onPostNumClick={(post_num) => onPostNumClick(post_num)}/>
		  {thread.replies.length > 5 && isSkiped && <p> 
			  {thread.replies.length - 5} replies omitted. Click  <span className="fake_a" onClick={() => setIsSkiped(false)}>here</span> to view.
			</p>}
			{isSkiped ? thread.replies.slice(-5).map(reply => 
			<Reply key={"reply_"+reply.post_number} 
						 post={reply}
						 skip={skip}
						 slug={slug}
				     opost_num={thread.opost.post_number}
						 onPostNumClick = {(post_num) => onPostNumClick(post_num)}
			/>) : thread.replies.map(reply =>
			<Reply key={"reply_"+reply.post_number} 
			       post={reply} 
						 skip={skip}
			       slug={slug}
			       opost_num={thread.opost.post_number}
						 isHighlighted={(Number(highlightReplyNum) === reply.post_number)}
						 onPostNumClick = {(post_num) => onPostNumClick(post_num)}
						 onPostLinkClick = {(replyNum) => handlePostLinkClick(replyNum)}
			/>)}
			<hr/>
		</div>
	);
}
