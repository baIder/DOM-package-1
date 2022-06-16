window.btn1.onclick = () => {
  const div = dom.find("#test>.red")[0]; // 获取对应的元素
  dom.style(div, "color", "red"); // 设置 div.style.color
};
window.btn2.onclick = () => {
  const divList = dom.find(".red"); // 获取多个 div.red 元素
  dom.each(divList, (n) => console.log(n)); // 遍历 divList 里的所有元素
};

let allRed = document.getElementsByClassName("red");
for (let j = 0; j < allRed.length; j++) {
  allRed[j].onclick = () => {
    console.log("这个class为red的标签是第" + dom.index(allRed[j]) + "个");
  };
}
