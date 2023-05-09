type Api={
    url:string,
    method:'post'|'get'
}
export const apiConfig={
    login:<Api>{
        url:'/user/login',
        method:'get'
    },
    homeList:<Api>{
        url:'/home/homeList',
        method:'get'
    },
    articleDetail:<Api>{
        url:'/article/articleDetail',
        method:'get'
    },
    goodList:<Api>{
        url:'/goods/goodsList',
        method:'get'
    },
    top10Category: {
        url: '/goods/top10Category',
        method: 'get',
    },
    messageList: {
        url: '/message/messageList',
        method: 'get',
    },
    unread: {
        url: '/message/unread',
        method: 'get',
    },
    accountInfo: {
        url: '/mine/accountInfo',
        method: 'get',
    },
    noteList: {
        url: '/mine/noteList',
        method: 'get',
    },
    collectionList: {
        url: '/mine/collectionList',
        method: 'get',
    },
    favorateList: {
        url: '/mine/favorateList',
        method: 'get',
    },
}