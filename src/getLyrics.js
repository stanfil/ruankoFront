const translrc = (lrc) => {
    if(!lrc) return []
    let str = lrc.replace(/&#\d+?;/g,(a)=> {
        let ret = a.slice(2,a.length-1)
        ret = String.fromCharCode(ret)
        return ret
    })
    let arr = str.split('\n').slice(5)
    arr = arr.map(item=>({
        time: item.substr(1,8),
        content: item.substr(10)
    }))
    return arr
}
export default function getLyrics(curTime, lyric) {
    let sec = parseInt(String(curTime).split('.')[0])
    let msec = String(curTime).split('.')[1] || '00'
    console.log(curTime, sec, msec)
    let m=parseInt(sec/60)
    let s=sec-m*60
    sec = `${(m<10)?'0':''}${m}:${(s<10)?'0':''}${s}`
    const cur = `${sec}.${msec.substr(0,2)}`

    let lines = translrc(lyric)
    let index
    for(let i=0;i<lines.length;i++){
        if(cur<lines[i].time){
            index = i
            break
        }
    }
    let ret = []
    for(let i=index-3;i<index+5;i++){
        if(i<0||i>lines.length-1){
            ret.push(" ")
        }else{
            ret.push(lines[i].content)
        }

    }
    return ret
}