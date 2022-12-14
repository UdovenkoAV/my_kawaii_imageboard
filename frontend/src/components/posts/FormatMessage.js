/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useState, useRef, useImperativeHandle, forwardRef,
} from 'react';
import reactStringReplace from 'react-string-replace';
import { PostLink } from './PostLink.js';
import {
  reBold, reItalic, rePre, reWebLinks, reQuote, rePostLinks, reBr,
} from './postRegex.js';

export const FormatMessage = forwardRef(({
  message, slug, skip, onPostLinkClick,
}, ref) => {
  const [isSkiped, setIsSkiped] = useState(skip);
  const postLinksRef = useRef([]);
  let formatedMessage = isSkiped && message.length > 500 ? `${message.slice(0, 500)}...` : message;
  formatedMessage = reactStringReplace(formatedMessage, reBold, (match, i) => <b key={`post_b${i}`}>{match.slice(2, -2)}</b>);
  formatedMessage = reactStringReplace(formatedMessage, reItalic, (match, i) => <em key={`post_em${i}`}>{match.slice(1, -1)}</em>);
  formatedMessage = reactStringReplace(formatedMessage, rePre, (match, i) => <pre key={`post_pre${i}`}>{match.slice(1, -1)}</pre>);
  formatedMessage = reactStringReplace(formatedMessage, reWebLinks, (match, i) => <a key={`post_a${i}`} href={match}>{match}</a>);
  formatedMessage = reactStringReplace(formatedMessage, reQuote, (match, i) => <div key={`quote_${i}`} className="quote_text">{match}</div>);
  formatedMessage = reactStringReplace(formatedMessage, reBr, () => <br />);
  formatedMessage = reactStringReplace(formatedMessage, rePostLinks, (match, i) => <PostLink ref={(el) => postLinksRef.current[i] = el} key={`post_link${i}`} onClick={onPostLinkClick} slug={slug} postLink={match} />);
  useImperativeHandle(ref, () => ({
    getPostLinks: () => postLinksRef.current.map((link) => link.getReplyNum()),
  }), []);
  return (
    <article className="post_message">
      {formatedMessage}
      {isSkiped && message.length > 500 && (
      <p>
        Comment too long.
        <span
          className="fake_a"
          onClick={() => setIsSkiped(false)}
          onKeyDown={() => setIsSkiped(false)}
        >
          Click here
        </span>
        {' '}
        to view the full text.
      </p>
      )}
    </article>
  );
});
