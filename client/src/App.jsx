import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./routes/Home"
import BlogPage from "./routes/BlogPage"
import BlogPost from "./routes/BlogPost"
import AboutMe from "./routes/AboutMe"
import Login from "./routes/Login"
import AdminBlogEditor from './routes/AdminBlogEditor'
import AdminBlogPost from './routes/AdminBlogPost'
import AdminBlogNew from './routes/AdminBlogNew'
import Projects from './routes/Projects'
import { BlogContextProvider } from './context/BlogContext'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { indigo, grey, red } from '@material-ui/core/colors'

const App = () => {

    const theme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: red[500]
            },
            secondary: {
                main: indigo[500]
            },
            accent: {
                main: red[500]
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <BlogContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={AboutMe}/>
                        <Route exact path="/projects" component={Projects}/>
                        <Route exact path="/blog" component={BlogPage}/>
                        <Route exact path="/blog/:id" component={BlogPost}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/adminblog" component={AdminBlogEditor}/>
                        <Route exact path="/adminblog/new" component={AdminBlogNew}/>
                        <Route exact path="/adminblog/:id" component={AdminBlogPost}/>
                    </Switch>
                </Router>
            </BlogContextProvider>
        </ThemeProvider>
    );
}

export default App;
