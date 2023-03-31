//Sections container
const sub_container = document.querySelector('.sub-container');

    //Rules section
    const rules_section = document.querySelector('.rules-section');

    //Cards section
    const cards_section = document.querySelector('.cards-section');
    const card_menu = document.querySelector('.card-menu');
    const content_area = document.querySelector('.content-area');
    const linkListContainer = document.querySelector("[card-list-container]");
    const linkListTemplate = document.querySelector("[data-card-list-template]");
    const contentListTemplate = document.querySelector('[content-list-template]');
    const contentListContainer = document.querySelector('[content-list-container]');

    //Scan section
    const scan_section = document.querySelector('.scan-section');

//Header section
const header = document.querySelector('header');
const search_bar = document.querySelector('.search-bar')
const search_icon = document.querySelector('#icon-search');
const search_box = document.querySelector('#search-box');
const search_input = document.querySelector('#mySearch');
const clear_icon = document.querySelector('#icon-clear');
const searchResultListTemplate = document.querySelector("[search-result-list]")

//Background section
const container = document.querySelector('.container');
const title = document.querySelector('#title');

//Footer section
const copyright = document.querySelector('.copyright');
const menu_button = document.querySelectorAll('.menu button');

// PARA DECLARE
const ANIM_DURATION = 300
let current_btn;
let card_data = [];
let search_result_list = []

//---------------- GRAB DATA
fetch("https://raw.githubusercontent.com/ZoeyLe3294/wiki_webpage/main/Website/assets/database")
    .then(res => res.json())
    .then(data => {
        card_data = data
        search_result_list = data.map(entry=>{
            let searchResult = search_list_generate (entry)
            return {id:entry.id, category:entry.category, name:entry.name, language:entry.language, element:searchResult}
        })
    })
// card_data = [
//     {
//         "id": "1",
//         "category": "item",
//         "name": "Axe ",
//         "language": "vi",
//         "context": "Rất bén",
//         "detail": "Tăng 1 cục xúc xắc khi thực hiện tấn công"
//     }
// ]

// --------------- ANIMATION AFTER LOADING PAGE ----------------
let animDelay = 0;
let animDuration = 0.5;
title.addEventListener('animationend',() => {
    for (let i=0;i<menu_button.length;i++){
        menu_button[menu_button.length-i-1].classList.add('popin-anim');
        animDelay+=0.1;
        menu_button[menu_button.length-i-1].style.animationDelay = animDelay+'s';
    }
    animDelay+=0.3;
    header.classList.add('popin-anim');
    copyright.classList.add('popin-anim');
    header.style.animationDelay = animDelay+'s';
    copyright.style.animationDelay = animDelay+'s';
},{once:true})

header.addEventListener('animationend',() => {
    menu_button.forEach(item=>{
        item.classList.remove('popin-anim');
        item.style.animationDelay = '';
        item.style.opacity = 1;
    })
})

// -------------------- SEARCH SECTION ----------------------
search_icon.addEventListener('click',()=>{
    search_bar.classList.toggle('active');
    search_input.value="";
    search_box.classList.add("hide");
})
clear_icon.addEventListener('click',()=>{
    search_input.value="";
    search_box.classList.add("hide");
})
search_input.addEventListener("input",(e)=>{
    const value = e.target.value.toLowerCase().trim()
    search_box.classList.remove("hide")
    search_result_list.forEach(result=>{
        // const isVisible = result.name.includes(value)
        const isVisible = result.name.toLowerCase().startsWith(value)
        result.element.classList.toggle("hide",!isVisible)
    })
})

