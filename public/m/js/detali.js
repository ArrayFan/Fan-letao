var letao;
$(function () {
    letao = new Letao();
    letao.selectSize();
    var product = getQueryString('product');
    letao.getProductDetail(product)
    letao.addCart();
})

var Letao = function () {

}

Letao.prototype = {
    //初始化轮播图
    initSlide: function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    selectSize: function () {
        $('#product').on('tap', '.btn-size', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
    },
    getProductDetail: function (id) {
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id
            },
            success: function (backData) {
                console.log(backData);
                var start = backData.size.split('-')[0] - 0;
                var end = backData.size.split('-')[1] - 0;
                var arr = [];
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                };
                backData.size = arr;
                //渲染详情
                var html = template('productDetailTmp', backData);
                $('#product').html(html);
                mui('.mui-numbox').numbox();
                //渲染轮播图
                var slidehtml = template('productSlideTmp', backData);
                $('.mui-slider').html(slidehtml);
                letao.initSlide();
            }
        })
    },
    addCart: function () {
        $('.btn-add-cart').on('tap', function () {
            var size = $('.btn-size.active').data('size');
            if (!size) {
                mui.toast('请选择尺码', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }
            var num = mui('.mui-numbox').numbox().getValue();
            if (!num) {
                mui.toast('请选择数量', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }
        })
        mui.confirm('添加成功， 是否去购物车查看？', '温馨提示', ['是', '否'], function (e) {
            // 回调函数可以传递参数 e  e.index == 0 表示点击了左边的是 为1 表示点击了右边的否
            if (e.index == 0) {
                console.log('正在进入购物车');
            } else if (e.index == 1) {
                console.log('请继续选择尺码数量');
            }
        });
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