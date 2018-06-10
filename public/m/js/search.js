var letao;
$(function () {
    letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();
})

var Letao = function () {

};

Letao.prototype = {
    addHistory: function () {
        $('.btn-search').on('click', function () {

            var search = $('.search').val();
            if (!search.trim()) {
                alert('请输入有效内容')
                return;
            }

            //4.获取本地存储的shujv
            var arr = window.localStorage.getItem('searchData');
            var id = 0;
            //5.判断当前的arr是否有值
            if (arr && JSON.parse(arr).length > 0) {
                arr = JSON.parse(arr);
                id = arr[arr.length - 1].id + 1;
            } else {
                arr = [];
                id = 0;
            }
            //6.判断是否有重复的数据
            var flag = false;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].search == search) {
                    flag = true;
                }
            }
            //7.
            if (flag == false) {
                //8
                arr.push({
                    "search": search,
                    "id": id,
                });
            }
            //9.将arr转换成json格式存储在本地
            window.localStorage.setItem("searchData", JSON.stringify(arr));
            //10.重新获取数据;
            letao.queryHistory();
            //11.
             window.location.href = 'productlist.html';
        })
    },
    queryHistory: function () {
        //获取本地数据
        var arr = window.localStorage.getItem('searchData');
        //判断是否有值
        if (arr && JSON.parse(arr).length > 0) {
            arr = JSON.parse(arr);
        } else {
            arr = [];
        }
        //反向显示数据
        arr = arr.reverse();
        //调用模板
        var html = template("searchListTmp", {
            'rows': arr
        });
        $('.content').html(html);
    },

    deleteHistory:function () { 
        var that=this;
        $('.content').on('click', '.btn-delete', function () {
            var id=$(this).data('id');
            var arr = window.localStorage.getItem('searchData');
            var id = 0;
            //5.判断当前的arr是否有值
            if (arr && JSON.parse(arr).length > 0) {
                arr = JSON.parse(arr);
            } else {
                arr = [];
            }

            //遍历数组
            for(var i=0; i<arr.length;i++){
                if (arr[i].id==id) {
                    arr.splice(i,1)
                }
            }

            window.localStorage.setItem("searchData",JSON.stringify(arr));
            letao.queryHistory();
         })
     },
     clearHistory:function () { 
         $(".btn-clear").on('click',function () { 
             window.localStorage.setItem('searchData','');
             letao.queryHistory();
          })
      }      
}