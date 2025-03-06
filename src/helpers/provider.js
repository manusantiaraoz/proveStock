import axios from 'axios';

const URL_PROVIDER = import.meta.env.VITE_API_PROVIDER;

export const getProvider = async (jwt) => {
  try {
    const response = await axios.get(URL_PROVIDER, { 
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
export const delProvider = async (id,jwt) => {
  try {
    const response = await axios.delete(`${URL_PROVIDER}/${id}`, { 
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
export const modProvider = async (id,jwt, body) => {
  try {
    const response = await axios.patch(`${URL_PROVIDER}/${id}`,body, { 
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
export const createProvider = async (jwt, body) => {
  try {
    const response = await axios.post(`${URL_PROVIDER}`,body, { 
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