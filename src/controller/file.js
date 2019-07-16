const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs); // 通过 promisify 方法把 rename 方法包装成 Promise 接口
module.exports = class extends think.Controller {
  async uploadAction(){
    const file = this.file('image');
    // 如果上传的是 png 格式的图片文件，则移动到其他目录
    if (file) {
      const filepath = path.join(think.ROOT_PATH, `www/static/upload/${file.name}`);
      think.mkdir(path.dirname(filepath));
      await rename(file.path, filepath);
    }
  }

  async downloadAction(){
    const filepath = path.join(think.ROOT_PATH, 'recommend.png');
    ctx.download(filepath);
  }
};