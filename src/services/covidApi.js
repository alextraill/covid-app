import axios from 'axios';

async function getDataByState(date){
    const response =await axios.get('https://covid-api.com/api/reports?iso=USA&date='+ date); 
    return response.data.data;
}

async function getTotalUsaData(date){
    let response = await axios.get(`https://covid-api.com/api/reports/total?iso=USA&date=${date.toISOString().split('T')[0]}`);
    return response.data.data
}

async function getTotalStateData(date, state){
    let response =  await axios.get(`https://covid-api.com/api/reports?iso=USA&date=${date.toISOString().split('T')[0]}&region_province=${state}`);
    return response.data.data[0]
}

async function getStateList(){
    const response = await axios.get('https://covid-api.com/api/reports?iso=USA&date=2021-09-07'); 
    return response.data.data;
}

export { getDataByState, getTotalUsaData, getTotalStateData, getStateList }