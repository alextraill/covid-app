import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://covid-api.com/api',
  });
  axiosInstance.interceptors.response.use(response => response.data);


async function getDataByState(date){
    const { data } =await axiosInstance.get('/reports?iso=USA&date='+ date); 
    return sortStatesByName(data);
}

async function getTotalUsaData(date){
    const { data } = await axiosInstance.get(`/reports/total?iso=USA&date=${date.toISOString().split('T')[0]}`);
    return data
}

async function getTotalStateData(date, state){
    const { data } =  await axiosInstance.get(`/reports?iso=USA&date=${date.toISOString().split('T')[0]}&region_province=${state}`);
    return data[0]
}

async function getStateList(){
    const { data } = await axiosInstance.get('/reports?iso=USA&date=2021-09-07');  //When no date was added the API returned a CORS error
    return sortStatesByName(data);
}

function sortStatesByName(data){
    data.sort(function(a, b){
        if(a.region.province < b.region.province) { return -1; }
        if(a.region.province > b.region.province) { return 1; }
        return 0;
    })
    return data;
}


export { getDataByState, getTotalUsaData, getTotalStateData, getStateList }