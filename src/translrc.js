const main = (lrc) => {
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

module.exports = {
  getLrcArray: main
}
