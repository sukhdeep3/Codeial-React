import { useEffect } from "react";
import { getPosts } from '../api'


function App() {

  useEffect(async()=>{

    const fetchPosts = async ()=>{
      const response = await getPosts();
      console.log('response', response);
    }
    
    fetchPosts();
  }, [])

  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
