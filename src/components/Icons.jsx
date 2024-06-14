"use client";

import { app } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi";

const Icons = ({ id }) => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (session) {
      if (isLiked) {
        console.log("Hello")
        await deleteDoc(doc(db,'posts',id,'likes',session?.user.uid))
        setIsLiked(false)
      }else{
        
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
        setIsLiked(true);
      }
     
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    if (likes.length > 0) {
      setIsLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      );
    }
  }, [likes]);
  return (
    <div className=" flex p-2 text-gray-500 gap-2">
      <HiOutlineChat className=" w-8 h-8 transition duration-150 hover:text-sky-600 cursor-pointer ease-in hover:bg-gray-200 rounded-full p-1" />
      <div className=" flex items-center justify-center text-xs">
      {!isLiked ? (
        <HiOutlineHeart
          onClick={handleLike}
          className=" w-8 h-8 transition duration-150 hover:text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1"
        />
      ) : (
        <HiHeart   onClick={handleLike} className="w-8 h-8 transition duration-150 text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1" />
      )}
      {
        likes?.length > 0 &&  <span>{likes.length}</span>
      }

   </div>
      <HiOutlineTrash className=" w-8 h-8 transition duration-150 hover:text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1" />
    </div>
  );
};

export default Icons;
