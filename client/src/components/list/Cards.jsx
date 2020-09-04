import React from 'react';
import { deleteItem } from '../../actions/listAction';
import { loadItem } from '../../actions/listAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Cards({ item, deleteItem, loadItem }) {
  let date = item.date;
  // let dateNow = Date.now();
  // let date = (date) => {
  //   date = item.date - dateNow;
  //   x.toDateString();
  //   console.log(date);
  //   return x;
  // };
  // let timeString = x.toISOString();
  // console.log(timeString);

  const handleClick = (e) => {
    const id = e.target.closest('li').id;
    loadItem(id);
    // console.log(id);
    // dispatch({
    //   type: LAST_ITEM,
    //   payload: id,
    // });
  };

  const handleDelete = (e) => {
    const i = e.target.closest('span').id;
    deleteItem(i);
  };

  return (
    <div>
      <span className='delete' id={item.id} onClick={handleDelete}>
        <svg
          width='2em'
          height='2em'
          viewBox='0 0 16 16'
          className='bi bi-x'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z'
          />
          <path
            fillRule='evenodd'
            d='M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z'
          />
        </svg>
      </span>
      <Link to='/dashboard/listComponent'>
        <div className='card mb-3' onClick={handleClick}>
          <div className='card-body text-light'>
            <h5 className='card-title'>{item.title}</h5>
            <p className='card-text'>{item.desc}</p>
          </div>

          <div className='cardFooter text-light'>{date}</div>
        </div>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteItem, loadItem })(Cards);
