import React, { useContext, useRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import httpCall from '../call/httpCall';
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

export default function PostComponent({ label, onPress, param, url }) {
//const PostComponent = ({ label, onPress }) => {
  const { isLoading, error, sendRequest: sendData } = httpCall();
  const [posts, setPosts] = useState([]);
  const inputRef = useRef();
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  
  const createData = (text, data) => {
    const id = data.name;
    const newPost = { id, text };
    setPosts(prevPosts => prevPosts.concat(newPost));
  };
  
  const submitHandler = async (event) => {
    event.preventDefault();
    //console.log("param : " + {url});
    const text = inputRef.current.value;  
    const requestConfig = {
      url: {url},
      method: 'GET',
      data: { text },
      headers: { 
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*"
      }
    };
    const applyData = (data) => {
      createData(text, data);
    };
    sendData(requestConfig, applyData);
  }
  
  return (
      <TouchableOpacity
        onPress={submitHandler}
        ref={inputRef}
        style={{
          backgroundColor: activeColors.accent,
          padding: 20,
          borderRadius: 10,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 16,
            color: "#fff",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
      // <form onSubmit={submitHandler}>
      //   <input type='text' ref={inputRef} />
      //   <button type='submit'>등록</button>
      // </form>
	  // <List 
	  //   posts={posts} 
	  //   isLoading={isLoading} 
	  //   error={error} 
	  // />
  );
};

//export default PostComponent;