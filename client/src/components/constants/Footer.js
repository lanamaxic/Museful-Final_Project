import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='copyright'>
        &copy; Copyright 2020
        <Link className='copyright link' to='/about-us'>
          FLHSS
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
