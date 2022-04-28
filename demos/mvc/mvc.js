/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-28 22:34:02
 * @LastEditors: your name
 * @Description: mvc模式模拟vue核心库视图绑定和更新渲染
 */

(function () {
  function init() {
    // 组织数据 + 数据监听操作/数据代理
    model.init();
    // 组织HTML模板 + 渲染HTML模板
    view.render();
    // 事件处理函数的定义与绑定
    controller.init();
  }
  const model = {
    data: {
      a: 0,
      b: 0,
      s: '+',
      r: 0,
    },
    init() {
      const _this = this;
      for (const k in _this.data) {
        (function (k) {
          Object.defineProperty(_this, k, {
            get() {
              // model.a -> get
              return _this.data[k];
            },
            set(newVal) {
              // model.a = 123 ->set
              _this.data[k] = newVal;
              console.log({ [k]: newVal });
              // 逻辑层操作视图 不科学
              view.render({ [k]: newVal });
            },
          });
        })(k);
      }
    },
  };

  const view = {
    el: '#app',
    template: `
    <p>
    <span class="cal-a">{{a}}</span>
    <span class="cal-s">{{s}}</span>
    <span class="cal-b">{{b}}</span>
    <span>=</span>
    <span class="cal-r">{{r}}</span>
    </p>
    <p>
    <input type="text" placeholder="Number a" class="cal-input a"/>
    <input type="text" placeholder="Number b" class="cal-input b"/>
    </p>
    <p>
    <button class="cal-btn">+</button> 
    <button class="cal-btn">-</button> 
    <button class="cal-btn">*</button> 
    <button class="cal-btn">/</button> 
    </p>
    `,

    render(mutedData) {
      if (!mutedData) {
        // 首次渲染
        this.template = this.template.replace(
          /\{\{(.*?)\}\}/g,
          // 当匹配执行后，该函数就会执行。 函数的返回值作为替换字符串。 --MDN
          function (node, key) {
            console.log(node, key);
            return model[key.trim()];
          }
        );
        // 把template渲染成dom 元素
        const container = document.createElement('div');
        container.innerHTML = this.template;
        document.querySelector(this.el).appendChild(container);
      } else {
        // 数据更新,只更改对应节点的textContent
        for (const k in mutedData) {
          console.log(document.querySelectorAll(`.cal-${k}`));
          document.querySelector(`.cal-${k}`).textContent = mutedData[k];
        }
      }
    },
  };

  const controller = {
    init() {
      const oCalInputs = document.querySelectorAll('.cal-input');
      const oCalBtns = document.querySelectorAll('.cal-btn');
      let inputItem = null;
      let btnItem = null;

      for (let i = 0; i < oCalInputs.length; i++) {
        inputItem = oCalInputs[i];
        inputItem.addEventListener('input', this.handleInput, false);
      }

      for (let i = 0; i < oCalBtns.length; i++) {
        btnItem = oCalBtns[i];
        btnItem.addEventListener('click', this.handleBtnClick, false);
      }
    },

    handleInput(e) {
      let tar = e.target;
      let value = Number(tar.value);
      let field = tar.className.split(' ')[1];
      // 这里数据被劫持 触发set render
      model[field] = value;
      // with (model) {
      //   r = eval('a' + s + 'b');
      // }
      model.r = eval('model.a' + model.s + 'model.b')
    },

    handleBtnClick(e) {
      const tar = e.target;
      const type = tar.textContent;
      // 这里数据被劫持 触发set render
      model.s = type;
      model.r = eval('model.a' + model.s + 'model.b')
    },
  };

  init();
})();


