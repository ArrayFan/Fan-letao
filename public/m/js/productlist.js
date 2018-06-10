$(function () {
    var letao = new Letao();
    letao.initPullRefresh();
});

//Letao的构造函数
var Letao = function () {

}

Letao.prototype = {
    //初始化下拉刷新
    initPullRefresh: function () {
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
                down: {
                    callback: function () {
                        setTimeout(function () {
                            // 延迟1.5秒结束下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        }, 1500)
                    }

                },
                up: {
                    contentnomore: '再下实在给不了更多...',
                    callback: function () {
                        setTimeout(function () {

                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }, 1500)
                    }
                }
            }
        });
    }

}