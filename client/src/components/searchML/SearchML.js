import React, { Fragment, useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import { Form, Button, Input, CardGroup, CardBody } from 'reactstrap';
import './searchml.css';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useDataMuse = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

function SearchML() {
  const [query, setQuery] = useState('');
  const [
    { data, isLoading, isError },
    doFetch,
  ] = useDataMuse('https://api.datamuse.com/words?ml=', [{ word: '' }]);

  return (
    <Fragment>
      <Form
        id='container'
        onSubmit={(event) => {
          doFetch(`https://api.datamuse.com/words?ml=${query}`);

          event.preventDefault();
        }}>
        <Input
          placeholder='Enter Initial Word'
          id='initial-word-form'
          type='text'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button
          type='submit'
          className='btn btn-success'
          style={{ marginTop: '8px' }}>
          Search
        </Button>
      </Form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <CardBody>
          {data.map((item) => (
            <CardGroup key={item.word} id='related-word'>
              <Button href={item.word} className='success'>
                {item.word}
              </Button>
            </CardGroup>
          ))}
        </CardBody>
      )}
    </Fragment>
  );
}

export default SearchML;
