/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
};

export function Video({ thumb, src }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="video_thumb">
        <img src={thumb} alt="" onClick={() => setIsOpen(true)} onKeyDown={() => setIsOpen(true)} />
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <video controls autoPlay>
              <source src={src} />
              <track kind="captions" />
            </video>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
