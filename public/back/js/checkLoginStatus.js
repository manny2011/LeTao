$.ajax({
  url:'/employee/checkRootLogin',
  type:'get',
  dataType:'json',
  success:function(data){
    console.log(data);
    if(data.error){
      location.href = './login.html'
    }
  },
  error:function(e){
    console.log(e);
    location.href = './login.html'
  }
})