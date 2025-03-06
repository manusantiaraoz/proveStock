import axios from 'axios';

const URL_PRODUCT = import.meta.env.VITE_API_PRODUCT;

export const getProduct = async (jwt) => {
  try {
    const response = await axios.get(URL_PRODUCT, { 
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
export const delProduct = async (id,jwt) => {
  try {
    const response = await axios.delete(`${URL_PRODUCT}/${id}`, { 
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
export const modProduct = async (id,jwt, body) => {
  try {
    const response = await axios.patch(`${URL_PRODUCT}/${id}`,body, { 
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
export const createProduct = async (jwt, body) => {
  try {
    const response = await axios.post(`${URL_PRODUCT}`,body, { 
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