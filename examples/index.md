# Demo

---

## 使用

````html
<button id="mk-submit">点我提交啦</button>
````

````javascript
seajs.use(['jquery','index'],function($,Buttoner){
    var button = new Buttoner({
        target:'#mk-submit'
    });

    $('#mk-submit').click(function(e){
        e.preventDefault();
        button.show();
        setTimeout(function(){
            button.hide();
        },2000);
    });
});
````