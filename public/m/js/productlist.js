var letao;
$(function () {
    letao = new Letao();
    letao.initPullRefresh();
    letao.searchProductList();
    letao.productSort();
    search = getQueryString('search');
    letao.getproductList({
        proName: search
    }, function (backData) {
        var html = template("productListTmp", backData);
        $('.content .mui-row').html(html);
    })
});

//Letao的构造函数
var Letao = function () {

}
var page = 1;
var search;
Letao.prototype = {
    //初始化下拉刷新
    initPullRefresh: function () {
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
                down: {
                    callback: function () {
                        setTimeout(function () {
                            letao.getproductList({
                                proName: search
                            }, function (backData) {
                                var html = template("productListTmp", backData);
                                $('.content .mui-row').html(html);
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                                //每次下拉刷新的时候要重置上拉加载更多
                                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                                // page当前页码也要重置为1
                                page = 1;
                            })
                        }, 1500)
                    }

                },
                up: {
                    contentnomore: '再下实在给不了更多...',
                    callback: function () {
                        setTimeout(function () {
                            letao.getproductList({
                                proName: search,
                                page: ++page
                            }, function (backData) {
                                var html = template("productListTmp", backData);
                                $('.content .mui-row').append(html);
                                if (backData.data.length > 0) {
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                                } else {
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                                }
                            })
                        }, 1500)
                    }
                }
            }
        });
    },
    //搜索商品列表
    searchProductList: function () {
        $('.search-form .btn-search').on('tap', function () {
            var search = $('.search-form .search').val();
            //console.log(search);
            letao.getproductList({
                proName: search
            }, function (backData) {
                var html = template("productListTmp", backData);
                $('.content .mui-row').html(html)
            })

        })
    },
    //公共函数-搜索商品
    getproductList: function (obj, callback) {
        $.ajax({
            url: '/product/queryProduct',
            data: {
                page: obj.page || 1,
                pageSize: obj.pageSize || 2,
                proName: obj.proName,
                num: obj.num,
                price: obj.price
            },
            success: function (backData) {
                console.log(backData);
                if (callback) {
                    callback(backData);
                }
            }
        })
    },
    //商品排序
    productSort: function () {
        $('.title .mui-row').on('tap', 'a', function () {
            var sortType = $(this).data('sort-type');
            var sort = $(this).data('sort');
            console.log(sortType);
            console.log(sort);
            if (sort == 1) {
                sort = 2
            } else {
                sort = 1
            }
            $(this).attr('data-sort', sort);
            if (sortType == "price") {
                letao.getproductList({
                    proName: search,
                    price: sort
                }, function (backData) {
                    var html = template('productListTmp', backData);
                    $('.content .mui-row').html(html);
                })
            } else if (sortType == 'num') {
                letao.getproductList({
                    proName: search,
                    num: sort
                }, function (backData) {
                    var html = template('productListTmp', backData);
                    $('.content .mui-row').html(html);
                })
            }
        })
    }
}
//获取url地址栏的参数的函数 网上找的  name就是url参数名
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}