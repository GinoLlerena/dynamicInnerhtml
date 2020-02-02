import React from "react";


function HTMLContainer(props)  {
  const {onSelect, myHtmlString} = props;

  function clickHandler(e) {
    onSelect(e.target.className);
  }

  function createMarkup(value){
    return ({ __html: value });
  }

  return (
    <div  onClick={clickHandler} dangerouslySetInnerHTML={createMarkup(myHtmlString)}/>
  );

}

export default HTMLContainer;
