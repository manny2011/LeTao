$(function () {
  $('#login-form').bootstrapValidator({
    // 默认的提示消息
    message: 'This value is not valid',
    // 表单框里右侧的icon
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      username: {
        message: '用户名验证失败',
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {  //长度限制
            min: 2,
            max: 18,
            message: '用户名长度必须在6到18位之间'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          },
          userNameIncorrect: {
            message: '用户名不正确'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 6,
            message: '密码长度必须是6位'
          },
          pwdIncorrect: {
            message: '密码不正确'
          }
        }
      }
    }
  });
  $('.btn-reset').click(function () {
    //重置表单，并且会隐藏所有的错误提示和图标
    $('#login-form').data('bootstrapValidator').resetForm();
  })
  $('#login-form').on('success.form.bv', function (e) {
    e.preventDefault();
    // console.log('校验通过，ajax后台验证！');
    $.ajax({
      url: '/employee/employeeLogin',
      type: 'post',
      data: $('#login-form').serialize(),
      dataType: 'json',
      success: function (data) {//处理后的数据json
        // console.log(data);
        if (data.success) {
          console.log('登陆成功！');
          location.href = './index.html'
        } else if (data.error == 1000) {
          console.log('用户名不存在');
          $('#login-form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'userNameIncorrect')
        } else if (data.error == 1001) {
          console.log('密码不正确');
          $('#login-form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'pwdIncorrect')
        }
      },
      error: function (e) {
        console.log(e);
      }

    })
  })
})