const URL_AUTH = import.meta.env.VITE_API_AUTH;

export const loginApi = async(credenciales) =>{ 
    try{
    const log = await fetch(URL_AUTH,{
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(credenciales),
        credentials:'include'
    });
    const data = await log.json();
    const {user, token} = data

    return{user, token}

    }catch(e){
        console.log(e);
        
    }

}