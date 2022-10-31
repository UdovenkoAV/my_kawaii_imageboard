import {reReplyNum, rePerentLink} from './postRegex.js';

export const PostLink = ({slug, postLink, onClick}) => {
  const replyNum = postLink.match(reReplyNum);
  const parentNum = postLink.match(rePerentLink); 
  const handlePostLinkClick = () => {
    onClick(replyNum);
  }
  return (
    <a onClick={handlePostLinkClick}href={"/"+slug+"/"+parentNum+"#"+replyNum}>
      >>{replyNum}
    </a>
  );
}
