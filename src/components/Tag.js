import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Tag = () => {

    const [gif, setGif] = useState("");
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState("car");
    
    async function fetchData(){
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
        const {data} = await axios.get(url);//-> axios returns a promise
        const imageSource = data.data.images.downsized_large.url;
        setGif(imageSource);
        setLoading(false);
    }

    useEffect( () => {
        fetchData();
    },[])


  return (
    <div className='w-1/2 bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>

        <h1 className='mt-[15px] text-2xl underline uppercase font-bold'>Random {tag} Gif</h1>

        {
            loading ? (<Spinner></Spinner>) : (<img src={gif} width="450"/>) 
        }

        <input 
          type="text" 
          onChange={(event) => setTag(event.target.value)}
          className='w-10/12 text-lg py-2 rounded-lg mb-[2px] text-center'
          value={tag}
        />

        <button onClick={() => fetchData()} className='w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px]'>
            Generate
        </button>
      
    </div>
  )
}

export default Tag

