var register_template = `
<div class="container">
  <br>
      <h1 class="display-3 text-warning"><center>K.X的博客</center></h1>
  <br>
  <div class="row">
    <div class="col-md-3">
    </div>
    <div class="container col-md-6" id="t3">
      <br>
      <h4 class="text-center">访客注册</h4><br>

          <div class="form-group">
              <label for="username"><b>用户名:</b></label>&nbsp;
              <input type="text" v-model="user.username" class="form-control" required="required" id="username">
              <label for="password"><b>密码:</b></label>&nbsp;
              <input type="password" v-model="user.password" class="form-control" required="required" id="password">
              <label for="nickname"><b>昵称:</b></label>&nbsp;
              <input type="text" v-model="user.nickname" class="form-control" required="required" id="nickname">
              <br>
              <label for="photo"><b>头像:</b></label>&nbsp;&nbsp;
              <img :src="url+user.photo" alt="John Doe" class="rounded-circle" style="width:40px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="file" @change="uploadFile($event)" id="photo">
              <br>
              <label for="autograph"><b>签名:</b></label>&nbsp;
              <input type="text" v-model="user.autograph" class="form-control" id="autograph">
              <label for="introduce"><b>个人介绍:</b></label>&nbsp;
              <textarea rows="5" v-model="user.introduce" class="form-control" id="introduce" style="resize:none">
              </textarea>
              <label for="email"><b>邮箱:</b></label>&nbsp;
              <input type="text" v-model="user.email" class="form-control" id="email" name="email">
          </div>
            <br>
          <div class="form-group">
              <button v-on:click="register_1" class="btn btn-primary btn-block">注册</button>
          </div>
    </div>
    <div class="col-md-3">
    </div>
  </div>
</div>
  `
const register = {
  data() {
    return {
      user: {username: '', password: '', nickname: '', photo: 'upload/moren.jpg', autograph: '', introduce: '', email: ''},
      url: store.state.url,
    }
  },
  methods: {
    uploadFile(event) {
        var file = event.target.files[0]; //获取input的图片file值
        var formData = new FormData();     // 创建form对象
        formData.append('myfile', file);     //对应后台接收图片名
  
        axios.post(this.url + 'file', formData)
          .then(response => this.user.photo = response.data)
          .catch(error => console.log(error));// 请求失败处理
      },
    register_1() {
      //console.log(this.article);
      if (this.user.username == '' || this.user.password == '') {
        alert("用户名或密码不能为空!");
        return;
      }
      if (this.user.nickname == '' || this.user.photo == '') {
        alert("昵称或头像不能为空!");
        return;
      }
      axios.post(this.url+'username/'+this.user.username)
            .then(response => {
                if(response.data){
                    axios.post(this.url+'register',this.user)
                            .then(response => {
                                var temps = response.data;
                                if (temps.status == 'success') {
                                    alert("注册成功");
                                    router.push({
                                        path: '/'
                                    })
                                }
                            })

                }else{
                    alert("用户名已存在！");
                    return;
                }
            })
            .catch(error => console.log(error));
      
    },
  },
  template: register_template
}
