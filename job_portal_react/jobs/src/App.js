import './App.css';
import { useRef} from 'react';
import { useState } from 'react';

function App() {
  const nameRef = useRef();
  const [joblist, setJobList] = useState([]);
  const [id, setid] = useState([]);
  const cnameRef = useRef();
  const rnameRef = useRef();
  const getData = async()=>{
            let res = await fetch("http://localhost:8899/display_job",{method:"GET"});
            let json = await res.json();
            console.log(json);
            setJobList(json);
  }
  const createJob = async()=>{
    let data = {
      "name":nameRef.current.value,
      "companyname":cnameRef.current.value,
      "requirement":rnameRef.current.value
    }
    let res = await fetch("http://localhost:8899/createjob",{method:"POST",body:JSON.stringify(data),headers:{"content-type":"application/json"}});
    let json = await res.json();
    console.log(json);
    getData();
  }

  const loadDataForUpdate = async(id)=>{
    let matchJob = await joblist.filter((j)=>id == j._id);
    console.log(matchJob);
    setid(id);
    nameRef.current.value = matchJob[0].name;
    cnameRef.current.value = matchJob[0].companyname;
    rnameRef.current.value = matchJob[0].requirement;
   }
   const updateJob = async()=>{
    let data = {
      "id":id,
      "name": nameRef.current.value,
      "companyname":cnameRef.current.value,
      "requirement":rnameRef.current.value
    }
    let res = await fetch("http://localhost:8899/updateJobsById",{method:"POST",body:JSON.stringify(data),headers:{"content-type":"application/json"}});
    // let json = await res.json();
    // console.log(json);
    getData();
  }


  const deleteJob = async(id)=>{
    let res = await fetch("http://localhost:8899/deleteJobsById?id="+id,{"method":"delete"})
    if(res.ok){
      alert("Job Deleted");
      getData();.
    }else{
      alert("Error while Deleting!!!");
    }
  }

 
    return (
    <div>
      <button onClick={getData}>Get Job List</button>
      <div>
      {
       joblist.map((obj,index)=>{
        return(
          <div key={index}>
          <h2 >{obj.name}: {obj.companyname} - {obj.requirement}</h2>
          <button onClick={()=> deleteJob(obj._id)}>DeleteData</button>
          <button onClick={()=> loadDataForUpdate(obj._id)}>Update</button>
          </div>
        )
        })
      }
</div>
      <h1>Create Form</h1>
      <div><input type="name" ref={nameRef} placeholder='Enter name'/></div>
      <div><input type="name" ref={cnameRef} placeholder='Enter company name'/></div>
      <div><input type="name" ref={rnameRef} placeholder='Enter requirement'/></div><br></br>
      <div><button onClick={createJob}>create job</button> </div>
      <div><button onClick={updateJob}>Update job</button> </div>
</div>
  );
}

export default App;