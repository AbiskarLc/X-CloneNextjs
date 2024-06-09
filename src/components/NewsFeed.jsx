"use client"
import React, { useEffect, useState } from 'react'

const NewsFeed = () => {

    
    const [news,setNews] = useState([])
    const [articlenum,setArticleNum] = useState(3);

    const fetchNewsData = async () =>{

        try {
            
            const response = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/business/in.json`)

            if(response.ok){
                const apidata = await response.json()
                setNews(apidata.articles);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
  
    fetchNewsData()
    },[])
  return (
    <div className=' flex flex-col items-start bg-gray-200 px-3 rounded-2xl space-y-3 pt-3'>
        <h4 className=' font-bold text-xl'>Whats happening?</h4>
        {
            news.slice(0, articlenum).map((article,index)=>{

                return <div key={article.url}>
                    <a href={article.url} target='_blank'></a>
                    <div className=' flex items-center gap-2 hover:bg-gray-400 p-2 rounded-xl cursor-pointer transition duration-100'>
                        <div className=' flex flex-col gap-1 text-start'>
                        <h6 className=' text-[14px] font-bold'>{article.title}</h6>
                        <p className=' text-[12px] text-blue-600'>{article.source.name}</p>
                        </div>
                        <img src={article.urlToImage} width={70} className=' rounded-xl' alt={`article `} srcSet="" />
                    </div>

                </div>

            })
        }
        <button className=' w-full border-2 hover:bg-gray-400 py-2 rounded-xl text-gray-800' onClick={()=> setArticleNum(articlenum+3)}>Show More</button>
    </div>
  )
} 

export default NewsFeed