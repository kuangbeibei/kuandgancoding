import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Loading from "component/Loading"
import Header from "component/Header"
import Main from "component/Main"
import Sidemenu from "component/Sidemenu"
import NoMatch from "component/NoMatch"

import About from "pages/About"
import Blog from "pages/Blog"
import Home from "pages/Home"
import Articles from "pages/Articles"

import "style/font.css"
import "style/reset.css"
import "style/global.scss"


// let resizeTimer;
// let scrollTimer;

// let count = 0;

class App extends React.Component {

    state = {
        windowWidth: window.innerWidth,
        scrollTop: 0,
        sideMenuVisible: false,
        sideMenuActive: false,
        loadingVisible: true,
        loadingActive: true,
    }

    componentDidMount () {
        // 这个生命周期只有一次
        window.addEventListener("resize", this.onWindowResize);
        window.addEventListener('scroll', this.onWindowScroll);
        window.addEventListener('load', this.onWindowLoad)
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.onWindowResize);
        window.removeEventListener('scroll', this.onWindowScroll);
        window.removeEventListener('load', this.onWindowLoad);
    }

    onWindowResize = () => {
        // clearTimeout(resizeTimer);
        // resizeTimer = setTimeout(() => {
        //     this.setState({
        //         windowWidth: window.innerWidth
        //     })
        // }, 100)
        requestAnimationFrame(() => {
            this.setState({
                windowWidth: window.innerWidth
            })
        })
    }

    onWindowScroll = () => {
        // clearTimeout(scrollTimer);
        requestAnimationFrame(() => {
            this.setState({
                scrollTop: window.scrollY
            })
        })
        // scrollTimer = setTimeout(() => {
            
        // }, 10)
    }


    showSideMenu = () => {
        this.setState({
            sideMenuVisible: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    sideMenuActive: true
                })
                document.body.className = "overflow-hidden"
            }, 100)
        })
    }

    hideSideMenu = () => {
        this.setState({
            sideMenuActive: false,
        }, () => {
            setTimeout(() => {
                this.setState({
                    sideMenuVisible: false
                })
                document.body.className = ""
            }, 100)
        })
    }

    toggleSideMenu = () => {
        const {
            sideMenuVisible,
            sideMenuActive
        } = this.state;

        if (sideMenuVisible) {
            return (
                <Sidemenu 
                    sideMenuActive = {sideMenuActive} 
                    hideSideMenu = {this.hideSideMenu.bind(this)}
                />
            ) 
        } else return null
    }

    onWindowLoad = () => {
        setTimeout(() => {
            this.setState({
                loadingActive: false
            }, () => {
                setTimeout(() => {
                    this.setState({
                        loadingVisible: false
                    })
                }, 1000)
            })
        }, 500)
    }

    hideLoading = () => {
        const {
            loadingActive,
            loadingVisible
        } = this.state;

        if (loadingVisible) {
            return (
                <Loading 
                    loadingActive = {loadingActive}
                />
            )
        } else return null
    }


    render () {
        const {
            sideMenuActive,
            scrollTop,
        } = this.state;

        return (
            <>
                <Router>

                    <div className={`wrap-container ${sideMenuActive ? "side-move-show-menu" : ""}`}>
                        <Header 
                            {...this.state} 
                            showSideMenu = {this.showSideMenu.bind(this)}
                        />

                        <Switch>

                            <Route exact path="/" component={() => {
                                return (
                                    <Main 
                                        Component = {Home} 
                                        scrollTop = {scrollTop}
                                    />
                                )
                            }}/>

                            <Route path="/about" component={() => {
                                return (
                                    <Main 
                                        Component = {About} 
                                        scrollTop = {scrollTop}
                                    />
                                )
                            }}/>

                            <Route path="/blog" component={() => {
                                return (
                                    <Main
                                        Component = {Blog} 
                                        scrollTop = {scrollTop}
                                    />
                                )
                            }}/>

                            <Route path="/articles" component={({match, history}) => {
                                return (
                                    <Main 
                                        Component = {Articles}
                                        scrollTop = {scrollTop}
                                        match = {match}
                                        history = {history}
                                    />
                                )
                            }} />

                            <Route component={({history}) => {
                                return (
                                    <Main 
                                        Component = {NoMatch}
                                        history = {history}
                                    />
                                )
                            }} />
                            
                        </Switch>

                        
                    </div>

                    {/* 侧边栏 */}
                    {
                        this.toggleSideMenu()
                    }
                </Router>

                
                {/* loading */}
                {
                    this.hideLoading()
                }
                
            </>
        )
    }
}

export default App