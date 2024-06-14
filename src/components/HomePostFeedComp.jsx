
import { collection, getFirestore,getDocs,orderBy,query, doc } from "firebase/firestore";
import { app } from "@/firebase";
import Post from "./Post";

const HomePostFeedComp =async () => {

  const db = getFirestore(app);
  const q = query(collection(db,'posts'),orderBy('timestamp','desc'));
  const querySnapShot = await getDocs(q) 
  const data = []
  querySnapShot.forEach((doc)=>{
    data.push({id:doc.id,...doc.data()})
  })

  
  return (
     <div className="flex flex-col gap-2 overflow-y-auto h-screen pb-8 scrollbar-hide">
      {
        data.map((post,index)=>{
          console.log(post)
          return  <Post key={index} post={post}/>
        })
      }
       
    </div>
  )
}

export default HomePostFeedComp