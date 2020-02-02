import React, {Component} from "react";


class HTMLContainer extends Component {

  setRef = r => this.myRef = r

  clickHandler = (e) => {
    const {onSelect} = this.props;

    onSelect(e.target.className);

    console.log(e.target.className)

    /*if(this.myRef){
      console.log(this.myRef.innerHTML)
    }*/
  }

  createMarkup = value => {
    return { __html: value };
  }

  render() {
    const {myHtmlString} = this.props;
    return (
      <div ref={this.setRef} onClick={this.clickHandler} dangerouslySetInnerHTML={this.createMarkup(myHtmlString)}/>
    );
  }
}

export default HTMLContainer;
