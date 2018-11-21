import React,{Component} from 'react'
import config from '../config.json'
import {EtoX,idx,XtoE} from '../Adder';

class External extends Component{
    constructor(props){
        super();
        this.clickHandler=this.clickHandler.bind(this);
        this.blurHandler=this.blurHandler.bind(this);
    }
    componentDidMount(){
        console.log(config);
        document.documentElement.addEventListener('click',this.clickHandler,true);
        document.documentElement.addEventListener('blur',this.blurHandler,true);
    }
    componentWillUnmount(){
        document.documentElement.removeEventListener('click',this.clickHandler,true);
        document.documentElement.removeEventListener('blur',this.blurHandler,true);
    }
    clickHandler(e){
        // console.log(e.target);
        
        let namespace=`${window.location.href.replace(/(http|https):/g,'')}`;
        let curPageConfig=config[namespace];
        if(window.location.href.includes(namespace)){
            //只有处于白名单的链接才出发遍历

        }
        let end=e.path.map(i=>{
            //在此去掉//中一杠，方便includes判断
            let curNodePath=EtoX(i,true);
            return Object.keys(curPageConfig).filter(key=>{
                const {xpath=''}=curPageConfig[key];
                if(!!xpath){
                    let validPath=xpath.replace(/\/{2}/g,'/').match(/\/{1,2}[^\s\/]+/g)||[];
                    return validPath.every(i=>curNodePath.includes(i));
                }
                return false
            });
            //找出数组为true的每一项，触发其事件
        });
        end.filter(i=>Array.isArray(i)&&i.length>0).map(i=>i.map(j=>console.log(j)));
    }
    blurHandler(e){
        // console.log(e.target);
    }


    render(){
        return <i/>
    }
}

export default External;