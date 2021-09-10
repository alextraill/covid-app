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
        const statesData = await getDataByState(drillDown.date)

        for (const stateData of statesData) {
            setRows(prevState => (
                [...prevState, createData(stateData.region.province, stateData.confirmed, stateData.deaths)] 
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