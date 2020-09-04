import React, { useState, useEffect, useRef } from 'react';
import './list.scss';
import PropTypes from 'prop-types';
import ListItems from './ListItems';
import { ItemFilter } from './ItemFilter';
import { submitItem } from '../../actions/listAction';
import { loadItem, getListArr, putEditItems } from '../../actions/listAction';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const ListComponent = ({
  submitItem,
  loadItem,
  getListArr,
  putEditItems,
}) => {
  const inputEl = useRef(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [titleEdit, setTitleEdit] = useState('');
  const [descEdit, setDescEdit] = useState('');
  const [toggleEdit, setToggleEdit] = useState(false);
  const mainList = useSelector((state) => state.list.mainList);
  const filteredList = useSelector((state) => state.list.filteredList);
  const filter = useSelector((state) => state.list.filter);
  const user = useSelector((state) => state.auth.user._id);
  const currentId = useSelector((state) => state.list.mainList._id);
  const aboveId = useSelector((state) => state.list.mainList.aboveItemId);
  const editTag = useSelector((state) => state.list.mainList.tag);
  const [tags, setTags] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const history = useHistory();
  const handleBack = (e) => {
    //aboveItem is undefined??
    console.log(aboveId);
    aboveId ? loadItem(aboveId) : history.push('/dashboard/lists');
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleClick = (e) => {
    const id = e.target.closest('li').id;
    loadItem(id);
    console.log(id);
  };

  const handleEditTitle = (e) => {
    setTitleEdit(e.target.value);
  };

  const handleEditDesc = (e) => {
    setDescEdit(e.target.value);
  };

  const toggleEditButton = (e) => {
    if (!toggleEdit) {
      setTitleEdit(mainList.title);
      setDescEdit(mainList.desc);
    }
    setToggleEdit(!toggleEdit);
  };

  let editObject = {
    id: currentId,
    user: user,
    title: titleEdit,
    desc: descEdit,
    tag: editTag,
    aboveItemId: aboveId,
  };

  const submitEdit = (e) => {
    e.preventDefault();
    putEditItems(editObject);
    // loadItem(currentId);
    setTitleEdit('');
    setDescEdit('');
    setToggleEdit(!toggleEdit);
    console.log(editObject);
  };

  let submitObject = {
    user: user,
    title: title,
    tag: filter,
    desc: desc,
    aboveItemId: currentId,
  };

  const submit = (e) => {
    e.preventDefault();
    submitItem(submitObject);
    setTitle('');
    setDesc('');
    loadItem(currentId);
    console.log(submitObject);
  };

  useEffect(() => {
    inputEl.current.focus();
    getListArr(mainList);
    document.getElementById('filter-list').checked = true;
  }, [mainList]);

  useEffect(() => {
    setTags(filteredList[0]);
    setData(filteredList[1]);
  }, [filteredList]);

  return (
    <>
      <div className='btnIL mr-2' onClick={handleBack}>
        <svg
          width='3em'
          height='3em'
          viewBox='0 0 16 16'
          class='bi bi-arrow-left-short'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            d='M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z'
          />
          <path
            fill-rule='evenodd'
            d='M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z'
          />
        </svg>
      </div>

      <div className='d-flexColumn'>
        {toggleEdit ? (
          <>
            <form className='mb-4' onSubmit={submitEdit}>
              <input
                type='text'
                className='inputEdit'
                placehoder={mainList.title}
                aria-label='Title'
                aria-describedby='input-title'
                value={titleEdit}
                name='titleEdit'
                id='titleEdit'
                onChange={handleEditTitle}
              />
              <input
                type='text'
                className='inputEdit'
                placeholder={mainList.desc}
                aria-label='Desc'
                aria-describedby='input-title'
                value={descEdit}
                name='descEdit'
                id='descEdit'
                onChange={handleEditDesc}
              />
              <button className='inputSearch' onClick={submitEdit}>
                Save
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className='mb-1'>{mainList.title}</h1>
            <div className='mb-4'>{mainList.desc}</div>
          </>
        )}
          </div>
          {toggleEdit ? (
        <button className='inputSearch mb-4 ' onClick={toggleEditButton}>
             <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
             <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
             <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
           </svg>
              </button>
          ) : (
            <div className='btnIL ml-3' onClick={toggleEditButton}>

            <svg
              width='2em'
              height='2em'
              viewBox='0 0 16 16'
              class='bi bi-pen'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M5.707 13.707a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391L10.086 2.5a2 2 0 0 1 2.828 0l.586.586a2 2 0 0 1 0 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 0 1 1.414 0l.586.586a1 1 0 0 1 0 1.414L5 13l-3 1 1-3z'
              />
              <path
                fill-rule='evenodd'
                d='M9.854 2.56a.5.5 0 0 0-.708 0L5.854 5.855a.5.5 0 0 1-.708-.708L8.44 1.854a1.5 1.5 0 0 1 2.122 0l.293.292a.5.5 0 0 1-.707.708l-.293-.293z'
              />
              <path d='M13.293 1.207a1 1 0 0 1 1.414 0l.03.03a1 1 0 0 1 .03 1.383L13.5 4 12 2.5l1.293-1.293z' />
            </svg>
            </div>

          )}

      <ItemFilter />
      <form onSubmit={submit} className='d-flexColumn addItemForm'>
        <div className='formSearch mb-2'>
          {/* <div className='input-group-prepend'>
            <span className='input-group-text' id='input-addon-filter'>
              @@
            </span>
          </div> */}
          <input
            ref={inputEl}
            type='text'
            className='input'
            placeholder='Title'
            aria-label='Title'
            aria-describedby='input-title'
            value={title}
            name='inputList0'
            id='inputList0'
            onChange={handleChangeTitle}
          />
          <button onClick={submit} className='inputSearch' id='input-addon-add'>
            Add
          </button>
        </div>
        <div className='input-group mb-3'>
          <textarea
            className='form-control'
            placeholder='Add Description'
            aria-label='Desc'
            value={desc}
            onChange={handleChangeDesc}
          ></textarea>
        </div>
      </form>
      <hr />
      <div className='col-lg-8'>
        <ul className='text-center'>
          {data
            ? data.map((item, index) => (
                <>
                  <h4 className='mt-5'>{tags[index]}</h4>
                  <li key={tags[index] + index} id={tags[index] + index}>
                    <ListItems handleClick={handleClick} item={item} />
                  </li>
                </>
              ))
            : null}
        </ul>
      </div>
    </>
  );
};

ListComponent.propTypes = {
  submitItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, {
  submitItem,
  loadItem,
  getListArr,
  putEditItems,
})(ListComponent);
