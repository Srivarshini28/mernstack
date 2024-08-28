import { useDispatch, useSelector } from "react-redux"

export default function Home(){
    const counterval = useSelector((state)=>state.counter);
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
            <h1>HOME</h1> 
            <h1>from Redux  {counterval}</h1>
            <input type="button" value="Add" onClick={add}/>
            <input type="button" value ="Sub" onClick={sub}/>
        </div>
    )
}