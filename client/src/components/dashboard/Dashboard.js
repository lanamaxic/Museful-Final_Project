import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth';

//STYLING
import {
  faSearch,
  faClipboard,
  faListUl,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const iconSize = '1x';

const Dashboard = ({ logout }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // useEffect(() => {
  // }, []);

  return (
    <div className='dashboard dashIcons'>
      <Link
        className='subHeader link daily-learning'
        to='/dashboard/daily-learning'>
        <FontAwesomeIcon icon={faListUl} size={iconSize} className='faIcon' />
      </Link>
      <Link className='subHeader link search-word' to='/dashboard/search-word'>
        <FontAwesomeIcon icon={faSearch} size={iconSize} className='faIcon' />
      </Link>
      <Link className='subHeader link listsIcon' to='/dashboard/lists'>
        <FontAwesomeIcon
          icon={faClipboard}
          size={iconSize}
          className='faIcon'
        />
      </Link>
      <Link className='subHeader link logout' to='/' onClick={logout}>
        <FontAwesomeIcon icon={faDoorOpen} size={iconSize} className='faIcon' />
      </Link>
      {isAuthenticated ? null : <Redirect to='/' />}
    </div>
  );
};

Dashboard.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({
  data: state.search.data,
  random: state.search.random,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { logout })(Dashboard);
