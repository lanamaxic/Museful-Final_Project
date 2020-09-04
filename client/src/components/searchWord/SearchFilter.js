import React from 'react';
import cx from 'classnames';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SEARCH_FILTER } from '../../actions/actionTypes';

import { SEARCH_FILTERS } from './Search_Filters';

export const SearchFilter = () => {
  const activeFilter = useSelector((state) => state.search.filter);
  const dispatch = useDispatch();
  return (
    <div>
      <ul className='d-flex'>
        {Object.keys(SEARCH_FILTERS).map((filterKey) => {
          const currentFilter = SEARCH_FILTERS[filterKey];
          return (
            <li
              className='d-flex searchRequest'
              key={`item-filter-${currentFilter}`}
              onClick={() =>
                dispatch({
                  type: SET_SEARCH_FILTER,
                  payload: filterKey,
                })
              }
            >
              <input
                className='check-label'
                type='radio'
                id={`filter-${currentFilter}`}
                name={`item-filter-radio`}
                value={`option-${currentFilter}`}
              />
              <label className='' htmlFor={`filter-${currentFilter}`}>
                {currentFilter}
              </label>
              <div
                className={cx(
                  `item-filter-${currentFilter} check`,
                  currentFilter === activeFilter && `active`
                )}
              ></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

SearchFilter.propTypes = {
  setSearchFilter: PropTypes.func,
  activeFilter: PropTypes.string,
};

export default SearchFilter;
