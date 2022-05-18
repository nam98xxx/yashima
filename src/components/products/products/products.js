class ViewAs {
  constructor(el){
    this.el = el;
    this.elViewAs = document.querySelector(".viewAs");
    this.init();
  }
  handleViewAs(){
    const iconViewAs1 = this.elViewAs.querySelector(".home-filter__icon1");
    const iconViewAs2 = this.elViewAs.querySelector(".home-filter__icon2");
    const viewas1 = this.elViewAs.querySelector(".viewas1");
    const viewas2 = this.elViewAs.querySelector(".viewas2");
    iconViewAs1.addEventListener("click",() => {
      viewas1.style.display = "none"
      viewas2.style.display = "block";
      iconViewAs2.style.color = "#e0d3d3";
      iconViewAs1.style.color = "black";
    })
    iconViewAs2.addEventListener("click",() => {
      viewas1.style.display = "flex"
      viewas2.style.display = "none";
      iconViewAs2.style.color = "black";
      iconViewAs1.style.color = "#e0d3d3";
    })
  }
  init(){
   this.handleViewAs();
  }
}
const elViewAs = document.querySelector(".viewAs");
if(elViewAs){
  new ViewAs();
}
const templateShortBy = `
                  <li class ="shortby__item" >
                    Featured
                  </li>
                  <li class ="shortby__item" >
                    Best selling
                  </li>
                  <li class ="shortby__item" >
                    Alphabetically, A-Z
                  </li>
                  <li class ="shortby__item" >
                    Alphabetically, Z-A
                  </li>
                  <li class ="shortby__item" >
                    Price, high to low
                  </li>
                  <li class ="shortby__item" >
                    Date, old to new
                  </li>
                `
function OpenShortBy(template) {
  const shortByEl = document.querySelector(".home-filter__box");
  const ulShortByEl = document.querySelector(".shortby");
  let state = {
    open: true
  }
  shortByEl.addEventListener("click",() => {
    if(state.open){
      console.log(state.open,"OPEN SHORT BY");
      ulShortByEl.innerHTML = template;
      ulShortByEl.style.border = "1px solid var(--color-gray3)";
      state.open = false;
    } else {
      console.log(state.open,"CLOSE SHORT BY");
      ulShortByEl.innerHTML = " ";
      ulShortByEl.style.border = "inherit";
      state.open = true;
    }
  })

}

OpenShortBy(templateShortBy);
