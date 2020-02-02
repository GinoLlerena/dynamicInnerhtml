import React, {Component} from "react";
import HTMLContainer from "./HTMLContainer";
import keyBy from "lodash/fp/keyBy";
import map from "lodash/fp/map";

function getMyHtmlString(editableParts){

  return (
    `<div class="card mb-3 border" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src=${editableParts["card-img"].value} class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${editableParts["card-title"].value}</h5>
            <p class="card-text">${editableParts["card-text"].value}</p>
          </div>
        </div>
      </div>
    </div>`
  )
}

const editableParts = [
  {
    path:"card-title",
    subType: 1,
    label: "Card Title",
    value: "Card title"
  },
  {
    path: "card-text",
    subType: 2,
    label: "Content",
    value: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
  },
  {
    path: "card-img",
    subType: 3,
    label: "Select Image",
    value: "/assets/image01.jpg",
    options: [
      "/assets/image01.jpg",
      "/assets/image02.jpg",
      "/assets/image03.jpg"
    ]
  }
]

function getOptionList(options){
  const list = options && options.length ? map((item) => <option key={item} value={item}>{item}</option>)(options) : null;

  return list;
}

export default  class Container extends Component{

  constructor(props) {
    super(props);
    this.state = {
      editableParts: keyBy("path")(editableParts),
      selected: null
    }
  }

  onSelect = (path) => {
    const {editableParts} = this.state;
    if(editableParts[path]){
      this.setState({selected: editableParts[path]})
    }
  }

  onCancel = () => this.setState({selected:null})

  onChange = (key, value) => {
    const {state} = this;
    const {editableParts} = state;
    this.setState({editableParts : {...editableParts, [key]: {...editableParts[key], value}}})
  }

  render(){
    const {editableParts, selected} = this.state;

    return(
      <div className="container">
        <div className="row">
          <div className="col-6">
            <HTMLContainer myHtmlString={getMyHtmlString(editableParts)} onSelect={this.onSelect} />
          </div>
          <div className="col-6">
            { !selected ? null :
              <form>
                {selected.subType === 1 ? <div className="form-group">
                  <label htmlFor="exampleInputEmail1">{selected.label}</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={selected.value} onChange={(e)=> this.onChange("card-title", e.target.value)}  />
                </div> : selected.subType === 2 ?
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">{selected.label}</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={selected.value} onChange={(e)=> this.onChange("card-text", e.target.value)}></textarea>
                </div> : selected.subType === 3 ?
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">{selected.label}</label>
                      <select className="form-control" id="exampleFormControlSelect1" defaultValue={selected.value} onChange={(e)=>this.onChange("card-img", e.target.value)}>
                        {getOptionList(selected.options)}
                      </select>
                    </div> : null
                }
                <button type="button" className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
              </form>
            }
          </div>
        </div>
      </div>
    )
  }
}
