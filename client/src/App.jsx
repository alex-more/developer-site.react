import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./routes/Home"
import BlogPage from "./routes/BlogPage"
import BlogPost from "./routes/BlogPost"
import Login from "./routes/Login"
import { BlogContextProvider } from './context/BlogContext'

const App = () => {
    return (
        <BlogContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/blog" component={BlogPage}/>
                    <Route exact path="/blog/:id" component={BlogPost}/>
                    <Route exact path="/login" component={Login}/>
                </Switch>
            </Router>
        </BlogContextProvider>
    );
}

export default App;