// -------------------- MENU BUTTONS CLICK ----------------
let cardMenu_isOpen = false;
let content_isOpen = false;
menu_button.forEach(item => {item.addEventListener('click',activeLink)});
function activeLink(){
    let id = this.id;
    if (current_btn) { //already select a button
        if (current_btn==id) { //select same button
            if(id == 'rule_btn') {
                rules_section.classList.toggle('show');                
            } else if (id == 'scan_btn'){
                scan_section.classList.toggle('show');
            } else {
                if(content_isOpen) {card_menu_anim(true);}
            }
            menu_button.forEach((item)=>{
                if(item.id!='scan_btn'){
                    if (item.id != id) {
                        item.classList.toggle('scale-reset-anim');
                        item.classList.remove('scale-down-anim');
                        item.classList.toggle('inactive');
                    }else{
                        item.classList.toggle('active');
                    }                    
                }
            })
            search_bar.classList.remove('active');
            title.classList.toggle('close');
            
            current_btn=null;
        }else {
            if(id == 'rule_btn') {
                rules_section.classList.add('show');
                scan_section.classList.remove('show');
                if(content_isOpen) {card_menu_anim(true);}
            } else if (id == 'scan_btn'){
                scan_section.classList.add('show');
                rules_section.classList.remove('show');
                if(content_isOpen) {card_menu_anim(true);}
            } else {
                setTimeout(() => {
                    card_menu_list_generate(this.value);
                    //reset to top list
                    content_area.scrollTop = 0;
                    card_menu.scrollTop = 0;
                }, ANIM_DURATION);
                // card_menu_list_generate(this.value);
                card_menu_anim(false);


                rules_section.classList.remove('show');
                scan_section.classList.remove('show');
            }

            menu_button.forEach((item)=>{
                if(item.id!='scan_btn') {
                    if (item.id == id) {
                    item.classList.remove('scale-down-anim');
                    item.classList.toggle('active');
                    item.classList.toggle('inactive');
                    }else {
                        item.classList.add('scale-down-anim');
                        item.classList.remove('scale-reset-anim');
                        item.classList.remove('active');
                        item.classList.add('inactive');
                    }
                }

            })
            current_btn = id;
        }
    } else {
        if(id == 'rule_btn') {
            rules_section.classList.add('show');
            scan_section.classList.remove('show');
            if(content_isOpen) {card_menu_anim(true);}         
        } else if (id == 'scan_btn'){
            scan_section.classList.add('show');
            rules_section.classList.remove('show');
            if(content_isOpen) {card_menu_anim(true);}
        } else {
            rules_section.classList.remove('show');
            scan_section.classList.remove('show');
            content_isOpen ? card_menu_anim(true) : card_menu_anim(false);
            card_menu_list_generate(this.value)
        }

        menu_button.forEach((item)=>{
            if(item.id!='scan_btn') {
                if (item.id != id) {
                    item.classList.add('scale-down-anim') ;
                    item.classList.remove('scale-reset-anim') ;
                    item.classList.toggle('inactive');
                }else{
                    item.classList.toggle('active');
                }
            }

        })
        title.classList.add('close');
        current_btn = id;
    }
    

}
function card_menu_Promise (){
    const myCardPromise = new Promise((resolve, reject) => {
            card_menu.classList.add('close-anim');
            card_menu.classList.remove('open-anim');
            resolve('success');
      });
    return myCardPromise
}
function content_Promise (){
    const myContentPromise = new Promise((resolve, reject) => {
            content_area.classList.add('fade-out-anim');
            content_area.classList.remove('fade-in-anim');
            resolve('success');
      });
    return myContentPromise
}

