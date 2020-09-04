import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { SET_SEARCH_EMPTY } from './../../actions/actionTypes';

//TOGGLE
// import Toggle from "./Darkmode/Toggle";
// import { useDarkMode } from "./Darkmode/useDarkMode";
import { applyTheme } from '../../style/theme/applyTheme';

// STYLE
import { faSun, faMoon, faPlug } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, NavItem, NavbarBrand } from 'react-bootstrap';

//Functions
import { loadItem } from '../../actions/listAction';

//ICONSIZE
let iconSize = '4x';

const NavBar = ({ loadItem }) => {
  // const aboveItem = useSelector((state) => state.list.mainList.aboveItemId);
  // const history = useHistory();

  // const handleClick = (e) => {
  //   //aboveItem is undefined??
  //   console.log(aboveItem);
  //   aboveItem ? loadItem(aboveItem) : history.push("/dashboard/lists");
  // };

  const dispatch = useDispatch();
  const resetSearch = () => {
    dispatch({
      type: SET_SEARCH_EMPTY,
    });
  };

  //TOGGLE HOOK
  const [currentTheme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    console.log(nextTheme);
  };

  return (
    <>
      <Nav className='navbar'>
        <div className='settings'>
          <NavItem className='link'>
            <Link className=' ' to='/dashboard/progress'>
              <FontAwesomeIcon
                icon={faGraduationCap}
                // spin
                size={iconSize}
                className='faIcon'
              />
            </Link>
          </NavItem>
          <NavItem className='link' onClick={toggleTheme}>
            {/* <Link className=' ' to='/dashboard/settings'> */}
            {currentTheme === 'dark' ? (
              <FontAwesomeIcon
                icon={faPlug}
                // pulse
                size={iconSize}
                className='faIcon'
                // color='yellow'
              />
            ) : (
              <FontAwesomeIcon
                icon={faPlug}
                // pulse
                size={iconSize}
                className='faIcon'

                // color='#999'
              />
            )}

            {/* </Link> */}
          </NavItem>
          {/* <NavItem className='link'>
            <Toggle theme={theme} toggleTheme={toggleTheme} />
          </NavItem> */}
        </div>
        <NavbarBrand
          className='header link 
        mb-4'
          onClick={resetSearch}>
          <Link className='link ' to='/dashboard'>
            <span>MUSEFUL</span>
          </Link>
        </NavbarBrand>
      </Nav>
    </>
  );
};

NavBar.propTypes = {
  prop: PropTypes.func,
};

const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, {
  loadItem,
})(NavBar);
