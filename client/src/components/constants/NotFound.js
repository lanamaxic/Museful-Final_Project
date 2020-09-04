import React from 'react';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// STYLE
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotFound = () => {
  return (
    <div className='component warning'>
      <h1 className=''>
        <FontAwesomeIcon icon={faExclamationCircle} spin /> Page Not Found{' '}
      </h1>{' '}
      <h4 className=''> Sorry, this page does not exist </h4>{' '}
    </div>
  );
};

export default NotFound;
