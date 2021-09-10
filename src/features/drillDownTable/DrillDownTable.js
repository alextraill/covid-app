import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@material-ui/core'
import { getDataByState } from '../../services/covidApi';

export function DrillDownTable() {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const drillDown = useSelector(state => state.drillDownTable.value)

    function createData(state, confirmed, deaths) {
        return { state, confirmed, deaths };
    }

    //Retrieves #of confirmed cases and #of deaths for each state for a particular date and updates state Rows
    async function fetchStateData() {
        setIsLoading(true);
        let responseArray = await getDataByState(drillDown.date)
        responseArray.sort(function(a, b){
            if(a.region.province < b.region.province) { return -1; }
            if(a.region.province > b.region.province) { return 1; }
            return 0;
        })
        for (let i = 0; i < responseArray.length; i++) {
            setRows(prevState => (
                [...prevState, createData(responseArray[i].region.province, responseArray[i].confirmed, responseArray[i].deaths)] 
            ))  
        }  
        setIsLoading(false);
    }

    useEffect(() => {
        setRows([]);
        fetchStateData();
    }, [drillDown]);

  return (
    <div>
        <h2>Data by State for {drillDown.date}</h2>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>State</TableCell>
                        <TableCell align="right">Confirmed Cases</TableCell>
                        <TableCell align="right">Deaths</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                <div className="loader-table">
                {isLoading && (
                    <CircularProgress 
                        size={100}
                    />
                )}
                </div>
                    {rows.map((row) => (
                    <TableRow key={row.state}>
                        <TableCell component="th" scope="row">
                        {row.state}
                        </TableCell>
                        <TableCell align="right">{row.confirmed}</TableCell>
                        <TableCell align="right">{row.deaths}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
      </TableContainer>
    </div>
  )
}