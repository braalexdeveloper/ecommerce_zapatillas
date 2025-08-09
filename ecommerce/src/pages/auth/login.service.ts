
const API_URL = "http://localhost:5000/api/auth/login";

export const authLogin=async (credenciales:any)=>{
  const data=await fetch(API_URL,{
    method:'POST',
    credentials:'include',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(credenciales)
  });

  return data.json();
}