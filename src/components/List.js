import React,{Component } from 'react'
import {XtoE} from '../Adder'

export default class List extends Component{
    onClick(index){
        this.props.onChange&&this.props.onChange(index);
    }
    componentWillReceiveProps(nextProps){
        let next=nextProps.nodes;
        let nextPath=nextProps.xpath;
        let prev=this.props.nodes;
        let prevPath=this.props.xpath;
        if(next!==prev||nextPath!==prevPath){
            prev.map(i=>i.map(v=>{
                v.removeAttribute('data-sequence');
                v.className=v.className.replace(/\s*track-sequence-active\s*/g,'');
            }));
        }
    }
    delRule(index){
        this.props.onDelete(index);
    }
    render(){
        const {sum=0,xpath='',nodes=[],regs=[],children}=this.props;
        let activeIndex=regs.findIndex(i=>i.includes(xpath));
        !!nodes[activeIndex]&&nodes[activeIndex].map((v,i)=>{
            v.setAttribute('data-sequence',i+1);
            v.className=`${v.className} track-sequence-active`
        });
        return <div className="tracker-root">
            <h2>当前匹配数:{sum}</h2>
            <span>当前xpath:{xpath}</span>
            <br/>
            {
                nodes.map((v,i)=><div className={activeIndex==i?"tracker-dom-action active":'tracker-dom-action'} key={i}>
                    <a href="javascript:void(0)" onClick={this.onClick.bind(this,i)}>{regs[i].match(/\/{1,2}[^\s\/]+/g)[i]}</a>
                    {/* <a className="btns" href="javascript:void(0)">确定</a> */}
                    <a className="btns" href="javascript:void(0)" onClick={this.delRule.bind(this,i)}>删除</a>
                </div>)
            }
            <div className="tracker-action">
            {
                children
            }
            </div>
        </div>
    }
}