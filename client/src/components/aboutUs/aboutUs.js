import React from 'react';
import { connect } from 'react-redux';

//STYLING
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// const iconSize = '2x';

const aboutUs = () => {
  return (
    <div className='dashboard pro'>
      <div className='intro'>
        <h3 className=''>About Museful</h3>
        <p className="aboutUsT">
        This is our final project after 8 month of heavy practical web
          development learning at the DCI in Hamburg. We are Filiz, Lana,
          Harris, Sascha and Stefan. You can find our contacts in the links
          below.<br/><br/>
          Our mission is to help anyone to learn anything they want in a museful
          and playful way. Let's start to create a learning and memorable space
          which will grow to a user self generated and curated learning
          management system – welcome to your museful space.<br/><br/>
          Improve your skills with words and terms by getting your Daily Learnings – just for fun. Enjoy your journey
          through this open source project by searching for rhyming words. Are
          you curiosed about the meaning of a word? You have the choice to
          filter and search. If you are seeking for a space to collect and store
          content you have searched for – Museful is the right place for you.
        </p>
      </div>

      <div className='profiles'>
      
      <a
          class='link aboutUs effectContainer search-word'
          href='https://github.com/FlzRkl'>
          <p class='underlay textTitle'>F</p>
          <FontAwesomeIcon
            class='overlay faIconAbout'
            icon={faIdBadge}
            // size={iconSize}
          />
        </a>
        <a
          className='link aboutUs effectContainer lana'
          href='https://github.com/lanamaxic'>
          <p className='underlay textTitle'>L</p>
          <FontAwesomeIcon
            className='overlay faIconAbout'
            icon={faIdBadge}
            // size={iconSize}
          />
        </a>
 
        <a
          className='link aboutUs effectContainer logout'
          href='https://github.com/harris-12'>
          <p className='underlay textTitle'>H</p>
          <FontAwesomeIcon
            className='overlay faIconAbout'
            icon={faIdBadge}
            // size={iconSize}
          />
        </a>
        <a
          className='link aboutUs effectContainer daily-learning'
          href='https://github.com/Staschek'>
          <p className='underlay textTitle'>S</p>
          <FontAwesomeIcon
            className='overlay faIconAbout'
            icon={faIdBadge}
            // size={iconSize}
          />
        </a>
        <a
          className='link aboutUs effectContainer listsIcon'
          href='https://www.mendritzk.io/'>
          <p className='underlay textTitle'>S</p>
          <FontAwesomeIcon
            className='overlay faIconAbout'
            icon={faIdBadge}
            // size={iconSize}
          />
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(aboutUs);
