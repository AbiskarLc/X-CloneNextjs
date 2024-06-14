
"use client"
import { FaImage } from "react-icons/fa6";
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react';
import {getStorage, ref, uploadBytesResumable, getDownloadURL}  from 'firebase/storage'
import { app } from "@/firebase";
import {Timestamp, addDoc,collection,getFirestore,serverTimestamp}  from "firebase/firestore"
const HomePostComp = () => {
    const [file,setFile] = useState(null)
    const [input,setInput] = useState({
      description: "",
      postImageUrl : ""
    })
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const  [postLoading,setPostLoading] = useState(false)
    const [imageUploading,setImageUploading] = useState(false);
    const [imageUrl,setImageUrl] = useState(null);
    const { data:session } = useSession();
    const imagRef = useRef();
    const db = getFirestore(app);
    console.log(imageFileUrl)
    console.log(imageUrl)
    const uploadImage = async () =>{

      if(file){

        const selectedfile = file;
        setImageFileUrl(URL.createObjectURL(selectedfile));
    try {
     setImageUploading(true)

      const storage = getStorage(app);
      const filename = new Date().getTime()+ "-" + file.name;
      const storageRef = ref(storage,filename); 
      const uploadTask = uploadBytesResumable(storageRef,file);

      uploadTask.on('state_changed',(snapshot)=>{
             const progress = (snapshot.totalBytes / snapshot.bytesTransferred) * 100;
             console.log(`file upload completed ${progress}%`)
      },(error)=>{
        setImageUploading(false);
        setFile(null)
        console.log(`failed to upload image`, error)
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setImageUrl(downloadUrl)
          setImageUploading(false)
        })
      })
      
    } catch (error) {
      setImageUploading(false)
      setFile(null)
      console.log(error)
    }

    
  }
    }

    useEffect(()=>{
      if(file){
        uploadImage()
      }
    },[file])

    

    const handleSubmit = async (e) =>{

      e.preventDefault();
      try {
        setPostLoading(true)
      setInput({
        ...input,
        postImageUrl: imageUrl
      })

      const docRef = await addDoc(collection(db,'posts'),{
        uid: new Date().getTime(),
        username : session.user.name,
        email : session.user.email,
        desc: input.description,
        profileImg: session.user.image,
        postImage: imageUrl,
        timestamp: serverTimestamp()
      })
      setPostLoading(false)
      setFile(null)
      setImageUrl(null)
      setInput({
        description:"",
        postImageUrl: ""
      })

      console.log("Document written with ID: ", docRef.uid);
      } catch (error) {
        console.log(error)
      }
      if(!session) return null;
       
    }
  return (
    <>

    <div className=" flex justify-center items-center w-10 h-10 rounded-full border-[1.5px] border-gray-400">
    <img src={session && session.user.image} className=" w-[40px] h-[40px] rounded-full" alt="" width={70} />
  </div>
  <form className=' flex-1 flex flex-col gap-4 p-1' onSubmit={handleSubmit}>
    
       <textarea name="description" id="description" value={input.description} placeholder="What's on your mind?" onChange={(e)=> setInput({...input,description:e.target.value})} className=' w-full h-10 md:text-md text-sm p-1 focus:outline-none text-gray-700'></textarea>
       
       <hr className=' w-full border-[1px]'/>
       {
        file &&
        <img src={imageFileUrl || imageUrl} alt="image url" className={`w-full h-[250px] bg-cover object-fill rounded-xl ${imageUploading?"animate-pulse":""}`} />
       }
       <div className=" flex items-center justify-between px-1">
        <input type="file" ref={imagRef} className=' hidden' onChange={(e)=>  setFile(e.target.files[0]) }  />
        <FaImage className=" cursor-pointer text-blue-500 text-xl" onClick={()=> imagRef.current.click()}/>
        <button type="submit" disabled={input.description.trim() === '' || imageUploading || postLoading }  className=" cursor-pointer items-center w-16  sm:w-20 h-8 bg-blue-400 rounded-2xl text-white font-semibold text-sm hover:brightness-95 shadow-md" > Post</button>
        
       </div>
  </form>
  </>
  )
}

export default HomePostComp