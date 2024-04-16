function createSection(className, textContent, links) {
  const section = document.createElement("section");
  section.className = className;

  const div = document.createElement("div");
  div.className = `${className}Div1`;

  const span = document.createElement("span");
  span.className = "yellow title";
  span.textContent = textContent;

  const ul = document.createElement("ul");
  ul.className = "listContent"

  links.forEach((link) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "white";
    a.href = link.url;
    a.textContent = link.text;
    li.appendChild(a);
    if (link.additionalContent) {
      const additionalContents = link.additionalContent;
      additionalContents.forEach((content) => {
        const additionalContent = document.createElement("div");
        const additionalLink = document.createElement("a");
        additionalLink.className = "fbInsta";
        additionalLink.href = content.url;
        additionalLink.target = "_blank";
        const icon = document.createElement("i");
        icon.className = content.iconClass;
        const span = document.createElement("span");
        span.className = "hidden-xs white";
        span.textContent = content.text;
        additionalLink.appendChild(icon);
        additionalLink.appendChild(span);
        additionalContent.appendChild(additionalLink);
        li.appendChild(additionalContent);
      });
    }
    ul.appendChild(li);
  });

  div.append(span, ul);
  section.appendChild(div);

  return section;
}

function footer() {
  const footer = document.createElement("div");
  footer.className = "footer";

  const container = document.createElement("div");
  container.className = "container";

  // bewakoof icon
  const iconDiv = document.createElement("div");
  iconDiv.className = "iconDiv";
  const icon = document.createElement("h1");
  icon.textContent = "Bewakoof";
  icon.className = "yellow";
  const iconR = document.createElement("h6");
  iconR.textContent = "®";
  iconR.className = "yellow";
  iconDiv.append(icon, iconR);

  // section 1
  const section1 = document.createElement("section");
  section1.className = "section1";
  // section 1 div 1
  const section1Div1Links = [
    { url: "./", text: "Contact Us." },
    { url: "./", text: "Track Order" },
    { url: "./", text: "Return Order" },
    { url: "./", text: "Cancel Order" },
  ];
  const section1Div1 = createSection(
    "section1Div1",
    "CUSTOMER SERVICE",
    section1Div1Links
  );

  // section 1 div 2
  const section1Div2Links = [
    { url: "./", text: "About Us" },
    { url: "./", text: "We're Hiring" },
    { url: "./", text: "Terms & Conditions" },
    { url: "./", text: "Privacy Policy" },
    { url: "./", text: "Blog" },
  ];
  const section2Div2 = createSection(
    "section1Div2",
    "COMPANY",
    section1Div2Links
  );

  // section 1 div 3
  const section1Div3Links = [
    {
      additionalContent: [
        {
          url: "./",
          iconClass: "fa-brands fa-square-facebook white",
          text: "4.7M People Like this",
        },
        {
          url: "./",
          iconClass: "fa-brands fa-instagram white",
          text: "1M Followers",
        },
      ],
    },
  ];
  const section2Div3 = createSection(
    "section1Div3",
    "CONNECT WITH US",
    section1Div3Links
  );

  // section 1 div 4
  const section1Div4 = document.createElement("div");
  section1Div4.className = "section1Div4";
  const div4Heading = document.createElement("span");
  div4Heading.textContent = "KEEP UP TO DATE";
  div4Heading.className = "yellow title";
  const inputContainer = document.createElement("form");
  inputContainer.className = "inputContainer";
  const div4Input = document.createElement("input");
  div4Input.className = "div4Input";
  div4Input.placeholder = "Enter Email Id";
  const div4Button = document.createElement("input");
  div4Button.className = "div4Button";
  div4Button.type = "Submit";
  div4Button.value = "SUBSCRIBE";

  inputContainer.append(div4Input, div4Button);
  section1Div4.append(div4Heading, inputContainer);
  section1.append(section1Div1, section2Div2, section2Div3, section1Div4);
  container.append(iconDiv, section1);

  footer.appendChild(container);

  return footer;
}

export { footer };