function card_menu_anim(isRepeat){
    if (!isRepeat) {
        if (cardMenu_isOpen){
            card_menu_Promise().then((message)=>{
                setTimeout(() => {
                    card_menu.classList.add('open-anim');
                    card_menu.classList.remove('close-anim');
                }, ANIM_DURATION);
            })
        } else {
            card_menu.classList.add('open-anim');
            card_menu.classList.remove('close-anim');
            cardMenu_isOpen = true;
        }
        if (content_isOpen){
            content_Promise().then((message)=>{
                setTimeout(() => {
                    content_area.classList.add('fade-in-anim');
                    content_area.classList.remove('fade-out-anim');
                }, ANIM_DURATION);
            })
        } else {
            content_area.classList.add('fade-in-anim');
            content_area.classList.remove('fade-out-anim');
            content_isOpen = true;
        }
    }else{

        if (cardMenu_isOpen){
            card_menu.classList.add('close-anim');
            card_menu.classList.remove('open-anim');
            cardMenu_isOpen = false;
        } else {
            card_menu.classList.add('open-anim');
            card_menu.classList.remove('close-anim');
            cardMenu_isOpen = true;
        }
        if (content_isOpen){
            content_area.classList.remove('fade-in-anim');
            content_area.classList.add('fade-out-anim');
            content_isOpen = false;
        } else {
            content_area.classList.add('fade-in-anim');
            content_area.classList.remove('fade-out-anim');
            content_isOpen = true;
        }
    }
}
function card_menu_list_generate(val){
    linkListContainer.innerHTML=''
    contentListContainer.innerHTML=''
    card_data.forEach(result => {
        if (result.category == val) {
            //load link_list
            const linkList = linkListTemplate.content.cloneNode(true).children[0]
            const link = linkList.querySelector('[data-header]')
            link.textContent = result.name.toLowerCase()
            linkList.id = result.name.toLowerCase().concat('_link')
            linkList.addEventListener('click',()=>{
                document.getElementById(result.name.toLowerCase()).scrollIntoView({behavior: 'smooth' })
                document.querySelectorAll('.card').forEach(c=>{
                    c.classList.remove('highlight')
                })
            })
            linkListContainer.append(linkList)
            //load content
            const contentList = contentListTemplate.content.cloneNode(true).children[0]
            const content_title = contentList.querySelector('.content-title')
            const content_description = contentList.querySelector('.content-description')
            const content_detail = contentList.querySelector('.content-detail')
            content_title.textContent = result.name.toUpperCase()
            content_title.id = result.name.toLowerCase()
            content_description.textContent = result.context
            content_detail.textContent = result.detail
            contentListContainer.append(contentList)
        }
    })
}
function search_list_generate (data) {
    const searchResult = searchResultListTemplate.content.cloneNode(true).children[0]
    //set img
    const img = searchResult.querySelector(".icon")
    switch (data.category){
        case 'item': img.style.backgroundImage  = "url('/Website/assets/img/icon_item.svg')"
        break;
        case 'omen': img.style.backgroundImage  = "url('/Website/assets/img/icon_omen.svg')"
        break;
        case 'event': img.style.backgroundImage  = "url('/Website/assets/img/icon_event.svg')"
        break;
        case 'room': img.style.backgroundImage  = "url('/Website/assets/img/icon_room.svg')"
        break;
    }
    //set name
    const name = searchResult.querySelector("[name]")
    name.textContent = data.name
    //set anchor link ...
    searchResult.addEventListener('click',()=>{
        search_input.value="";
        search_box.classList.add("hide");
        title.classList.add('close');
        menu_button.forEach((item)=>{
            if(item.id!='scan_btn') {
                item.classList.remove('scale-reset-anim');
                item.classList.toggle('scale-down-anim',item.value != data.category);
                item.classList.toggle('inactive',item.value != data.category);
                item.classList.toggle('active',item.value == data.category);
            }
                if(item.value == data.category) {current_btn = item.id}
                content_isOpen = false;
                cardMenu_isOpen = false;
        })
        card_menu_list_generate(data.category);
        card_menu_anim(true);

        document.getElementById(data.name.toLowerCase().concat('_link')).classList.add('highlight');
        let position = 0
        let contentTitle =document.getElementsByClassName('content-title')
        for (let i=0;i<contentTitle.length;i++){
            if(contentTitle[i].id==data.name.toLowerCase()) position=i;
        }
        card_menu.scrollTop = document.getElementsByClassName('card')[0].clientHeight * position;
        content_area.scrollTop = document.getElementsByClassName('content')[0].clientHeight * position;
    })

    search_box.append(searchResult)
    return searchResult;
}
function scroll_Premise(obj){
    const myScrollPromise = new Promise((resolve, reject) => {
        document.getElementById(obj).scrollIntoView({behavior: 'smooth' });
        resolve('success');
  });
    return myScrollPromise    
}
document.onclick = function (e){
    if(e.target.id !="search-box"){
        search_box.classList.add("hide");
    }
}


