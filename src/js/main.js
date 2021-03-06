import '../scss/swiper-bundle.scss';
import '../../node_modules/swiper/modules/pagination/pagination.scss';
import '../scss/main.scss';
import '../../node_modules/focus-visible/dist/focus-visible';
import '../index.html';

import Swiper, {Pagination } from 'swiper';
Swiper.use([Pagination]);

import {
    classHeader,                //header
    classHeaderButtonIcon,      //header__button-icon
    elementSeparator,           //__
    modifierHidden,             //--hidden
    modifierVisible             //--visible
} from "../blocks/header/header.js";

import {
    classMore,                      //more
    classMoreButton,                //more__button
    classMoreContent,               //more__content
    classMoreContentShrinked,       //more__content--shrinked
    classMoreText,                  //mor__text
    classPrefix,                    //.
    createMore,
    destroyMore
} from "../blocks/more/more";

import {
    classButtonIconBurger,      //button-icon--burger
    classButtonIconCall,        //button-icon--call
    classButtonIconChat,        //button-icon--chat
    classButtonIconCross        //button-icon--cross
} from "../blocks/button-icon/button-icon";

import {classBurgerMenu                                  //button-icon--call
} from "../blocks/burger-menu/burger-menu";

import {
    classFormHidden,                                    //form--hidden
    classFormVisible,                                   //form--visible
} from "../blocks/form-feedback/form";

import {
    classScreenBlurHidden,                              //screen-blur--hidden
    classScreenBlurVisible                              //screen-blur--visible
} from "../blocks/screen-blur/screen-blur";

const resolutionMobileToPad = 750;
const resolutionPadToPC = 1423;
const swiperOptions = {
    grabCursor: true,
    slidesPerView: 1.5,
    spaceBetween: 16,
    loopedSlides: 8,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,}
}

const classSwiper = 'swiper';
const prefix = '-'
const classSwiperPrefix = classSwiper + prefix;                     //swiper-
const classSwiperContainer = classSwiperPrefix + 'container';       //swiper-container
const classSwiperWrapper = classSwiperPrefix + 'wrapper';           //swiper-wrapper
const classSwiperPagination = classSwiperPrefix + 'pagination';     //swiper-pagination
const classSwiperSlide = classSwiperPrefix + 'slide';               //swiper-slide

const swipers = document.querySelectorAll(classPrefix + classSwiper);
let mySwiper;
let swiperContainers = [];
let swiperWrappers = [];
let swiperPaginations = [];
let swiperSlides = [];
for (let i = 0; i < swipers.length; i++) {
    swiperContainers[i] = swipers[i].querySelector(classPrefix + classSwiperContainer);
    swiperWrappers[i] = swipers[i].querySelector(classPrefix + classSwiperWrapper);
    swiperPaginations[i] = swipers[i].querySelector(classPrefix + classSwiperPagination);
    swiperSlides[i] = swipers[i].querySelectorAll(classPrefix + classSwiperSlide);
}

const createSwipers = function () {
    for (let i = 0; i < swipers.length; i++) {
        if (!swiperWrappers[i].classList.contains(classSwiperWrapper)) {
            swiperWrappers[i].classList.add(classSwiperWrapper);
        }
        if (!swiperPaginations[i].classList.contains(classSwiperPagination)) {
            swiperPaginations[i].classList.add(classSwiperPagination);
        }
        swiperSlides[i].forEach(slide => {
            if (!slide.classList.contains(classSwiperSlide)) {
                slide.classList.add(classSwiperSlide);
            }
        });
    }
    mySwiper = new Swiper(classPrefix + classSwiperContainer, swiperOptions);
};

const destroySwipers = function () {
    for (let i = 0; i < swipers.length; i++) {
        if (typeof (mySwiper) != 'undefined') {
            mySwiper[i].destroy(true, true);
        }
        if (swiperWrappers[i].classList.contains(classSwiperWrapper)) {
            swiperWrappers[i].classList.remove(classSwiperWrapper);
        }
        if (swiperPaginations[i].classList.contains(classSwiperPagination)) {
            swiperPaginations[i].classList.remove(classSwiperPagination);
        }
        swiperSlides[i].forEach(slide => {
            if (slide.classList.contains(classSwiperSlide)) {
                slide.classList.remove(classSwiperSlide);
            }
        });
    }
};


let clientWidthCurrent = document.body.clientWidth;
// let clientWidthCurrent = document.body.scrollWidth;
let clientWidthPrevious = clientWidthCurrent;

const moreAndContent = document.getElementById("more-content")
const moreAndSwipers = document.querySelectorAll(classPrefix + classSwiper + classPrefix + classMore);

const toggleSwiperResolution = function () {
    createSwipers();
    moreAndSwipers.forEach(moreAndSwiper => {
        if (moreAndSwiper.classList.contains(classMore)) {
            destroyMore(moreAndSwiper)
        }
    })
}

const toggleMoreResolution = function () {
    moreAndSwipers.forEach(moreAndSwiper => {
        if (!moreAndSwiper.classList.contains(classMore)) {
            createMore(moreAndSwiper, classSwiperContainer)
        }
    });
    destroySwipers();
}

const textContentShowAll = '???????????????? ??????';
const textContentReadMore = '???????????? ??????????';
const textContentHide = '????????????';

const addMoreClickListener = function (more, textToShrink, textToExpand) {
    const moreButton = more.querySelector(classPrefix + classMoreButton);
    moreButton.addEventListener('click', function () {
        const moreText = more.querySelector(classPrefix + classMoreText)
        const moreContent = more.querySelector(classPrefix + classMoreContent)
        if (moreContent.classList.contains(classMoreContentShrinked)) {
            moreContent.classList.remove(classMoreContentShrinked);
            moreText.textContent = textToShrink;
        } else {
            moreContent.classList.add(classMoreContentShrinked);
            moreText.textContent = textToExpand;
        }
    })
}

