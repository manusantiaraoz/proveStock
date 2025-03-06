import axios from 'axios';

const URL_BUDGET = import.meta.env.VITE_API_BUDGET;

export const getBudget = async (jwt) => {
  try {
    const response = await axios.get(URL_BUDGET, { 
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
export const delBudget = async (id,jwt) => {
  try {
    const response = await axios.delete(`${URL_BUDGET}/${id}`, { 
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
export const modBudget = async (id,jwt, body) => {
  try {
    const response = await axios.patch(`${URL_BUDGET}/${id}`,body, { 
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
export const createBudget = async (jwt, body) => {
  try {
    const response = await axios.post(`${URL_BUDGET}`,body, { 
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