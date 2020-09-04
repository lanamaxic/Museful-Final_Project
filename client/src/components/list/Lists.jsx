import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, connect, useDispatch } from 'react-redux';
import Cards from './Cards';
import { loadItem } from '../../actions/listAction';
// import { LAST_ITEM } from '../../actions/actionTypes';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { submitItem } from '../../actions/listAction';
import { useEffect } from 'react';

const Lists = ({ submitItem }) => {
  const userLists = useSelector((state) =>
    state.auth.isAuthenticated ? state.auth.user.list : null
  );
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(true);
  const formStyle = () => {
    setToggle(!toggle);
  };

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState(['']);
  const user = useSelector((state) =>
    state.auth.isAuthenticated ? state.auth.user._id : null
  );

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  let submitObject = {
    user: user,
    title: title,
    tag: 'list',
    desc: desc,
  };

  const submit = (e) => {
    e.preventDefault();
    submitItem(submitObject);
    setTitle('');
    setDesc('');
  };

  const handleAdd = () => {
    console.log('make form visible');
  };

  useEffect(() => {
    console.log('useeffect list compr', userLists);
    setData(userLists);
  }, [userLists, data]);

  console.log(data);

  return (
    <>
      <div className='head'>
        <div className='flex-row mb-4'>
          <h3 className='display'>List Storage</h3>
          <div className='btnL ml-4' onClick={formStyle}>
            {toggle ? (
              <FontAwesomeIcon icon={faPlus} size={'1x'} className='iconAdd' />
            ) : (
              <FontAwesomeIcon icon={faMinus} size={'1x'} className='iconAdd' />
            )}
          </div>
        </div>
        <form
          onSubmit={submit}
          className={toggle === true ? 'd-none ' : 'd-flexColumn'}
        >
          <div className='mb-2'>
            <input
              type='text'
              className='form-control mb-3'
              placeholder='Title'
              aria-label='Title'
              aria-describedby='input-title'
              value={title}
              name='inputList0'
              id='inputList0'
              onChange={handleChangeTitle}
            />

            <div className='input-group mb-3'>
              <textarea
                className='form-control'
                placeholder='Add Describtion'
                aria-label='Desc'
                value={desc}
                onChange={handleChangeDesc}
              ></textarea>
            </div>
          </div>
          <div onClick={submit} className='btnL' id='input-addon-add'>
            Add List
          </div>
        </form>
      </div>

      <ul className='d-flex wrap' id='list-list'>
        {data
          ? data.map((item) => (
              <li key={'li-' + item.id} id={item.id} className='col-sm-6 '>
                <Cards item={item} />
              </li>
            ))
          : null}{' '}
      </ul>
    </>
  );
};

Lists.propTypes = {
  userLists: PropTypes.array,
};

const mapStateToProps = (state) => ({
  userLists: state.auth.list,
});

export default connect(mapStateToProps, { submitItem })(Lists);
