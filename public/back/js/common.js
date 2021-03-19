/**
 * Created by Jepson on 2018/4/6.
 */
$(function () {

  // 配置禁用小圆环
  NProgress.configure({ showSpinner: false });

  //// 开启进度条
  //NProgress.start();
  //
  //setTimeout(function() {
  //  // 关闭进度条
  //  NProgress.done();
  //}, 500)


  // ajaxStart 所有的 ajax 开始调用
  $(document).ajaxStart(function () {
    NProgress.start();
  });

  // ajaxStop 所有的 ajax 结束调用
  $(document).ajaxStop(function () {
    // 模拟网络延迟,实际给去掉
    setTimeout(function () {
      NProgress.done();
    }, 500)
  });

  $('.lt-category > a:first-child').on('click', function () {
    $('.category-item').stop().slideToggle()
  });

  $('.menu').on('click', function () {
    console.log('menu');
    $('.lt-left').toggleClass('hideLeft')
    $('.lt-main').toggleClass('hideLeft')
    $('.topbar').toggleClass('hideLeft')
  });

  $('.btn-logout').on('click', function () {
    $.ajax({
      url: '/employee/employeeLogout',
      type: 'get',
      dataType: 'json',
      success: function (data) {
        console.log(data);
        $('#myModal').modal('hide')
        location.href = './login.html'
      },
      error:function(e){
        console.log(e);
      }
    })
  })


})
