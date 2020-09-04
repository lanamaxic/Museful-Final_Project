import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
// import iconSize from "../constants/NavBar";

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let iconSize = '4x';

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  toggleTheme = () => {};

  return (
    <button onClick={toggleTheme} className='toggle'>
      <FontAwesomeIcon
        icon={faMoon}
        // spin
        color='white'
        size={iconSize}
        className='toggle2'
      />
      <FontAwesomeIcon
        icon={faSun}
        // spin
        color='yellow'
        size={iconSize}
        className='toggle1'
      />
    </button>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggle;
