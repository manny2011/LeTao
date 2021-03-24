$(function () {
  var currentPage = 1
  var pageSize = 2
  getData()
  getTopCategories()

  $('.dropdown-menu').on('click', 'a', function (e) {
    e.preventDefault()
    console.log('id=' + $(this).parent().data('id'));
    $('#dropdownMenu1').text($(this).text())
    $('#iptCategoryId').val($(this).parent().data('id'))
    $("#add-modal-form").data('bootstrapValidator').updateStatus('categoryId', 'VALID')
  })

  $("#iptFile").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      var addr = data.result.picAddr
      if (addr) {
        $('#img-preview').attr('src', addr)
        $('#brandLogo').val(addr)
        $("#add-modal-form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID')

      }
    }
  });
  $('#add-modal-form').bootstrapValidator({
    message: 'This value is not valid',
    excluded: [],//这样可以校验隐藏域 input:hidden
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
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
      },
      'brandLogo': {
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
      },
      brandName: {
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

  $("#add-modal-form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    // console.log('submit');
    $.ajax({
      url: '/category/addSecondCategory',
      type: 'post',
      dataType: 'json',
      data: $('#add-modal-form').serialize(),
      success: function (data) {
        console.log(data);
        if (data.success) {
          $('.dropdown-toggle').text('请选择一级分类')
          $('.addModal').modal('hide')
          //重置表单，并且会隐藏所有的错误提示和图标 , true表示清除内容
          $('#add-modal-form').data('bootstrapValidator').resetForm(true)//重置表单，并且会隐藏所有的错误提示和图标
          $('#img-preview').attr('src', './images/default.png')
          getData()
        }
      },
      error: function (e) {
        console.log(e);
      }
    })
  });

  function getTopCategories() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: '1000',
      },
      success: function (data) {
        console.log(data);
        renderTopCategories(data)
      },
      error: function (err) {
        console.log(err);
      }
    })
  }

  function getData() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (data) {
        console.log(data);
        render(data)
      },
      error: function (err) {
        console.log(err);
      }
    })
  }

  function render(data) {
    $('.tb-content tbody').html(template('tmpt', data))
    $('.lt-pages .pages').bootstrapPaginator({
      bootstrapMajorVersion: 3,
      currentPage: currentPage,
      totalPages: Math.ceil(data.total / pageSize),
      numberOfPages: pageSize,
      onPageClicked: function (event, originalEvent, type, page) {
        console.log(page);
        currentPage = page
        getData()
      }
    })
  }

  function renderTopCategories(data) {
    $('.dropdown-menu').html(template('tmpt-category', data))

  }
})