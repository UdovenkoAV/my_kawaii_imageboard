import {useState} from 'react';
import {OPost, Reply} from './posts';

export const Thread = (props) => {
	const { openLink, thread, slug, doSkip, onPostNumClick } = props;
	const [skip, setSkip] = useState(doSkip);

	return (
		<div className="thread">
			<OPost post={thread.opost} slug={slug} openLink={openLink} doSkip={doSkip} onPostNumClick={(post_num) => onPostNumClick(post_num)}/>
		  {thread.replies.length > 5 && skip && <p> 
			  {thread.replies.length - 5} replies omitted. Click  <span className="fake_a" onClick={() => setSkip(false)}>here</span> to view.
			</p>}
			{skip ? thread.replies.slice(-5).map(reply => 
			<Reply key={"reply_"+reply.post_number} 
						 post={reply} 
						 slug={slug}
						 doSkip={doSkip}
				     opost_num={thread.opost.post_number}
						 onPostNumClick = {(post_num) => onPostNumClick(post_num)}
			/>) : thread.replies.map(reply => 
			<Reply key={"reply_"+reply.post_number} 
			       post={reply} 
			       slug={slug}
						 doSkip={doSkip}
			       opost_num={thread.opost.post_number}
						 onPostNumClick = {(post_num) => onPostNumClick(post_num)}
			/>)}
			<hr/>
		</div>
	);
}
