import axios from 'axios';

const URL_CLIENT = import.meta.env.VITE_API_CLIENT;

export const getClient = async (jwt) => {
  try {
    const response = await axios.get(URL_CLIENT, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return null; 
  }
};
export const delClient = async (id,jwt) => {
  try {
    const response = await axios.delete(`${URL_CLIENT}/${id}`, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return null; 
  }
};
export const modClient = async (id,jwt, body) => {
  try {
    const response = await axios.patch(`${URL_CLIENT}/${id}`,body, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return null; 
  }
};
export const createClient = async (jwt, body) => {
  try {
    const response = await axios.post(`${URL_CLIENT}`,body, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });
    return { data: response.data }; 
  } catch (error) {
    console.error(error);
    
    return null; 
  }
};