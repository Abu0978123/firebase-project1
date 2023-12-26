import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import './App.css'

function App() {
  // to render the movies list
  const [movieList, setMovieList] = useState([]);

  // here to upload the new movie data
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  
  // update the title 
  const [update, setUpdate] = useState();
  //  console.log(newMovieTitle,newReleaseDate, isNewMovieOscar)
  const movieCollectionRef = collection(db, "movies");
  
  // to render the movies list
  const getData = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filterData);
      setMovieList(filterData)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const onSubmitMovie = async (e) => {
    e.preventDefault()
    await addDoc(movieCollectionRef, 
      {
        title: newMovieTitle,
        relDate: newReleaseDate,
        gotOscar: isNewMovieOscar
      }
      ).then((res) => {getData() ,console.log(res, "data successfully added in firebase db")})
      .catch((err) => {console.log(err.message, "some error in uploading new record")})
  }

  // delete the records
  const deleteRecord = async(id) => {
      const delRecord =  doc(db, "movies", id)
      await deleteDoc(delRecord)
      .then((res)=> { getData(),console.log("record deleted ", res)})
      .catch((err) => {console.log("some error here", err)})
  }

  // update the record
  const updated = async(id) => {
    const delRecord =  doc(db, "movies", id)
    await updateDoc(delRecord, {title: update})
    .then((res)=> { getData(),console.log("record updated successfully ", res)})
    .catch((err) => {console.log("some error here", err)})
}


 
  return (
    <>
      <h1>Firebase Project 1</h1>
      <Auth />
      <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received an Oscar</label>
        <button 
        onClick={onSubmitMovie}
        > Submit Movie</button>
      </div>
      <h2>Here is the Movies list</h2>
      {
        movieList.map((items) =>(
           <div style={{border: "2px dashed black"}} key={items.id}>
              <h3 style={{color: items.gotOscar ? "green": "red"}}>{items.title}</h3>
               <h4>{items.relDate}</h4>
               <h4>{items.gotOscar}</h4>
               <button onClick={()=> deleteRecord(items.id)}>Delete Record</button>
               <input type="text" defaultValue={items.title} onChange={(e)=>setUpdate(e.target.value)}/>
               <button onClick={()=> updated(items.id)}>updated</button>
           </div>
        ))
      }
    </>
  );
}

export default App;
