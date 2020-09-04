import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRandom } from '../../actions/searchAction';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const DailyLearning = ({ fetchRandom }) => {
  const isLoading = useSelector((state) => state.search.isLoading);
  const fiveWord = useSelector((state) => state.search.random);
  const [random, setRandom] = useState([]);
  console.log(random, fiveWord);
  const getRandom = (e) => {
    e.preventDefault();
    fetchRandom();
  };

  useEffect(() => {
    setRandom(fiveWord);
  }, [fiveWord]);

  return (
    <div className='d-flexColumn'>
      <h1 className='mb-4 textTitle'> Daily Learning </h1>{' '}
      {/* <input type='text' value='Give it a try!' /> */}{' '}
      <button type='submit' className='btnI textSubtitle' onClick={getRandom}>
        Muse Me
      </button>{' '}
      {isLoading ? (
         <FontAwesomeIcon
         icon={faSpinner}
         spin
         size='4x'

         // color='#999'
       />
      ) : (
        <div className='searchResults mt-4'>
          {random
            ? random.map((item) => (
                <div className='searchResult'> <a
                href={`https://www.dictionary.com/browse/${item.word}`}
                target='_blank'
                rel='noopener noreferrer'
                className='word'
              >
                {item.word}
              </a></div>
              ))
            : null}
        </div>
      )}
    </div>
  );
};

DailyLearning.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({
  fiveWord: state.search.random,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { fetchRandom })(DailyLearning);
