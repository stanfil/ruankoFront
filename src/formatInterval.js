export default function formatInterval(input) {
    let ret = Math.round(input)
    let m=parseInt(ret/60)
    let s=ret-m*60
    ret = `${(m<10)?'0':''}${m}:${(s<10)?'0':''}${s}`
    return ret
}