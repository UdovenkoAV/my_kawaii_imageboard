import reactStringReplace from 'react-string-replace';
import { useState } from 'react';
import {PostLink} from './PostLink.js';
import {reBold, reItalic, rePre, reWebLinks, reQuote, rePostLinks} from './postRegex.js';

export const FormatMessage = ({message, slug, skip, onPostLinkClick}) => {

	const [isSkiped, setIsSkiped] = useState(skip);
	let formatedMessage = isSkiped && message.length > 500 ? message.slice(0, 500)+"..." : message;
	formatedMessage = reactStringReplace(formatedMessage, reBold, (match, i) => <b key={"post_b"+i}>{match.slice(2, -2)}</b>);
	formatedMessage = reactStringReplace(formatedMessage, reItalic, (match, i) => <i key={"post_i"+i}>{match.slice(1,-1)}</i>);
	formatedMessage = reactStringReplace(formatedMessage, rePre, (match, i) => <pre key={"post_pre"+i}>{match.slice(1,-1)}</pre>);
	formatedMessage = reactStringReplace(formatedMessage, reWebLinks, (match, i) => <a key={"post_a"+i} href={match}>{match}</a>);
	formatedMessage = reactStringReplace(formatedMessage, reQuote, (match, i) => <div key={"quote_"+i} className="quote_text">{match}</div>)
	formatedMessage = reactStringReplace(formatedMessage, rePostLinks, (match, i) => <PostLink key={"post_link"+i} onClick={(replyNum) => onPostLinkClick(replyNum)} slug={slug} postLink={match}/>);

		return (
			<article className="post_message">
				{formatedMessage}
				{isSkiped && message.length > 500 && <p>Comment too long. <span className="fake_a" onClick={() => setIsSkiped(false)}>Click here</span> to view the full text.</p>}
			</article>
		);

};
