import React from 'react';
import ModalImage from 'react-modal-image';
import { Video } from './Video.js';

export function Media({ file }) {
  const extension = file.name.split('.').slice(-1).toString();
  return (
    <figure className="post_file">
      <figcaption className="file_description">
        <a href={file.src}>
          <span>
            {file.name.length > 30 ? `...${file.name.slice(-30)}` : file.name}
          </span>
        </a>
        <br />
        <span className="file_size">
          {Math.floor(file.size / 1024)}
          Kb,
          {' '}
          {file.resolution}
        </span>
      </figcaption>
      {['jpeg', 'jpg', 'png', 'gif'].includes(extension.toLowerCase()) && (
      <ModalImage
        small={file.thumbnail}
        large={file.src}
      />
      )}
      {['webm', 'mp4'].includes(extension.toLowerCase()) && <Video thumb={file.thumbnail} src={file.src} />}
    </figure>
  );
}
