import React, { Component } from 'react';
import './App.css';
import {EtoX,XtoE} from './Adder'
import List from './components/List'
class App extends Component {
  constructor(props){
    super();
    this.initail={
      nodes:[],
      regs:[],
      sum:0,
      curXpath:'',
    }
    this.state=this.initail;
    this.clickHandler=this.clickHandler.bind(this);
  }

  componentDidMount(){
    document.addEventListener('click',this.clickHandler);
  }
  clickHandler(e){
      let xpath=EtoX(e.target);
      let regs=xpath.match(/\/{1,2}[^\s\/]+/g);
      let regsBySort=[];
      if(!!regs&&regs.length>1){
        regsBySort=regs.map((v,i)=>regs.slice(0,i+1).join(''));
      }
      if(!xpath.includes('tracker')){
        e.preventDefault();
        this.setState({
          sum:XtoE(xpath).length,
          curXpath:xpath,
          regs:regsBySort,
          nodes:regsBySort.map(i=>XtoE(i))
        });
        return false;
      }
  }
  onDelete(index){
    let regs=this.state.curXpath.match(/\/{1,2}[^\s\/]+/g).filter((v,i)=>i!=index);
    console.log(regs);
    let curXpath=regs.join('');
    console.log(curXpath);
    let regsBySort=[];
    if(!!regs&&regs.length>1){
      regsBySort=regs.map((v,i)=>regs.slice(0,i+1).join(''));
    }else{
      regsBySort=regs;
    }
    let nodes=XtoE(curXpath);
    this.setState({
      regs:regsBySort,
      curXpath,
      sum:nodes.length,
      nodes:regsBySort.map(i=>XtoE(i))
    })
  }
  onIndexChagne(index){
    this.setState({curXpath:this.state.regs[index],sum:XtoE(this.state.regs[index]).length})
  }
  reset(){
    this.setState(this.initail);
  }
  render() {
    const {sum,regs,nodes,curXpath}=this.state;
    let reset=<a key="reset" href="javascript:void(0)" onClick={this.reset.bind(this)}>重置</a>
    return (
      <div>
        <List sum={sum} xpath={curXpath} nodes={nodes} regs={regs} onChange={this.onIndexChagne.bind(this)} onDelete={this.onDelete.bind(this)}>
          <Form>{reset}</Form>
        </List>
        <div id="sle">
          <p>p<span>span</span></p>
          <a href="#">a标签</a>
          <button>button</button>
          <div className="class001">
            <input type="text" name="xxx" placeholder="你在说什么？" id='id' className="className isjk active"/>
          </div>
        </div>
        <div id="sle"></div>
      </div>
    );
  }
}

const Form =(props)=>{
  return <form action="javascript:void(0)" onSubmit={props.onSubmit}>
    <p>currentPath:</p>
    <label htmlFor="event">Event:</label>
    <input type="text" name="event"/>
    <br/>
    <label htmlFor="namespace">NameSpace</label>
    <input type="text" name="namespace"/>
    <br/>
    <input type="radio" name="timestamp" value="true"/>
    <label htmlFor="timestamp">timestamp</label>
    <br/>
    {
      props.children&&props.children
    }
    <br/>
    <button type='submit'>submit</button>
  </form>
}


export default App;
