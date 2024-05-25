function topBarCont( topBarLinks, topBarRightLinks) {
  const topBarContainer = document.createElement("div");
  topBarContainer.className = "topBar-Cont";

  const leftContainer = document.createElement("div");
  leftContainer.className = "left-cont";

  topBarLinks.forEach((linkData) => {
    const link = document.createElement("a");
    link.className = "topBar-link";
    link.href = linkData.url;
    if (linkData.icon) {
      const icon = document.createElement("i");
      icon.className = linkData.icon;
      link.appendChild(icon);
    }
    const textNode = document.createTextNode(linkData.name);
    link.appendChild(textNode);
    leftContainer.appendChild(link);
  });

  topBarContainer.appendChild(leftContainer);

  const rightContainer = document.createElement("div");
  rightContainer.className = "right-cont";

  topBarRightLinks.forEach((linkData) => {
    const link = document.createElement("a");
    link.className = "topBar-link";
    link.href = linkData.url;
    link.textContent = linkData.name;
    rightContainer.appendChild(link);
  });

  topBarContainer.appendChild(rightContainer);

  return topBarContainer;
}

export { topBarCont };
