import React, { useState } from 'react';
import {
  TextField, IconButton, Modal, Box, Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchResult } from './SearchResult';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
};

export function Search({ slug }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const openSearchResultModal = () => {
    if (query.length >= 3) {
      setIsOpen(true);
      setSearchError('');
    } else {
      setSearchError('Search query is too short.');
    }
  };
  const handleClick = () => {
    openSearchResultModal();
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      openSearchResultModal();
    }
  };
  return (
    <>
      <div className="search_field">
        <TextField
          id="standard-basic"
          error={!!searchError}
          helperText={searchError}
          label="Search"
          size="small"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton color="primary" aria-label="Search" onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <SearchResult slug={slug} query={query} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
