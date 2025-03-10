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

    return { data: response.data.dataBudget }; 
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
export const conBudget = async (id,jwt) => {
  try {
    const response = await axios.post(`${URL_BUDGET}/confirm/${id}`,{}, { 
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
export const printBudget = async (id,jwt) => {
  try {
    const response = await axios.post(`${URL_BUDGET}/print/${id}`,{}, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      responseType: 'blob', 
    }
  );

  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'proveStock.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

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