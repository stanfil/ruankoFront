import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import { Server } from '../setting'
import axios from 'axios'
import formatInterval from '../formatInterval'
import getLyrics from '../getLyrics'
import SimpleDialog from '../components/client/SimpleDialog'
const styles = theme => ({
    root: {
        position: 'relative',
        color: "#e3e3e3",
        height: "calc(100vh - 64px)",
        width: '100vw'
    },
    filter: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        filter: "blur(60px)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: '50%',
        opacity: .6,
        color: "#e1e1e1"
    },
    content: {
        "z-index": 3
    },
    playerFooter: {
        position: "absolute",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        bottom: 0,
        left:150,
        height: 104,
        color: 'white'
    },
    playerBtns: {
        width: 208,
        display: "flex",
        justifyContent: "space-around",
        paddingLeft: '40',
        color: 'white',

    },
    playerState: {
        display: "flex",
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20

    },
    playerStateTop: {
        display: 'flex',
        opacity: '.9',
        color: 'white'
    },
    playerStateBottom: {
        height: 10,
        display: 'flex',
        marginTop: '6px'
    },
    progressBar: {
        backgroundColor: "#e3e3e3",
        width: 970,
        height: 2,
        opacity: 0.7,
        display: 'flex',
        alignItems: 'center'
    },
    currentProgress: {
        backgroundColor: '#cbcbcb',
        height: 2,
    },
    extra: {
        width: 180,
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: 30,
        color: "white",
        marginLeft: 20
    },
    volWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    volBarWrapper: {
        marginLeft: 10,
        height: 10,
        display: 'flex',
        alignItems: 'center'
    },
    volBar:{
        backgroundColor: "#e3e3e3",
        width: 80,
        height: 2,
        display: 'flex',
        alignItems: 'center'
    },
    currentVol: {
        backgroundColor: '#cbcbcb',
        height: 2,

    },
    rightBoard: {
        position: 'absolute',
        width: 340,
        top:94,
        right: 150,
        height: 740,
        bottom: 124
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        fontSize: 14,
        lineHeight: "24px",
        color: 'white'
    },
    tableWrapper: {
        position: 'absolute',
        width:1100,
        marginLeft: 150,
        marginTop: 30,
        color: "#fff",
        opacity: '.7'
    },
    lyric: {
        lineHeight: "30px",
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: .7,
        paddingTop: "30px"
    }
})

class Player extends Component {
    constructor(props){
        super(props)
        this.state={
            currentSong: {
                mid: '',
                singers: []
            },
            currentIndex:0,
            playlist: this.props.playlist||[],
            currentTime: 0,
            curProgressBarWidth: 0,
            curVolBarWidth: "100%",
            mode: 'listloop',
            isPlaying: 'true',
            isMute: false,
            likebtn: false,
            createlists:[],
            isLogin: (sessionStorage.getItem("email"))?true:false,
            songs:[],
            lrclines:[],
            anchorEl: null,
            dialogOpen: false
        }
        this.openDialog=this.openDialog.bind(this)
        this.collectTo=this.collectTo.bind(this)
        this.toggleMute=this.toggleMute.bind(this)
        this.syncTime=this.syncTime.bind(this)
        this.ended=this.ended.bind(this)
        this.nextSong=this.nextSong.bind(this)
        this.lastSong=this.lastSong.bind(this)
        this.toPause=this.toPause.bind(this)
        this.toPlay=this.toPlay.bind(this)
        this.setCurTime=this.setCurTime.bind(this)
        this.setVol=this.setVol.bind(this)
        this.changeMode=this.changeMode.bind(this)
        this.toggleLike=this.toggleLike.bind(this)
        this.download=this.download.bind(this)
        this.playThis=this.playThis.bind(this)
    }
    componentWillMount(){
        const mid = this.props.playlist[0]
        axios.get(`${Server}/song/onesong?mid=${mid}`)
            .then( res => {
                const song = res.data
                this.setState({
                    currentSong: song,
                    // playlist: this.props.playlist
                },)
            })
        axios.post(`${Server}/list/playlist`,{
            playlist:this.props.playlist
        })
            .then(res=>{
                this.setState({
                    songs:res.data
                })
                console.log(res.data)
            })

    }
    openDialog(){
        if(!this.state.isLogin){
            alert("请先登录！")
            return
        }
        axios.get(`${Server}/user/getcreatelists?email=${sessionStorage.getItem('email')}`)
            .then(res=> {
                this.setState({
                    createlists: res.data,
                    dialogOpen: true
                })
            })

    }
    collectTo = _id => {
        this.setState({dialogOpen: false})
        if(!_id) return;
        axios.post(`${Server}/song/collect`,{
            mid: this.state.currentSong.mid,
            _id
        }).then(res=>{
            alert("收藏成功")
        })
    }

