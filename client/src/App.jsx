import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./routes/Home"
import BlogPage from "./routes/BlogPage"
import BlogPost from "./routes/BlogPost"
import Login from "./routes/Login"
import AdminBlogEditor from './routes/AdminBlogEditor'
import AdminBlogPost from './routes/AdminBlogPost'
import AdminBlogNew from './routes/AdminBlogNew'
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
                    <Route exact path="/admin/blog" component={AdminBlogEditor}/>
                    <Route exact path="/admin/blog/new" component={AdminBlogNew}/>
                    <Route exact path="/admin/blog/:id" component={AdminBlogPost}/>
                </Switch>
            </Router>
        </BlogContextProvider>
    );
}

export default App;