addMoreClickListener(moreAndContent, textContentHide, textContentReadMore);
addMoreClickListener(moreAndSwipers[0], textContentHide, textContentShowAll);
addMoreClickListener(moreAndSwipers[1], textContentHide, textContentShowAll);

const classPage = "page"
const classPageHeader = classPage + elementSeparator + "header"
const pageHeader = document.querySelector(classPrefix + classHeader + classPrefix + classPageHeader);
const burger = pageHeader.querySelector(classPrefix + classButtonIconBurger);
const burgerMenu = document.querySelector(classPrefix + classBurgerMenu)
const cross = burgerMenu.querySelector(classPrefix + classButtonIconCross)

const hideMenu = function () {
    if (clientWidthCurrent >= resolutionPadToPC) {
        return
    }
    burgerMenu.classList.replace(classBurgerMenu + modifierVisible, classBurgerMenu + modifierHidden)
}

const showMenu = function () {
    burgerMenu.classList.replace(classBurgerMenu + modifierHidden, classBurgerMenu + modifierVisible)
    const headerButtonIconCross = burgerMenu.querySelector(classPrefix + classHeaderButtonIcon + classPrefix + classButtonIconCross)
    if (clientWidthCurrent >= resolutionPadToPC) {
        headerButtonIconCross.classList.replace(classHeaderButtonIcon + modifierVisible, classHeaderButtonIcon + modifierHidden)
    } else if (clientWidthCurrent >= resolutionMobileToPad && clientWidthCurrent <= resolutionPadToPC) {
        showScreenBlur()
        headerButtonIconCross.classList.replace(classHeaderButtonIcon + modifierHidden, classHeaderButtonIcon + modifierVisible)
    } else {
        headerButtonIconCross.classList.replace(classHeaderButtonIcon + modifierHidden, classHeaderButtonIcon + modifierVisible)
    }
}

const formFeedback = document.getElementById("form-feedback")
const crossFormFeedback = formFeedback.querySelector(classPrefix + classButtonIconCross)

crossFormFeedback.addEventListener('click', function () {
    hideFormFeedback()
})

const formCall = document.getElementById("form-call")
const crossFormCall = formCall.querySelector(classPrefix + classButtonIconCross)

crossFormCall.addEventListener('click', function () {
    hideFormCall()
})

const hideScreenBlur = function () {
    screenBlur.classList.replace(classScreenBlurVisible, classScreenBlurHidden)
}

const showScreenBlur = function () {
    screenBlur.classList.replace(classScreenBlurHidden, classScreenBlurVisible)
}

const screenBlur = document.querySelector(classPrefix + "screen-blur")

const showFormCall = function () {
    formCall.classList.replace(classFormHidden, classFormVisible)
    hideFormFeedback()
    showScreenBlur()
}

const hideFormCall = function () {
    formCall.classList.replace(classFormVisible, classFormHidden)
    hideScreenBlur()
}

const showFormFeedback = function () {
    formFeedback.classList.replace(classFormHidden, classFormVisible)
    hideFormCall()
    showScreenBlur()
}

const hideFormFeedback = function () {
    formFeedback.classList.replace(classFormVisible, classFormHidden)
    hideScreenBlur()
}

screenBlur.addEventListener("mouseup", function () {
hideScreenBlur()
    hideFormCall()
    hideFormFeedback()
    hideMenu()
})

burger.addEventListener('click', function () {
    showMenu()
})

cross.addEventListener('click', function () {
    hideMenu()
})

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        hideMenu()
    }
})

const feedbackButtons = document.querySelectorAll(classPrefix + classButtonIconChat);

const addFeedbackClickListener = function (feedbackButton) {
    feedbackButton.addEventListener('click', function () {
        showFormFeedback()
        if (clientWidthCurrent < resolutionPadToPC) {
            hideMenu()
        }
    })
}

for (let i = 0; i < feedbackButtons.length; i++) {
    addFeedbackClickListener(feedbackButtons[i])
}

const callButtons = document.querySelectorAll(classPrefix + classButtonIconCall);

const addCallClickListener = function (callButton) {
    callButton.addEventListener('click', function () {
        showFormCall()
        if (clientWidthCurrent < resolutionPadToPC) {
            hideMenu()
        }
    })
}

for (let i = 0; i < callButtons.length; i++) {
    addCallClickListener(callButtons[i])
}

const toggleResolution = function () {
    if (clientWidthCurrent <= resolutionMobileToPad) {
        toggleSwiperResolution()
    } else if (clientWidthCurrent > resolutionMobileToPad) {
        toggleMoreResolution()
    }
    if (clientWidthCurrent >= resolutionPadToPC) {
        showMenu()
    } else {
        hideMenu()
    }
}

toggleResolution()

window.onresize = function () {
    clientWidthCurrent = document.body.clientWidth;
    if ((clientWidthCurrent <= resolutionMobileToPad && clientWidthPrevious > resolutionMobileToPad) || (clientWidthCurrent > resolutionMobileToPad && clientWidthPrevious <= resolutionMobileToPad)) {
        clientWidthPrevious = clientWidthCurrent
        toggleResolution()
    }
    if ((clientWidthCurrent <= resolutionPadToPC && clientWidthPrevious > resolutionPadToPC) || (clientWidthCurrent > resolutionPadToPC && clientWidthPrevious <= resolutionPadToPC)) {
        clientWidthPrevious = clientWidthCurrent
        toggleResolution()
    }
}
