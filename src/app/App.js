import React from 'react';

import './App.css';
import { TimeFrame } from '../features/timeFrame/TimeFrame';
import { DrillDownTable } from '../features/drillDownTable/DrillDownTable';
import { StatesDropdown } from '../features/statesDropdown/StatesDropdown';
import { Chart } from '../features/chart/Chart';


function App() {


  return (
    <div className="App">
        <div className="inputs">
            <TimeFrame/>
            <StatesDropdown/>
        </div>
        <Chart/>
        <DrillDownTable/>
    </div>
  );
}

export default App;
