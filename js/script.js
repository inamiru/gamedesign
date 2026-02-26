const slides = [
{
title: "体験とは何か",
content: "<p>ゲーム体験とはプレイヤーが感じる一連の経験です。</p>"
},
{
title: "プレイヤー心理",
content: "<p>心理的な要素がゲームの面白さを作ります。</p>"
}
];

const container = document.getElementById("container");
const tocList = document.getElementById("tocList");

slides.forEach((slide, index) => {

```
const div = document.createElement("div");
div.className = "slide";
div.id = "slide-" + index;

div.innerHTML = `
    <h2>${slide.title}</h2>
    ${slide.content}
`;

container.appendChild(div);

const li = document.createElement("li");
li.innerHTML = `<a href="#slide-${index}">${slide.title}</a>`;
tocList.appendChild(li);
```

});

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

document.getElementById("mobile-menu-btn").onclick = () => {
sidebar.classList.add("open");
overlay.classList.add("show");
};

document.getElementById("closeSidebar").onclick = closeMenu;
overlay.onclick = closeMenu;

function closeMenu() {
sidebar.classList.remove("open");
overlay.classList.remove("show");
}
