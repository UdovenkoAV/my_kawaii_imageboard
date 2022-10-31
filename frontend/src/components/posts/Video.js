import {useState} from 'react';

export const Video = ({thumb, src}) => {
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen) {
    return (
      <div className="video">
	<span className="fake_a" onClick={() => setIsOpen(false)}>[CLOSE]</span><br/>
	<video width="840" height="840" controls autoplay="true">
	  <source src={src}/>
	</video>
      </div>
    );
  } else {
    return (
      <div className="video_thumb">
	<img src={thumb} onClick={() => setIsOpen(true)} />
      </div>
    );
  }
}
