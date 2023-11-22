import axios from 'axios';

const DEFAULT_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest'
}

const get = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let response = await axios.get(urlPath, headers/*{
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    }*/);

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500, error:err}
  }
}

const post = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.post(`${BASEURL}${urlPath}`, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500, error:err}
  }
}

const del = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.delete(`${BASEURL}${urlPath}`, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500, error:err}
  }
}

const put = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.put(`${BASEURL}${urlPath}`, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500, error:err}
  }
}

export {
  get,
  post,
  del,
  put,
}