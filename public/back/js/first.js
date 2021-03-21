$(function () {
  console.log('first.js');
  var page = 1
  var pageSize = 5

  getData(page, pageSize)

  $('#addForm').bootstrapValidator({
    message: 'This value is not valid',
    excluded: [':disabled'],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '分类名不能为空',
          },
          stringLength: {
            min: 2,
            max: 18,
            message: '分类名长度必须在6到18位之间',
          }
        }
      }
    }
  })
  $('#addForm').on('success.form.bv',function(e){
    // console.log('88');
    e.preventDefault()

    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      data: $('#addForm').serialize(),
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if(data.success){
          $('.addModal').modal('hide')
          $('#addForm').data('bootstrapValidator').resetForm(true)
          //refresh all data
          getData(page,pageSize)
        }
      },
      error: function (e) {
        console.log(e);
      }
    })

  })

  function getData(page, pageSize) {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        $('.first-category-table tbody').html(template('tmpt', data.rows))
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