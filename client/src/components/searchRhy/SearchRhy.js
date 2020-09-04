import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './searchRhy.css';
import SearchResult from './SearchResult';
// import rhymeImg from './Workhome.png';

export default class SearchRhy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    };
  }

  //find the last word if your value is more than 1 word
  onChange = (e) => {
    const terms = e.target.value.split(' ');
    const lastWord = terms[terms.length - 1];

    //fetching API
    fetch(`http://api.datamuse.com/words?rel_rhy=${lastWord}&md=d`)
      .then((res) => {
        return res.json();
      })
      .then((words) => this.setState({ searchResults: words }));
  };

  render() {
    console.log(this.state.searchResults);
    return (
      <>
        {/* <div className='content'>
          <div className='image'>
            <img src={rhymeImg} />
          </div>
        </div> */}
        <Helmet title='Find a Rhyme'>
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap'
            rel='stylesheet'
          />
        </Helmet>

        <div className='container'>
          <div className='title'>Find a Rhyme</div>
          <input
            type='text'
            className='searchInput'
            placeholder='Start typing to find words that rhyme'
            onChange={this.onChange}
          />
          <div className='resultsContainer'>
            {this.state.searchResults.map((result) => (
              <SearchResult result={result} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
