const Base = require('./base.js');

module.exports = class extends Base {
    openAction() {
      this.emit('open', '连接成功');
        //console.log('ws open');
        //this.broadcast('open', 'open2');//发送消息的格式{"event":"open","data":"open2"}  
      }
      closeAction() {
        this.broadcast('close', '连接关闭');
      }
      messageAction(){
        //const data = this.wsData.data;//将发送出去的数据返回
        this.wsData.data.time = think.datetime(new Date(), 'HH:mm:ss')
        this.broadcast('message', this.wsData.data);
      }
      onlineAction(){
        const id = this.wsData.data.id;
        this.broadcast('online',`游客${id}上线了`);//这里是系统广播上线
    
      }
      offlineAction(){
        const id = this.wsData.data.id;
        //userList = userList.filter(userId => userId !== id);
        this.broadcast('offline', `游客${id}下线了`);
      }
};