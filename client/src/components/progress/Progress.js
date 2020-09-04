import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { Link } from "react-router-dom";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './progress.scss';

export const Progress = () => {
  const [values, setValues] = useState([
    { date: '2020-01-01', count: 1 },
    { date: '2020-01-03', count: 3 },
    { date: '2020-01-09', count: 2 },
    { date: '2020-01-11', count: 4 },
    { date: '2020-01-14', count: 5 },
    { date: '2020-06-03', count: 3 },
  ]);

  return (
    <div className='heatmap'>
      <CalendarHeatmap
        values={values}
        showWeekdayLabels={true}
        // onMouseOver={(event, value) => console.log(value)}
        titleForValue={(value) => {
          if (value) {
            return `${value.count} Hours`;
          } else if (!value) {
            return `0 Hours`;
          }
        }}
        // tooltipDataAttrs={(value) => {
        //   return { 'data-tooltip': 'Tooltip: ' + value };
        // }}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
