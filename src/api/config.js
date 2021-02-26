const address = "http://localhost:3000/";

const config = {
	address: address,
	api: {
        getLogo:address +"login/cellphone?phone=",//登录
		getbanner:address + "banner?type=1",//调用此接口 , 可获取 banner( 轮播图 ) 数据
		gettaydaymusic:address + "recommend/songs",//调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
		isPlay:address + "check/music?id=",//说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
        playUrl:address + "song/url?id=",//音乐播放地址
		getvideoList:address + "video/category/list",//,说明 : 调用此接口 , 可获取视频分类列表
		gettypemove:address + "video/group?id=",//调用此接口 , 传入标签/分类id,可获取到相关的视频,分页参数只能传入offset
		getMoveUrl:address + "video/url?id=",//说明 : 调用此接口 , 传入视频 id,可获取视频播放地址
		getgeshoutype:address + "artist/list?type=-1&area=7&initial=",//根据首字母获取歌手
		gethot:address + "artist/top/song?id=",//歌手热门歌曲50首
		getnewMv:address + "mv/first?limit=6",//调用此接口 , 可获取最新 mv limit: 取出数量 , 默认为 30
		getmVurl :address + "mv/url?id=",//获取MVURL
		getmVustart :address +	"mv/detail/info?mvid=",// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据
		getdjbanner :address +	"dj/banner",//说明 : 调用此接口,可获取电台banner
		gethotradio :address +	"dj/hot?limit=6",//说明 : 调用此接口,可获取热门电台
		getrecommend :address +	"dj/recommend?limit=6",//登陆后调用此接口 , 可获得电台类型
		getDetailradio :address +"dj/detail?rid=",//登陆后调用此接口 , 传入rid, 可获得对应电台的详情介绍
		getprogram :address +"dj/program?rid=",//: 登陆后调用此接口 , 传入rid, 可查看对应电台的电台节目以及对应的 id, 需要 注意的是这个接口返回的 mp3Url 已经无效 , 都为 null, 但是通过调用 /song/url 这 个接口 , 传入节目 id 仍然能获取到节目音频 , 如 /song/url?id=478446370 获取代 码时间的一个节目的音频
		getRoType :address +"dj/catelist",//: 电台分类
		getJMDetail :address +"dj/program/detail?id=",//:调用此接口传入电台节目id,可获得电台节目详情
		getJMDetail :address +"dj/program/detail?id=",//:调用此接口传入电台节目id,可获得电台节目详情
		getLbtype :address +"dj/category/recommend",//:列别热门tab分类
		geradioList :address +"dj/radio/hot?cateId=",//:电台 - 类别热门电台
		getMusic :address +"search?keywords=",//:调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
		getUserinfo :address +"user/detail?uid=",//说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户详情
	    getusernearSong:address +"user/record?type=0&uid=",//最近播放
        getblc: address +"lyric?id=",//获取歌词     
	    getmvDetail:address+"mv/url?id=",//获取 mv地址
        getMvpl:address+"comment/mv?id=",//获取 mv 评论
		getMvnums:address+"mv/detail/info?mvid=",//mv的评论点赞数量 
	}
};
export default config;
