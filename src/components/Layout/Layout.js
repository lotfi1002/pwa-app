import React from "react"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

class Layout extends React.Component {
  render(){
    return (
      <>
      <div id="wrapper" >
        <Header />
        <main>{this.props.children}</main>
      </div>
        <Footer />
      </>
    )
  }
}

export default Layout;