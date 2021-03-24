$(function () {
  var currentPage = 1
  var pageSize = 2
  var picAddrs = []//最多保存三个
  getData()
  getSecondCategoryData()

  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      var addr = data.result
      console.log(addr)
      if (picAddrs.length == 3) {
        picAddrs.shift()
        console.log(picAddrs)
        $('.images-preview').children(':nth-child(2)').remove()//移除第一个子元素
      }
      picAddrs.push(addr)
      //<img>单标签 
      $('.images-preview').append("<img src='" + addr.picAddr + "' height='50'>")
      console.log(picAddrs);
      if(picAddrs.length == 3){//如果是3,说明满足条件了
        $('#add-product-form').data('bootstrapValidator').updateStatus('imageStatus','VALID')
      }
    }
  });

  $('#add-product-form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '不能为空'
          },
          //长度校验
          stringLength: {
            min: 1,
            max: 30,
            message: '长度必须在6到30之间'
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '由数字字母下划线和.组成'
          }
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 1,
            max: 30,
            message: '用户名长度必须在6到30之间'
          }

        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 1,
            max: 30,
            message: '用户名长度必须在6到30之间'
          }

        }
      }, 
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 1,
            max: 30,
            message: '用户名长度必须在6到30之间'
          }

        }
      }, 
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 1,
            max: 30,
            message: '用户名长度必须在6到30之间'
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '由数字字母下划线和.组成'
          }

        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 1,
            max: 30,
            message: '用户名长度必须在6到30之间'
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 1,
            max: 30,
            message: '用户名长度必须在6到30之间'
          }

        }
      },
      imageStatus:{
        validators:{
          //不能为空
          notEmpty: {
            message: '图片必须是3张'
          },
        }
      }
    }
  });

  $('#add-product-form').on('success.form.bv',function(){
    console.log('test');
    var data = $('#add-product-form').serialize()
    data = data + '&picArr=' + JSON.stringify(picAddrs)
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      dataType:'json',
      data:data,
      success:function(data){
        console.log(data);
        if(data.success){
          $('.add-product-modal').modal('hide')
          $('#add-product-form').data('bootstrapValidator').resetForm(true)
          $('.btn-toggle').text('请选择二级分类')
          $('.images-preview').children(':not(:first-child)').remove()//清空
          picAddrs = []
          getData()
        }
      },
      error:function(e){
        console.log(e);
      }
    })
  })

  function getData() {
    $.ajax({
      url: '/product/queryProductDetailList',
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
    $('#tb-product tbody').html(template('tmpt', data))
    $('.lt-pages .pages').bootstrapPaginator({
      bootstrapMajorVersion: 3,
      currentPage: currentPage,
      totalPages: Math.ceil(data.total / pageSize),
      // numberOfPages: 10,
      onPageClicked: function (event, originalEvent, type, page) {
        console.log(page)
        currentPage = page
        getData()
      }
    })
  }

  function getSecondCategoryData() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 1000,
      },
      success: function (data) {
        console.log(data);
        renderCategoryList(data)
      },
      error: function (err) {
        console.log(err);
      }
    })
  }

  function renderCategoryList(data) {
    $('.dropdown-menu').html(template('tmpt-category-list', data))
    $('.dropdown-menu').on('click', 'li', function (e) {
      var id = $(this).data('id')
      $('.btn-toggle').text($(this).children(':first-child').text())
      $('#iptCategory').val(id)
      $('#add-product-form').data('bootstrapValidator').updateStatus('brandId','VALID')
    })
  }
})