## 环境
1. 需安装node
2. 启动zcash rpc服务
3. 配置./test/utils.js

       options.url

       options.headers.Authorization

### 写文件
1. cd ./test/
2. node 4.js  或 ./test.sh


### 格式化查询的block信息
1. 编辑uitls导出的formatBlock方法
2. node 5.js 测试

### 启动网页服务器
1. npm install 安装依赖
2. npm start

访问 localhost:3000/1
