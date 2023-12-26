import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import './App.css'

function App() {
  // to render the movies list
  const [movieList, setMovieList] = useState([]);

  // here to upload the new movie data
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
   console.log(newMovieTitle,newReleaseDate, isNewMovieOscar)
  const movieCollectionRef = collection(db, "movies");
  useEffect(() => {
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
    getData();
  }, []);

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
        // onClick={onSubmitMovie}
        > Submit Movie</button>
      </div>
      <h2>Here is the Movies list</h2>
      {
        movieList.map((items) =>(
           <div style={{border: "2px dashed black"}} key={items.id}>
              <h3 style={{color: items.gotOscar ? "green": "red"}}>{items.title}</h3>
               <h4>{items.relDate}</h4>
               <h4>{items.gotOscar}</h4>
           </div>
        ))
      }
    </>
  );
}

export default App;
