import { Image } from './image.js';
import {useState} from 'react';
import reactStringReplace from 'react-string-replace';

const PostLink = ({slug, postLink, onClick}) => {
	const replyNum = postLink.match(/(?<=&gt;&gt;)\d+(?=#)/);
	const parentNum = postLink.match(/(?<=#)\d+/) 
	const handlePostLinkClick = () => {
		onClick(replyNum[0])
	}
	return (
		<a onClick={handlePostLinkClick}href={"/"+slug+"/"+parentNum+"#"+replyNum}>
		>>{replyNum}
		</a>
	);
}



const Message = ({message, slug, skip, onPostLinkClick}) => {

	const [isSkiped, setIsSkiped] = useState(skip)
	let formatedMessage = isSkiped && message.length > 500 ? message.slice(0, 500)+"..." : message;
	formatedMessage = reactStringReplace(formatedMessage, /(\B\*\*[^\*{2}]+\*\*\B|\b__[^_{2}]+__\b)/, (match, i) => <b key={"post_b"+i}>{match.slice(2, -2)}</b>);
	formatedMessage = reactStringReplace(formatedMessage, /(\B\*[^\*]+\*\B|\b_[^_]+_\b)/, (match, i) => <i key={"post_i"+i}>{match.slice(1,-1)}</i>);
	formatedMessage = reactStringReplace(formatedMessage, /(`[\S\s]+`)/, (match, i) => <pre key={"post_pre"+i}>{match.slice(1,-1)}</pre>);
	formatedMessage = reactStringReplace(formatedMessage, /(^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$)/, (match, i) => <a key={"post_a"+i} href={match}>{match}</a>);
	formatedMessage = reactStringReplace(formatedMessage, /(&gt;&gt;\d+#\d+)/, (match, i) => <PostLink key={"post_link"+i} onClick={(replyNum) => onPostLinkClick(replyNum)} slug={slug} postLink={match}/>);

		return (
			<article>
				{formatedMessage}
				{isSkiped && message.length > 500 && <p>Comment too long. <span className="fake_a" onClick={() => setIsSkiped(false)}>Click here</span> to view the full text.</p>}
			</article>
		);

};


const Created = (props) => {

	const { datetime } = props;
	const date = datetime.match(/.*(?=T)/)[0];
	const time = datetime.match(/(?<=T).*(?=\.)/)[0];

	return (
			<span className="created_time">{date} {time} </span>
	);
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
			<span className="post_num"><a href={'/'+slug+'/'+opost_num+'#i'+post_num} onClick={handlePostNumClick}>№{post_num}</a> </span>
			{openLink}
		</div>
	)
}

export const Reply = (props) => {

	const { post, slug, skip, opost_num, isHighlighted, onPostNumClick, onPostLinkClick } = props;

	
	return (
		<div className="reply">
			<div className="doubledash">>></div>
			<div className={isHighlighted ? "highlighted_post" : "post"} >
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
					<Message message={post.message} slug={slug} skip={skip} onPostLinkClick={(replyNum) => onPostLinkClick(replyNum) }/>
				</div>
			</div>
		</div>
	);
};

export const OPost = (props) => {

	const { post, slug, skip, openLink, onPostNumClick } = props;
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
				<Message message={post.message} skip={skip} slug={slug}/>
			</div>
		</div>
	);
};
