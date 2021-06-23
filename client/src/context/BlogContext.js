import React, {useState, createContext} from "react";

export const BlogContext = createContext();

export const BlogContextProvider = props => {
    const [blogPosts, setBlogPosts] = useState([])


    return (
        <BlogContext.Provider value={{blogPosts, setBlogPosts}}>
            {props.children}
        </BlogContext.Provider>
    )
}