import React, { Component } from 'react';
import './App.css';
import {EtoX,XtoE,idx} from './Adder'
import List from './components/List'
import axios from 'axios'
const instance=axios.create();
instance.defaults.headers={'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'};
class App extends Component {
  constructor(props){
    super();
    this.initail={
      nodes:[],
      regs:[],
      sum:0,
      curXpath:'',
      curNode:document,
      ePath:[document],
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
          nodes:regsBySort.map(i=>XtoE(i)),
          curNode:e.target,
          ePath:e.path
        });
        return false;
      }
  }
  onDelete(index){
    let regs=this.state.curXpath.match(/\/{1,2}[^\s\/]+/g);
    regs[index]='/';
    regs=regs.join('').match(/\/{1,2}[^\s\/]+/g);
    console.log(regs);
    let curXpath=regs.join('');
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
  addIndex(index){
    let regs=this.state.regs.reverse()[0].match(/\/{1,2}[^\s\/]+/g);
    console.log(this.state.nodes);
    const {ePath=[]} =this.state;
    let node=this.state.nodes[index].filter(i=>ePath.includes(i))[0];
    let idx=this.state.nodes[index].findIndex(i=>i==node);
    regs[index]=!/\[\d+\]/g.test(regs[index])?`${regs[index]}[${idx+1}]`:regs[index];
    console.log(regs);
    let curXpath=regs.join('');
    let regsBySort=regs.map((v,i)=>regs.slice(0,i+1).join(''));
    let nodes=XtoE(curXpath);
    this.setState({
      regs:regsBySort,
      curXpath,
      sum:nodes.length,
      nodes:regsBySort.map(i=>XtoE(i))
    });
  }
  onIndexChagne(index){
    console.log(this.state.nodes);
    this.setState({
      curXpath:this.state.regs[index],
      sum:XtoE(this.state.regs[index]).length
    })
  }
  reset(){
    this.setState(this.initail);
  }
  onSubmit(e){
    const {title={},eventName={},namespace={}}=e.target;
    // let data=new FormData(e.target);
    let data={namespace:"user"};
    console.log(data);
    instance.post('http://localhost:3001/add',{namespace:'>>>'}).then(res=>console.log(res));
  }
  render() {
    const {sum,regs,nodes,curXpath}=this.state;
    let reset=<a key="reset" href="javascript:void(0)" onClick={this.reset.bind(this)}>重置</a>
    return (
      <div>
        <List sum={sum}
          xpath={curXpath}
          nodes={nodes}
          regs={regs}
          addIndex={this.addIndex.bind(this)}
          onChange={this.onIndexChagne.bind(this)}
          onDelete={this.onDelete.bind(this)}>
          <Form {...this.state} onSubmit={this.onSubmit.bind(this)}>{reset}</Form>
        </List>
        <div id="sle">
          <p>p<span>span</span></p>
          <a href="#">a标签</a>
          <button>button</button>
          <div className="class001">
            <input type="text" name="xxx" placeholder="你在说什么？" id='id' className="className isjk active"/>
          </div>
        </div>
        <div id="sle">
          <div className="aisoso">
            <div className="isuasods">
              <ul>
                <li>121</li>
                <li>121</li>
                <li>121</li>
                <li>121</li>
                <li>121</li>
                <li>121</li>
                <li>121</li>
                <li>121</li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

const Form =(props)=>{
  return <form action="javascript:void(0)" onSubmit={props.onSubmit} className="tracker-form">
    <label htmlFor="title">title:</label>
    <input type="text" name="title"/>
    <br/>
    <input type="hidden" name="reffer" value={document.referrer}/>
    <br/>
    <label htmlFor="eventType">eventType:</label>
    <input type="checkbox" name="eventType" value="checked"/>
    <br/>
    <label htmlFor="eventName">Event(unique):</label>
    <input type="text" name="eventName"/>
    <br/>
    <label htmlFor="namespace">NameSpace</label>
    <input type="text" name="namespace"/>
    <br/>
    <input type="radio" name="timestamp" value="true"/>
    <label htmlFor="timestamp">timestamp</label>
    <br/>
    <input type="radio" name="master"/>
    <label htmlFor="master">区分master</label>
    <br/>
    <label htmlFor="cache">累积次数提交:</label>
    <input type="text" name="cache"/>
    <br/>
    <input type="text" name="xpath" disabled value={props.curXpath}/>
    <br/>
    {
      props.children&&props.children
    }
    <br/>
    <button type='submit'>submit</button>
  </form>
}


export default App;
