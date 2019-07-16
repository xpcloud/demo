const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const user = this.model('tb1');
    const data = await user.select();
    return this.json(data);
  }

  async createAction(){
    const userName = this.post('user_name');
    const userTel = this.post('user_tel');
    const user = {user_name: userName, user_tel: userTel};

    const userId = await this.model('tb1').add(user);
    const newUser = await this.model('tb1').where({user_id: userId}).find();

    return this.json({newUser});
  }

  async updateAction(){
    const userId = this.post('user_id');
    const userName = this.post('user_name');
    const userTel = this.post('user_tel');
    const user = {user_name: userName, user_tel: userTel};

    await this.model('tb1').where({user_id: userId}).update(user);

    await this.indexAction();
  }

  async deleteAction(){
      const userName = this.post('user_name');
      await this.model('tb1').where({user_name:userName}).delete();

      await this.indexAction();
  }

  async findAction(){
    const userName = this.get('user_name');
    const data = await this.model('tb1').where({user_name: userName}).find();
    if(think.isEmpty(data)){
      //内容为空的处理
    }
    return this.json({data});
  }
};
