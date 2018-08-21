import React from 'react'
import {Route, Switch} from "react-router-dom";
import Project from "./Project";
import Header from './Header'
import Footer from "./Footer";
import ProjectsProvider from "./ProjectsProvider";
import Main from "./Main";
import Placeholder from "./Placeholder";
import {SidebarContext} from "./Contexts";
import Projects from "./Projects";
import AuthProvider from "./AuthProvider";



class Index extends React.Component {
    componentWillMount() {
        //this.props.router.replace('/t')
    }

    /*
    * 路由：
    * 首页测试包列表    /
    * 测试包首页   /project/:project
    * 目录页       /project/:project/:dir
    * */
    render() {
        return <Placeholder>
            <AuthProvider>
                <Header/>
                <Main>
                    <SidebarContext>
                        <ProjectsProvider>
                            <Switch>
                                <Route path="/:project" component={Project}/>
                                <Route path="/" component={Projects}/>
                            </Switch>
                        </ProjectsProvider>
                    </SidebarContext>
                </Main>
                <Footer/>
            </AuthProvider>
        </Placeholder>
    }
}

export default Index