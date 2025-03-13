import axios from 'axios';

const URL_USER = import.meta.env.VITE_API_USER;

export const getUser = async (userrId, jwt) => {
try {
  const response = await axios.get(`${URL_USER}/${userrId}`, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return error; 
  }
};
export const getAllUser = async (jwt) => {
try {
  const response = await axios.get(`${URL_USER}`, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return error; 
  }
};
export const modUser = async (userrId, jwt, body) => {
  try {
    const response = await axios.patch(`${URL_USER}/${userrId}`,body, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return error; 
  }
};
export const createUser = async ( jwt, body) => {
  try {
    const response = await axios.post(`${URL_USER}`,body, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return error; 
  }
};
export const suspenderUser = async (userrId, jwt) => {
  try {
    const response = await axios.post(`${URL_USER}/suspender/${userrId}`,{}, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return error; 
  }
};
export const activeUser = async (userrId, jwt) => {
  try {
    const response = await axios.post(`${URL_USER}/active/${userrId}`,{}, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return error; 
  }
};