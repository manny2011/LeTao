var options = {
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: false, //是否显示滚动条
  deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
}

mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

$(".top-categoy").on('click', 'a', function (e) {
  e.preventDefault()
  $(this).parent().addClass('current').siblings().removeClass('current')
  var id = $('.top-categoy li.current').data('id')
  renderSecondContent(id)
})

$.ajax({
  url: '/category/queryTopCategory',
  type: 'get',
  dataType: 'json',
  success: function (data) {
    console.log(data);
    $('.top-categoy').html(template('tmpt-top-category', data))
    var id = $('.top-categoy li.current').data('id')
    console.log(id);
    renderSecondContent(id)
  },
  error: function (e) {
    console.log(e);
  }
})

function renderSecondContent(topId) {
  $.ajax({
    url: '/category/querySecondCategory',
    type: 'get',
    data: {
      id: topId,
    },
    dataType: 'json',
    success: function (data) {
      console.log(data);
      $('.lt-content').html(template('tmpt-second-category', data))
    },
    error: function (e) {
      console.log(e);
    }
  })
}
