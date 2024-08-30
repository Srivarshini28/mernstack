import { useDispatch, useSelector } from "react-redux"

export default function About(){
    const counterval = useSelector((state)=>state.counter);
    const myDetails = useSelector((state)=>state.myDetails);
    const dispatch = useDispatch();
    const add=()=>{
        dispatch({
            type:"add"
        })

    }
    const sub=()=>{
        dispatch({
            type:"sub"
        })  
    }

    return(
        <div >
            <h1>ABOUT</h1> 
            <h1>from Redux  {counterval}</h1>
            <input type="button" value="Add" onClick={add}/><br></br>
            <input type="button" value ="Sub" onClick={sub}/>
            <h2>Name: {myDetails.name}  </h2>
            <h2>Email: {myDetails.email}  </h2>
            
        </div>
    )
}