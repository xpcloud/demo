const Base = require('./base.js');

module.exports = class extends Base {
    openAction() {
        console.log('ws open');
        this.broadcast('open', 'open2');//发送消息的格式{"event":"open","data":"open2"}  
      }
      closeAction() {
        console.log('ws close');
        return this.success();
      }
      messageAction(){
        const data = this.wsData.data;//将发送出去的数据返回
        this.broadcast('message', data);
      }
};