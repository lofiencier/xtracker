/addEvent
/removeEvent
/eventlist?nameSpace=''
/


{
    title:'',           //事件名
    eventName:'',       //unique
    xpath:'',
    nameSpace:'',       //
    eventType:'',       //onclick,onblur
    reffer:'',          //是否带上来源网站
    account:'',         //是否带上登录信息?
    timestamp:'',       //时间戳
    ip:'',              //唯一标识
    indexs:[]           //做区分的indexs
    cache:number        //是否叠加
}

{
    nameSpace:{
        eventName:{
            title:'',
            xpath:'',
            reffer:'',
            account:'',
            timestamp:'',
            ip:'',
            indexs:[],
            cache:''
        }
    }
}