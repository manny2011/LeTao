$(function () {
  var page = 1
  var pageSize = 5
  var id = null
  var idDelete = null

  getData(page, pageSize)

  $('tbody').on('click', '.btn', function () {
    // console.log('00');
    var parent = $(this).parent()
    id = parent.data('id')
    isDelete = parent.data('delete')
  })

  $('.btn-confirm').on('click', function () {
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      dataType: 'json',
      data: {
        id: id,
        isDelete: isDelete == 0 ? '0' : '1 ',
      },
      success:function(data) {
        console.log(data);
        $('.toggleModal').modal('hide')
      },
      error:function(err){
        console.log(err);
      }
    })
  })

  function getData(page, pageSize) {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        $('.user-table tbody').html(template('tmpt', data.rows))
        renderPages(Math.ceil(data.total / pageSize), page, pageSize)
      },
      error: function (e) {
        console.log(e);
      }
    })
  }

  function renderPages(pages, currentPage, pageSize) {
    $('.pages').bootstrapPaginator({
      bootstrapMajorVersion: 3,
      currentPage: currentPage,
      totalPages: pages,
      numberOfPages: pageSize,
      onPageClicked: function (event, originalEvent, type, page) {
        console.log(page);
        getData(page, pageSize)
      }

    })
  }
})