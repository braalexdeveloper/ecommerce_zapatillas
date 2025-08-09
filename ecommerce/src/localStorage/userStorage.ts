

export const getUser=()=>{
    const user=JSON.parse(localStorage.getItem("user") || 'null');
    return user;
}

export const setUser=(user:any)=>{
localStorage.setItem("user",JSON.stringify(user));
}

export const removeUserStorage=()=>{
    localStorage.removeItem("user");
}