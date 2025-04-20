
export default async function  useSend(url,sendData) {
  try{
     const res = await fetch(url,{
      method:"POST",
      headers:{
  
              'Content-Type': 'application/json',
            },
      body:JSON.stringify(sendData)
    });
    const data = await res.json();
    return data;
  }
   catch(err){
    console.error("Error",err);
    return
}
}
