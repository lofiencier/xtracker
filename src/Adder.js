const EtoX=(ele,withIndex)=>{
    const generator=(ele,)=>{
        let id='';
        if(withIndex){
            id=`[${idx(ele)}]`;
        }

        if(!ele||ele.nodeType!==1){
            return ['/']
        };
        let localName=ele.localName.toLowerCase();
        let path=`/${localName}`;
        // eslint-disable-next-line default-case
        if(['div'].includes(localName)){
            if(getId(ele)||getClass(ele))
                path=`/${localName}${getId(ele)||getClass(ele)}`
            else
                path='/'
        }
        if(['form'].includes(localName)){
            path=`/${localName}${getId(ele)||getClass(ele)}`;
        }
        if(['html','body'].includes(localName)){
            path='';
        }   
        if(['input'].includes(localName)){
            path=`//${localName}${getId(ele)||getClass(ele)}${getName(ele)}${getPlaceHolder(ele)}`;
        }
        if(['li'].includes(localName)){
            // path=`/${localName}[${idx(ele)}]`
            path=`/${localName}`
        }
        path=path=='/'||!path?path:path+id;
        return [...generator(ele.parentNode),path];
    }
    // return generator(ele).join('').replace(/\/{3}/g,'//');
    return generator(ele).filter(i=>!!i).join('').replace(/\/{3}/g,'//');
    
}

const getAttr=(ele,attr)=>!!ele[attr]?`[@${attr}='${ele[attr]}']`:'';
const getId=ele=>!!ele.id?`[@id='${ele.id}']`:'';
const getClass=ele=>{
    if(!ele.className) return '';
    let matchs=invalidClass(Array.from(ele.classList));
    if(matchs.length==0) return '';
    return `[contains(@class,'${matchs.join(' ')}')]`
}
const getPlaceHolder=ele=>!!ele.placeholder?`[contains(@placeholder,'${ele.placeholder}')]`:'';
const getName=ele=>!!ele.name?`[@name='${ele.name}']`:'';
const invalidClass=cls=>cls.filter(i=>(!i.includes('active'))&&i!='on'&&!/\d/g.test(i)&&i.length>3);

const idx = (sib, name) => sib ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name): 1;

const XtoE=(STR_XPATH)=>{
    try{
        var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    }catch(e){
        console.error('Invalid Xpath:',e);
        return [];
    }
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
      xnodes.push(xres);
    }
    return xnodes;
  }

export {
    EtoX,
    XtoE,
    idx
};