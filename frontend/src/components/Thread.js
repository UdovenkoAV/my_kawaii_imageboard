import {useState, useEffect} from 'react';
import {OPost} from './posts/OPost.js';
import {Reply} from './posts/Reply.js'
import './Thread.css'
export const Thread = (props) => {
	const { openLink, thread, hash, slug, skip, onPostNumClick } = props;
	const [isSkiped, setIsSkiped] = useState(skip);
	const [highlightReplyNum, setHighlightReplyNum] = useState(hash && hash.slice(1));

	const scroll = (replyNum) => {
		const el = document.querySelector("#post_"+replyNum);
		el?.scrollIntoView();
	}
	const handlePostLinkClick = (replyNum) => {
		scroll(replyNum);
		setHighlightReplyNum(replyNum);
	}
	useEffect(() => {
		if (hash) {
			scroll(hash.slice(1))
		}
	},[hash]);
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
						 onPostLinkClick = {() => {}}
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