import React, {Component} from "react";
import HTMLContainer from "./HTMLContainer";
import keyBy from "lodash/fp/keyBy";
import map from "lodash/fp/map";
import stubTrue from "lodash/fp/stubTrue";
import cond from "lodash/fp/cond";
import isEqual from "lodash/fp/isEqual";

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

const SUB_TYPES = {
  'TEXT_INPUT' : 'TEXT_INPUT',
  'TEXT_AREA' : 'TEXT_AREA',
  'SELECT' : 'SELECT'
}

const editableParts = [
  {
    path:"card-title",
    subType: SUB_TYPES.TEXT_INPUT,
    label: "Card Title",
    value: "Card title"
  },
  {
    path: "card-text",
    subType: SUB_TYPES.TEXT_AREA,
    label: "Content",
    value: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
  },
  {
    path: "card-img",
    subType: SUB_TYPES.SELECT,
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

const GetTextInput = ({value, onChange}) => <input type="email" className="form-control" id="exampleFormControl" aria-describedby="emailHelp" defaultValue={value} onChange={onChange}  />
const GetTextArea = ({value, onChange}) =>  <textarea className="form-control" id="exampleFormControl" rows="3" defaultValue={value} onChange={onChange}  ></textarea>
const GetSelect = ({value, onChange, options}) =>  (<select className="form-control" id="exampleFormControl" defaultValue={value} onChange={onChange} >
                                                  {getOptionList(options)}
                                                </select>)

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
    const onChangeValue = (key) => (e)=> this.onChange(key, e.target.value)

    return(
      <div className="container">
        <div className="row">
          <div className="col-6">
            <HTMLContainer myHtmlString={getMyHtmlString(editableParts)} onSelect={this.onSelect} />
          </div>
          <div className="col-6">
            { !selected ? null :
              <form>
                <div className="form-group">
                  <label htmlFor="exampleFormControl">{selected.label}</label>
                  {
                    cond([
                      [isEqual(SUB_TYPES.TEXT_INPUT), ()=> <GetTextInput value={selected.value} onChange={onChangeValue("card-title")}  />],
                      [isEqual(SUB_TYPES.TEXT_AREA), ()=> <GetTextArea value={selected.value} onChange={onChangeValue("card-text")}  />],
                      [isEqual(SUB_TYPES.SELECT), ()=> <GetSelect value={selected.value} onChange={onChangeValue("card-img")} options={selected.options}  />],
                      [stubTrue, () => null]
                      ])(selected.subType)
                  }
                </div>
                <button type="button" className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
              </form>
            }
          </div>
        </div>
      </div>
    )
  }
}
