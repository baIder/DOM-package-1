window.dom = {
  create(string) {
    //创建新元素
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },

  after(node, node2) {
    //在node后插入node2
    console.log(node.nextSibling);
    node.parentNode.insertBefore(node2, node.nextSibling);
  },

  before(node, node2) {
    //在node前插入node2
    node.parentNode.insertBefore(node2, node);
  },

  append(parent, node) {
    //将node插入parent中
    parent.appendChild(node);
  },

  wrap(node, parent) {
    //将node用parent包裹
    dom.before(node, parent);
    //在node前加入parent节点
    dom.append(parent, node);
    //将node转移到parent下
  },

  remove(node) {
    //删除node节点
    node.parentNode.removeChild(node);
    return node;
  },

  empty(node) {
    //清空node节点
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },

  attr(node, name, value) {
    //重载
    //在node中添加一个值为value的name属性
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  text(node, string) {
    //适配
    //更改node的文本内容
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  html(node, string) {
    //更改node的html内容
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },

  style(node, name, value) {
    //更改node的css
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      //dom.style(div,'color')
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{border:'1px solid red'})
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },

  class: {
    //增减类
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },

  //监听事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  //查找node
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i = 0;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