    toggleMute(){
        this.audio.muted = !this.audio.muted
        this.setState({isMute:!this.state.isMute})
    }
    toPlay() {
        this.audio.play()
        this.setState({isPlaying: true})
    }
    toPause() {
        this.audio.pause()
        this.setState({isPlaying: false})
    }
    syncTime(){
        const currentTime = this.audio.currentTime
        const interval = this.audio.duration
        let lrclines = getLyrics(currentTime, this.state.currentSong.lyric)
        this.setState({
            currentTime,
            curProgressBarWidth: `${currentTime/interval*100}%`,
            lrclines,
        })
    }
    ended(){
        if(this.state.mode==="singleloop"){
            this.audio.currentTime = 0
            this.syncTime()
            this.toPlay()
        }
        else {
            this.nextSong()
        }

    }
    lastSong(){
        let {mode,currentIndex, songs} = this.state
        if(mode==='shuffleplay'){
            currentIndex = Math.round(Math.random()*(songs.length))
            if(currentIndex===songs.length){
                currentIndex = 0
            }
        }else{
            currentIndex = (currentIndex!==0)?(currentIndex-1):(songs.length-1)
        }

        this.setState({
            currentIndex,
            currentSong: this.state.songs[currentIndex]
        })
    }
    nextSong(){
        let {mode,currentIndex, songs} = this.state
        if(mode==='shuffleplay'){
            currentIndex = Math.round(Math.random()*(songs.length))
            if(currentIndex===songs.length){
                currentIndex = 0
            }
        }else{
            currentIndex = (currentIndex!==(songs.length-1))?(currentIndex+1):0
        }
        this.setState({
            currentIndex,
            currentSong: this.state.songs[currentIndex]
        })
    }
    setCurTime(e){
        const distance = e.clientX - this.progressBar.getBoundingClientRect().left
        const percent = distance/this.progressBar.offsetWidth
        this.audio.currentTime = this.audio.duration * percent
        this.setState({
            curProgressBarWidth: `${100*percent}%`
        })
    }
    setVol = (e)=>{
        const distance = e.clientX - this.volBar.getBoundingClientRect().left
        const percent = distance / this.volBar.offsetWidth
        this.audio.volume = percent
        this.setState({
            curVolBarWidth: `${distance}px`
        })
    }
    changeMode = name => () => {
        this.setState({mode:name})
    }
    toggleLike(){
        if(!this.state.isLogin){
            alert("请先登录！")
            return
        }
        this.setState({
            likebtn: !this.state.likebtn
        })
    }
    download(){
        if(!this.state.isLogin){
            alert("请先登录！")
            return
        }
        const url = `${Server}/song/file?mid=${this.state.currentSong.mid}`
        axios.get(url,{
            responseType:'blob'
        }).then( res => {
            let blob = new Blob([res.data])
            let downloadElement = document.createElement('a')
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = `${this.state.currentSong.mid}.m4a`; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放blob对象
        })

    }
    playThis = (i)=>()=>{
        console.log("doubleclick",i)
        this.setState({
            currentSong: this.state.songs[i],
            currentIndex: i
        })
    }
    render(){
        const { classes } = this.props
        let {currentSong, songs, currentIndex,lrclines} = this.state
        songs = songs.map((song)=>{
            let m=parseInt(song.interval/60)
            let s=song.interval-m*60
            let interval = `${(m<10)?'0':''}${m}:${(s<10)?'0':''}${s}`
            let ret={
                ...song,
                singers: song.singers.join(' / '),
                interval
            }
            return ret
        })

        return (
            <div className={classes.root} >
                <div className={classes.filter}
                     style={{backgroundImage: `url(http://${this.state.currentSong.img_url})`}}>
                </div>
                <div className={classes.content}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{borderBottom:"1px solid #f3f3f324"}}></TableCell>
                                    <TableCell style={{borderBottom:"1px solid #f3f3f324"}}>歌曲</TableCell>
                                    <TableCell style={{borderBottom:"1px solid #f3f3f324"}}>歌手</TableCell>
                                    <TableCell style={{borderBottom:"1px solid #f3f3f324"}}>时长</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {songs.map((song, i) => {
                                    if(i===this.state.currentIndex){
                                        return (
                                            <TableRow key={i}
                                                      onDoubleClick={this.playThis(i)}
                                            >
                                                <TableCell style={{borderBottom:"1px solid #f3f3f324",color: "#06cc3c"}} >{i+1}</TableCell>
                                                <TableCell className={classes.tabletitle} style={{borderBottom:"1px solid #f3f3f324",color: "#06cc3c"}}>{`${song.title}`}</TableCell>
                                                <TableCell style={{borderBottom:"1px solid #f3f3f324",color: "#06cc3c"}} >{song.singers}</TableCell>
                                                <TableCell style={{borderBottom:"1px solid #f3f3f324",color: "#06cc3c"}} >{song.interval}</TableCell>
                                            </TableRow>
                                        );
                                    }
                                    return (
                                        <TableRow key={i}
                                                  onDoubleClick={this.playThis(i)}
                                        >
                                            <TableCell style={{borderBottom:"1px solid #f3f3f324"}} >{i+1}</TableCell>
                                            <TableCell style={{borderBottom:"1px solid #f3f3f324"}} className={classes.tabletitle}>{`${song.title}`}</TableCell>
                                            <TableCell style={{borderBottom:"1px solid #f3f3f324"}} >{song.singers}</TableCell>
                                            <TableCell style={{borderBottom:"1px solid #f3f3f324"}} >{song.interval}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <div className={classes.rightBoard}>
                        <a href={`#/song/${this.state.currentSong.mid}`} style={{textDecoration:"none"}} className={classes.info}>
                            <img style={{width: 186, marginBottom: 20}} src={`http://${currentSong.img_url}`} alt=""/>
                            <p style={{margin:0}}>{`歌曲名：${currentSong.title}`}</p>
                            <p style={{margin:0}}>{`歌手：${currentSong.singers.join(' / ')}`}</p>
                            <p style={{margin:0}}>{`专辑名：${currentSong.album}`}</p>
                        </a>
                        <div className={classes.lyric}>
                            {
                                lrclines.map((line, i)=>(
                                    (i!==3)?
                                        <p style={{margin:0,textAlign:'center', color: "#fff"}}>{line}</p>:
                                        <p style={{margin:0,textAlign:'center', color: "#06CC3C"}}>{line}</p>
                                ))
                            }
                        </div>
                    </div>
                    <footer style={{display: 'absolute'}} className={classes.playerFooter}>
                        <audio
                            src={`${Server}/song/file?mid=${currentSong.mid}`}
                            autoPlay
                            ref={node=>{this.audio=node}}
                            onTimeUpdate={this.syncTime}
                            onEnded={this.ended}
                        >您的浏览器不支持audio标签，无法播放音乐</audio>
                        <div className={classes.playerBtns}>
                            <span onClick={this.lastSong} style={{fontSize:30}} className="iconfont">&#xe603;</span>
                            {
                                this.state.isPlaying?
                                    <span onClick={this.toPause} style={{fontSize:30}} className="iconfont">&#xe619;</span> :
                                    <span onClick={this.toPlay} style={{fontSize:30}} className="iconfont">&#xe618;</span>

                            }
                            <span onClick={this.nextSong} style={{fontSize:30}} className="iconfont">&#xe602;</span>
                        </div>
                        <div className={classes.playerState}>
                            <div className={classes.playerStateTop}>
                                <span>{currentSong.title}</span>
                                <span>{` - `}</span>
                                <span style={{flexGrow: 1}}>{currentSong.singers.join(' / ')}</span>
                                <span>{formatInterval(this.state.currentTime)}{` / `}{formatInterval(currentSong.interval)}</span>
                            </div>
                            <div className={classes.playerStateBottom}
                                 ref={(node)=>{this.progressBar = node}}
                                 onClick={e=>{this.setCurTime(e)}}
                            >
                                <div className={classes.progressBar}>
                                    <div className={classes.currentProgress} style={{ width: `${this.state.curProgressBarWidth}`}}></div>
                                    <span style={{fontSize:10, color:'#fff', position: 'relative', left:-5, background:'none'}} className="iconfont">&#xe615;</span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.extra}>
                            {   //播放模式按钮
                                (this.state.mode==='listloop')?
                                    <span onClick={this.changeMode('shuffleplay')} style={{fontSize:32}} className="iconfont">&#xe66c;</span> :
                                    (
                                        (this.state.mode==='shuffleplay')?
                                            <span onClick={this.changeMode('singleloop')} style={{fontSize:32}} className="iconfont">&#xe66b;</span> :
                                            <span onClick={this.changeMode('listloop')} style={{fontSize:32}} className="iconfont">&#xe66d;</span>
                                    )
                            }
                            {   //喜欢按钮  功能待完善  缺少后台数据同步
                                (this.state.likebtn)?
                                    <span onClick={this.toggleLike} style={{fontSize:28, color: '#c35656'}} className="iconfont">&#xe63b;</span> :
                                    <span onClick={this.toggleLike} style={{fontSize:28}} className="iconfont">&#xe663;</span>
                            }
                            {/* 收藏 */}
                            <div style={{position: 'relative'}}>
                                <span
                                    onClick={this.openDialog}
                                    style={{fontSize:28}}
                                    className="iconfont"
                                >&#xe6d7;</span>
                                <SimpleDialog lists={this.state.createlists} open={this.state.dialogOpen} onClose={this.collectTo} />
                            </div>

                            {/* 下载 */}
                            <span onClick={this.download} style={{fontSize:28}} className="iconfont">&#xe823;</span>

                        </div>
                        <div className={classes.volWrapper}>
                            {
                                (this.state.isMute)?
                                    <span onClick={this.toggleMute} style={{fontSize:28}} className="iconfont">&#xe61e;</span>:
                                    <span onClick={this.toggleMute} style={{fontSize:28}} className="iconfont">&#xe87a;</span>
                            }
                            <div className={classes.volBarWrapper}
                                 onClick={this.setVol}
                                 ref={node=>{this.volBar = node}}
                            >
                                <div className={classes.volBar}>
                                    <div className={classes.currentVol} style={{ width: `${this.state.curVolBarWidth}`}}></div>
                                    <span style={{fontSize:10, color:'#fff', position: 'relative', left:-5, background:'none'}} className="iconfont">&#xe615;</span>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>


            </div>
        )
    }
}

Player.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Player)
