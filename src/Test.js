import React, { Component, Fragment } from "react";
class Test extends Component {
  render(){
    return(
        <Fragment>
          {this.props.content}
        </Fragment>
    )
  }
}
