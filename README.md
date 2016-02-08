# AJAX-Simple-Tools-Library
---
###介绍

这是一个简单的AJAX工具包，只需要传如几个简单的参数即可完成常用的AJAX数据交换任务。

###开发背景
在平时的开发中，ajax的使用频率较多，所以将常用的代码封装起来，以便将来复用。**为了考虑到最大的兼容性，未使用XMLHttpRequest 2.0的新特性**，超时方法采用的不是2.0原生方法，而是timeout定时器去判断。该库是自己学习使用，会在未来不断完善升级它。

###使用方法
在html中引入工具库，将工具库放在使用ajax代码的前面（依赖关系）。
```html
<script src="ajax.js"></script>
```

在全局中有一个Ajax对象，无需创建新的对象，直接使用。对象中有一个request方法，只需要调用该方法传入参数即可发送ajax请求。一共两个参数，第一个为url，第二个为opt选项。
```javascript
Ajax.request(url, opt);
```
**url参数使用方法：**
url为请求的地址，需保证同源策略。

**opt参数使用方法：**

- methed ： 请求方式, 默认为get。
- data ： 数据发送额外数据, 默认为空。
- asyn ： 是否以异步方式发送请求, 默认为true。
- timeout ： 设置请求超时时间,单位为毫秒, 默认为0, 不超时。
- success ： 请求成功后调用该方法, 默认为空function。
- failure ： 请求失败后调用该方法, 默认为空function。

data数据可以是字符串，也可以是对象。
```javascript
var data = 'name=Riny&email=exmple@gmail.com&age=16';

var data= {
    name: 'Riny',
    email: 'exmple@gmail.com',
    age: '16'
}
```
实例：
```
Ajax.request(www.server.com/index.php, {
    success: function (xhr) {
        //to do with xhr
    },
    failure: function (xhr) {
        //to do with xhr
    }
});
```

一个完整的实例：
```
Ajax.request(www.server.com/index.php, {
    method: 'GET',
    data: 'name=ajax&age=16',
    timeout: '5000',
    asyn: true,
    success: function (xhr) {
        //to do with xhr
    },
    failure: function (xhr) {
        //to do with xhr
    }
});
```