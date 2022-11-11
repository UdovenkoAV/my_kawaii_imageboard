import React from 'react';
import ModalImage from 'react-modal-image';
import { Video } from './Video.js';

export function Media(props) {
  const { thumb, src } = props;
  const filename = src.split('/').slice(-1).toString();
  const extension = filename.split('.').slice(-1).toString();
  return (
    <figure className="post_file">
      <figcaption className="file_description">
        <a href={src}>
          <p className="file_name">
            {filename.length > 30 ? `...${filename.slice(-30)}` : filename}
          </p>
        </a>
      </figcaption>
      {['jpeg', 'jpg', 'png', 'gif'].includes(extension.toLowerCase()) && (
      <ModalImage
        small={thumb}
        large={src}
      />
      )}
      {['webm', 'mp4'].includes(extension.toLowerCase()) && <Video thumb={thumb} src={src} />}
    </figure>
  );
}
