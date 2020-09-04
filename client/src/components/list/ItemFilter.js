import React from 'react';
import cx from 'classnames';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { SET_ITEM_FILTER } from '../../actions/actionTypes';

import { ITEM_FILTERS } from './Item_Filters';

export const ItemFilter = () => {
  const activeFilter = useSelector((state) => state.list.filter);
  const dispatch = useDispatch();
  return (
    <div className='headFilter'>
      <ul className='item-filters col-10 form-check mb-3'>
        {Object.keys(ITEM_FILTERS).map((filterKey) => {
          const currentFilter = ITEM_FILTERS[filterKey];
          return (
            <li
              key={`item-filter-${currentFilter}`}
              className='d-flex searchRequest'

              onClick={() =>
                dispatch({
                  type: SET_ITEM_FILTER,
                  payload: currentFilter,
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
              <label
                className=''
                htmlFor={`filter-${currentFilter}`}
              >
                {' '}
                {currentFilter}
              </label>
              <div                 className={cx(
                  `item-filter-${currentFilter} check`,
                  currentFilter === activeFilter && `active`
                )}></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ItemFilter.propTypes = {
  setItemFilter: PropTypes.func,
  activeFilter: PropTypes.string,
};

export default ItemFilter;
