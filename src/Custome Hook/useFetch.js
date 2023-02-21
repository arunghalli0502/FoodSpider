import { useEffect, useState } from "react"
function useFetch(request)
{
    let[data , setData] = useState( null)
    let[pending, setPending]=useState(true)
    let[error, setError]=useState(null)
    //using the useEffect Hooks
    useEffect( ()=>{
                      setTimeout(() => {
                        fetch(request)
                        .then((response)=>{
                                            if(response.ok===true)
                                            {
                                              return(response).json();
                                            }
                                            else
                                            {
                                              throw Error("Data not Found, please try for differnt keyword")
                                            } 
                                          })
                        .then((data)=>{setData(data); setPending(false)})
                        .catch( ((err)=>{setError(err.message); setPending(false)} ))                        
                      }, 3000);
                    }, [] )

    return {data,pending, error}
}
export default useFetch;