// Start Countdown 3,2,1

const number3 = document.querySelector('.number3')
const number2 = document.querySelector('.number2')
const number1 = document.querySelector('.number1')
const number0 = document.querySelector('.number0')
const number = [number3,number2,number1,number0]
let numberIndex = 0

let startCountdown = setInterval(() => {

    let prevIndex = numberIndex - 1
    if(prevIndex >= 0) {
        number[prevIndex].style.display = 'none' 
    }

    if(numberIndex === 4) {
        darkOverlay.classList.remove('open')
        clearInterval(startCountdown)
        triggerCalcHoursLeft()
        triggerCountDown()
        numberIndex = null
        return
    }

    number[numberIndex].style.display = 'block'
    number[numberIndex].style.animationName = 'numberAnimation'
    numberIndex = numberIndex + 1
}, 1000)

// TODOOLIO

const toDoForm = document.querySelector('#todo-form')
const toDoList = document.querySelector('#todo-list')
const toDoInput = document.querySelector('#todo-input')
const timeContainer = document.querySelector('.time-container')

    toDoForm.addEventListener('submit', e => {
        e.preventDefault()

        let maxStringInput = null // limit input characters
        if(window.matchMedia('(max-width: 360px)').matches) {
            maxStringInput = 12
        } else if(window.matchMedia('(max-width: 415px)').matches) {
            maxStringInput = 15
        } else {
            maxStringInput = 20
        }

        if(toDoInput.value.length > maxStringInput) {
            alert(`Please use less characters for your list item (maximum: ${maxStringInput})`)
        }

        if(listItemArray.length === 12) {
            alert('You have reached the maximum of tasks. Stay focused!')
        }

        if(toDoInput.value !== '' && toDoInput.value.length <= maxStringInput && listItemArray.length <= 11) {

            // Create new List item row
            const listItemRow = document.createElement('div')
            listItemRow.classList.add('list-item-row')
            toDoList.appendChild(listItemRow)

            // Create new drag element
            const newDragElement = document.createElement('span')
            newDragElement.classList.add('drag-element','.handle')
            listItemRow.appendChild(newDragElement)

            const buildDragBars = [1,2,3]
            buildDragBars.forEach(function() {
                const newDragSpan = document.createElement('span')
                newDragSpan.classList.add('drag-span')
                newDragElement.appendChild(newDragSpan)
            })

            // Create Time Dropdown
            const newTimeDropdown = timeContainer.cloneNode(true)
            listItemRow.appendChild(newTimeDropdown)
        
            // Create new list item
            const newElement = document.createElement('span')
            newElement.innerText = toDoInput.value
            newElement.classList.add('list-item')
            listItemRow.appendChild(newElement)
            listItemArray.push(newElement)
            toDoInput.value = ''
            animationRocketDiv.style.animationName = ''

            // Create new checkmark
            const newCheckmark = document.createElement('span')
            newCheckmark.classList.add('checkmark-circle')
            newCheckmark.setAttribute('greenstatus-false', 'false')
            listItemRow.appendChild(newCheckmark)
            checkmarkArray.push(newCheckmark)

            const newCheckmarkImg = document.createElement('img')
            newCheckmarkImg.classList.add('checkmark-img')
            newCheckmarkImg.setAttribute('src', 'img/checkmark-grey.svg')
            newCheckmark.appendChild(newCheckmarkImg)

            // turn checkmark green on click / hover
            let checkmarkClicked = false

            if("ontouchstart" in document.documentElement === false) { // trigger only on desktop
                newCheckmark.addEventListener('mouseover', e => {
                    newCheckmark.style.borderColor = 'turquoise'
                    newCheckmarkImg.setAttribute('src', 'img/checkmark-green.svg')
                })

                newCheckmark.addEventListener('mouseout', e => {
                    if(checkmarkClicked === false) {
                        newCheckmark.style.borderColor = ''
                        newCheckmarkImg.setAttribute('src', 'img/checkmark-grey.svg')
                    }
                })
            }

            if("ontouchstart" in document.documentElement) {
                newCheckmark.addEventListener('touchstart', e => {
                    turnCheckmarkGreen()
                })
            } else {
                newCheckmark.addEventListener('click', e => {
                    turnCheckmarkGreen()
                })
            }

            function turnCheckmarkGreen() {
                if(checkmarkClicked === false) {
                    newCheckmarkImg.setAttribute('src', 'img/checkmark-green.svg')
                    checkmarkClicked = true
                } else {
                    newCheckmarkImg.setAttribute('src', 'img/checkmark-grey.svg')
                    checkmarkClicked = false
                }
            }
            
            // Create new cross
            const newCross = document.createElement('span')
            newCross.classList.add('cross-circle')
            listItemRow.appendChild(newCross)
            crossItemArray.push(newCross)

            const newCrossImg = document.createElement('img')
            newCrossImg.classList.add('cross-img')
            newCrossImg.setAttribute('src', 'img/close-cross-grey.svg')
            newCross.appendChild(newCrossImg)

            // turn cross red on hover
            newCross.addEventListener('mouseover', e => {
                newCrossImg.setAttribute('src', 'img/close-cross-red.svg')
            })

            newCross.addEventListener('mouseout', e => {
                newCrossImg.setAttribute('src', 'img/close-cross-grey.svg')
            })

            // turn cross red on touchstart
            newCross.addEventListener('touchstart', e => {
                newCrossImg.setAttribute('src', 'img/close-cross-red.svg')
                newCross.style.borderColor = '#dc0404'
                newCross.previousElementSibling.previousElementSibling.style.color = '#dc0404'
                newCross.previousElementSibling.previousElementSibling.style.textDecoration = 'line-through'
            })

            // remove Item onclick
            if("ontouchstart" in document.documentElement) {
                newElement.addEventListener('touchstart', () => {
                    setTimeout(() => {
                        removeListItem()
                    }, 300)
                })
                newCross.addEventListener('touchstart', () => {
                    setTimeout(() => {
                        removeListItem()
                    }, 300)
                })
            } else {
                newElement.addEventListener('click', () => {
                    removeListItem()
                })
                newCross.addEventListener('click', () => {
                    removeListItem()
                })
            }

            function removeListItem() {
                toDoList.removeChild(listItemRow)
                updateCalcArrays()
                calcMeterHeight()
                triggerRocketSuccessAnimation()
            }

            function updateCalcArrays() {
                if(newCheckmark.getAttribute('greenstatus-false')) {
                    listItemArray.pop()
        
                } else if(newCheckmark.getAttribute('greenstatus-true')) {
                    greenstatusTrueArray.pop()
                    listItemArray.pop()
                }
            }

            // apply functions below to new array
            applyToUpdatedArray()
            calcMeterHeight()
        }
    })

// list color functions

let checkmarkArray = []
let crossItemArray = []
let listItemArray = []
const infoPopup = document.querySelector('.info-popup-animation')

    function applyToUpdatedArray() {

        updateCode()

        // turn item green onclick / ontouchstart

        checkmarkArray.forEach(checkmark => {

            if("ontouchstart" in document.documentElement) {
                checkmark.ontouchstart = function() {
                    toggleCheckmarkGreen()
                }
            } else {
                checkmark.onclick = function() {
                    toggleCheckmarkGreen()
                }
            }

            function toggleCheckmarkGreen() {

                if(checkmark.getAttribute('greenstatus-false')) {
                    checkmark.style.borderColor = 'turquoise'
                    checkmark.previousElementSibling.style.color = 'turquoise'
                    checkmark.removeAttribute('greenstatus-false')
                    checkmark.setAttribute('greenstatus-true', 'true')
                    greenstatusTrueArray.push(1)
                    countHowOftenRocketStarted = []
                    calcMeterHeight()
                    triggerStarSuccessAnimation()
                    triggerRocketSuccessAnimation()

                    if(menuOpenStatus === true) {

                        if(infoPopup.classList.contains('active-popup')) {
                            infoPopup.classList.add('glow-red')
                            infoPopup.style.animation = 'none'
                            infoPopup.offsetHeight
                            infoPopup.style.animation = null
                        }
                        
                        infoPopup.classList.add('active-popup')

                        const infoPopupCross = document.querySelector('.popup-cross')
                        infoPopupCross.addEventListener('click', e => {
                            infoPopup.classList.remove('active-popup')
                        })
                    }

                } else if(checkmark.getAttribute('greenstatus-true')) {
                    checkmark.style.borderColor = 'hsl(0, 0%, 45%)'
                    checkmark.previousElementSibling.style.color = ''
                    checkmark.removeAttribute('greenstatus-true')
                    checkmark.setAttribute('greenstatus-false', 'false')
                    greenstatusTrueArray.pop(1)
                    calcMeterHeight()
                    animationRocketDiv.style.animationName = ''
                }
            }
        })

        // turn list item red on cross circle hover

        function updateCode() {

        crossItemArray.forEach(crossItem => {

            crossItem.addEventListener('mouseover', () => {
                crossItem.previousElementSibling.previousElementSibling.style.color = '#dc0404'
                crossItem.previousElementSibling.previousElementSibling.style.textDecoration = 'line-through'
            })

            crossItem.addEventListener('mouseout', () => {
                if (crossItem.previousElementSibling.getAttribute('greenstatus-true')) {
                    crossItem.previousElementSibling.previousElementSibling.style.color = 'turquoise'
                } else {
                    crossItem.previousElementSibling.previousElementSibling.style.color = 'white'
                }
                    crossItem.previousElementSibling.previousElementSibling.style.textDecoration = 'none'
            })
        })
        }
        
        // turn list item red on list item hover

        listItemArray.forEach(listItem => {

            listItem.addEventListener('mouseover', () => {
                listItem.style.color = '#dc0404'
                listItem.style.textDecoration = 'line-through'
                listItem.nextElementSibling.nextElementSibling.style.borderColor = '#dc0404'
                listItem.nextElementSibling.nextElementSibling.children[0].setAttribute('src', 'img/close-cross-red.svg')         
            })

            listItem.addEventListener('mouseout', () => {
                if(listItem.nextElementSibling.getAttribute('greenstatus-true')) {
                    listItem.style.color = 'turquoise'
                } else {
                    listItem.style.color = ''
                }
                    listItem.style.textDecoration = ''
                    listItem.nextElementSibling.nextElementSibling.style.borderColor = ''
                    listItem.nextElementSibling.nextElementSibling.children[0].setAttribute('src', 'img/close-cross-grey.svg')   
            })

            listItem.addEventListener('touchstart', () => {
                listItem.style.color = '#dc0404'
                listItem.style.textDecoration = 'line-through'
                listItem.nextElementSibling.nextElementSibling.style.borderColor = '#dc0404'
                listItem.nextElementSibling.nextElementSibling.children[0].setAttribute('src', 'img/close-cross-red.svg') 
            })
        })

        // Draggable List with SortableJS

        Sortable.create(toDoList, {
            animation: 350,
            handle: '.drag-element',
        })
    }

// Info Popup

const popupCrossCircle = document.querySelector('.popup-cross')
const popupCross = document.querySelector('.cross-white')

popupCrossCircle.addEventListener('mouseover', e => {
    popupCross.style.transform = 'scale(1.4)'
})

popupCrossCircle.addEventListener('mouseout', e => {
    popupCross.style.transform = 'scale(1)'
})
    
// TODOOLIO Progress Meter

greenstatusTrueArray = []
const todoolioProgressMeter = document.querySelector('.todoolio-progress-meter')
const progressPercentage = document.querySelector('.progress-percentage')

function calcMeterHeight() {

    let meterHeight = (greenstatusTrueArray.length / listItemArray.length) * 100

    if(isNaN(meterHeight)) {
        todoolioProgressMeter.style.height = '0%'
        progressPercentage.innerText = '0%'
    } else {
        todoolioProgressMeter.style.height = meterHeight + '%'
        progressPercentage.innerText = parseInt(meterHeight) + '%'
    }
}

// Countdown Timer to 00:00

const counterHours = document.querySelector('.counter-hours')
const counterMinutes = document.querySelector('.counter-minutes')
const counterSeconds = document.querySelector('.counter-seconds')
const todoolioHoursMeter = document.querySelector('.todoolio-hours-meter')
const hoursLeftDisplay = document.querySelector('.hours-left')

function triggerCountDown() {
    const startCountDown = setTimeout(function() {
        const currentTime = new Date()
        counterHours.innerText = 23 - currentTime.getHours()
        counterMinutes.innerText = 59 - currentTime.getMinutes()
        counterSeconds.innerText = 60 - currentTime.getSeconds()
    }, 1000)
    
    const updateCountDown = setInterval(function() {
        
        const currentTime = new Date()
        counterSeconds.innerText = 60 - currentTime.getSeconds()
    
        if(counterSeconds.innerText != '60') return
        counterMinutes.innerText = 59 - currentTime.getMinutes()
    
        if(counterMinutes.innerText != '59') return
        counterHours.innerText = 23 - currentTime.getHours()
        todoolioHoursMeter.style.height = ((23 - currentTime.getHours()) / 24) * 100 + '%'
        hoursLeftDisplay.innerText = 23 - currentTime.getHours() + 'h'
    }, 1000)
}

// TODOOLIO hours left meter

const currentTime = new Date()

function triggerCalcHoursLeft() {
    calcHoursLeft()
}

function calcHoursLeft() {
    todoolioHoursMeter.style.height = ((23 - currentTime.getHours()) / 24) * 100 + '%'
    hoursLeftDisplay.innerText = 23 - currentTime.getHours() + 'h'
}

// Lottie success Animation - Star

var successAnimationStar = bodymovin.loadAnimation({
    container: document.getElementById('success-animation-star'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'lottie/animation-star.json'
})

const starSuccessAnimationDiv = document.querySelector('#success-animation-star')
starSuccessAnimationDiv.style.display = 'none'
let arrayCounter1 = []
let arrayCounter2 = []

function triggerStarSuccessAnimation() {

    if(menuOpenStatus === false) {
        starSuccessAnimationDiv.style.display = 'block'
        successAnimationStar.playSegments([0,90], true)

        arrayCounter1.push(1)

        setTimeout(() => {
            arrayCounter2.push(1)
            if(arrayCounter1.length === arrayCounter2.length) {
                starSuccessAnimationDiv.style.display = 'none'
                arrayCounter1 = []
                arrayCounter2 = []
            }
        }, 3000)
    }
}

// Lottie Success Animation - Rocket

var successAnimationRocket = bodymovin.loadAnimation({
    container: document.getElementById('success-animation-rocket'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'lottie/animation-rocket.json'
})

const animationRocketDiv = document.querySelector('#success-animation-rocket')
let countHowOftenRocketStarted = []

function triggerRocketSuccessAnimation() {
    if(greenstatusTrueArray.length === listItemArray.length && listItemArray.length != 0 && menuOpenStatus === false && countHowOftenRocketStarted.length < 2) {
        animationRocketDiv.style.display = 'block'
        animationRocketDiv.style.animationName = 'startRocket'
        successAnimationRocket.playSegments([0,128], true)
        countHowOftenRocketStarted.push(1)
    }
}

// Delete first & last item

const listItem = document.querySelector('list-item')
const btnRemoveLast = document.querySelector('.btn-remove-last')
const btnRemoveFirst = document.querySelector('.btn-remove-first')

        btnRemoveLast.addEventListener('click', e => {

            if(toDoList.lastChild.querySelector('.checkmark-circle').getAttribute('greenstatus-true')) {
                listItemArray.pop()
                greenstatusTrueArray.pop()

            } else {
                listItemArray.pop()
            }

            toDoList.lastChild.remove()
            calcMeterHeight()
        })

        btnRemoveFirst.addEventListener('click', e => {

            if(toDoList.firstChild.querySelector('.checkmark-circle').getAttribute('greenstatus-true')) {
                listItemArray.pop()
                greenstatusTrueArray.pop()

            } else {
                listItemArray.pop()
            }

            toDoList.firstChild.remove()
            calcMeterHeight()
        })

// Delete all items

const btnRemoveAll = document.querySelector('.btn-remove-all')

        btnRemoveAll.addEventListener('click', e => {
            toDoList.innerHTML = ''
            listItemArray = []
            greenstatusTrueArray = []
            calcMeterHeight()
        })

// Success Modal

const btnOpenModal = document.querySelector('.btn-modal-open')
const btnCloseModal = document.querySelector('.btn-modal-close')
const successModal = document.querySelector('.modal')
const darkOverlay = document.querySelector('.overlay')

btnOpenModal.addEventListener('click', e => {
    successModal.classList.add('open')
    darkOverlay.classList.add('open')
})

btnCloseModal.addEventListener('click', e => {
    successModal.classList.remove('open')
    darkOverlay.classList.remove('open')
})

darkOverlay.addEventListener('click', e => {
    if(numberIndex === null) {
    successModal.classList.remove('open')
    darkOverlay.classList.remove('open')
    }
})

// Open Mega Menu & Show Control Buttons

const burgerBtn = document.querySelector('.menu-btn')
const megaMenu = document.querySelector('.mega-menu')
const btnControls = document.querySelectorAll('.btn-control')
let menuOpenStatus = false

if("ontouchstart" in document.documentElement) {
    burgerBtn.addEventListener('touchstart', e => {
        openMenu()
    })
} else {
    burgerBtn.addEventListener('click', e => {
        openMenu()
    })
}

function openMenu() {
    if(menuOpenStatus === false) {

        starSuccessAnimationDiv.style.display = 'none'
        animationRocketDiv.style.display = 'none'
        burgerBtn.classList.add('open-burger')
        megaMenu.style.borderTop = '1px solid white'
        megaMenu.style.boxShadow = '0 5px 4px 0 hsla(0, 0%, 5%, .3)'

        if(window.matchMedia('(max-width: 768px)').matches) {
            megaMenu.style.height = '230px'
            megaMenu.style.borderBottom = '1px solid white'
        } else {
            megaMenu.style.height = '130px'
        }

        setTimeout(e => {
            if(megaMenu.style.height === '230px' || megaMenu.style.height === '130px') {
                btnControls.forEach(button => {
                    button.style.display = 'inline-block'
                })
            }
        }, 420)

        menuOpenStatus = true

    } else if(menuOpenStatus === true) {

        closeMenu()
    }
}

function closeMenu() {
    burgerBtn.classList.remove('open-burger')
    megaMenu.style.height = '0'
    megaMenu.style.borderTop = 'none'
    megaMenu.style.borderBottom = 'none'
    btnControls.forEach(button => {
        button.style.display = 'none'
    })

    menuOpenStatus = false
    infoPopup.classList.remove('active-popup')
    if(greenstatusTrueArray.length === listItemArray.length && listItemArray.length != 0) {
        countHowOftenRocketStarted.push(1)
    }
    triggerRocketSuccessAnimation()
}

// Close Menu only when hero is clicked

        document.addEventListener('click', e => {

            if(e.target.matches('.particles-js-canvas-el')) {

                closeMenu()
            }
        })

// Email Banner

const emailSection = document.querySelector('.email-section')
const closeIcon = document.querySelector('.close-icon')
const openIcon = document.querySelector('.open-icon')
const emailInput = document.querySelector('.email-input')

window.addEventListener('scroll', openEmailSection)

function openEmailSection() {
    if(window.pageYOffset > window.innerHeight * .68) {

        if(window.matchMedia('(max-width: 768px)')) {
            emailSection.style.height = '360px'
        } else {
            emailSection.style.height = '340px'
        }
        window.removeEventListener('scroll', openEmailSection)
    }
}

if("ontouchstart" in document.documentElement) {
    closeIcon.addEventListener('touchstart', () => {
        closeEmailOptIn()
    })
    openIcon.addEventListener('touchstart', () => {
        openEmailOptIn()
    })

} else {
    closeIcon.addEventListener('click', () => {
        closeEmailOptIn()
    })
    openIcon.addEventListener('click', () => {
        openEmailOptIn()
    })
}

function openEmailOptIn() {
    emailSection.style.height = '340px'
    openIcon.style.right = '-999px'
}

function closeEmailOptIn() {
    emailSection.style.height = '0'
    setTimeout(() => {
        openIcon.style.right = '20px'
    }, 500)
}

// FAQ open and close

const faqSection = document.querySelector('.faq-section')
const faqItem = document.querySelectorAll('.faq-item')

faqItem.forEach(item => {

    if("ontouchstart" in document.documentElement) {
        item.addEventListener('touchstart', e => {
            toggleFAQ()
        })
    } else {
        item.addEventListener('click', e => {
            toggleFAQ()
        })
    }

    function toggleFAQ() {
        if(item.children[1].className !== 'faq-answer active' && faqSection.querySelector('.faq-answer.active')) {
            const activeAnswer = faqSection.querySelector('.faq-answer.active')
            const activeQuestionColor = faqSection.querySelector('.add-clr')
            const activeArrow = faqSection.querySelector('.turn-arrow')
            activeAnswer.classList.remove('active')
            activeQuestionColor.classList.remove('add-clr')
            activeArrow.classList.remove('turn-arrow')
        }
        item.querySelector('.faq-answer').classList.toggle('active')
        item.querySelector('.faq-question svg').classList.toggle('turn-arrow')
        item.querySelector('.faq-question h2').classList.toggle('add-clr')
    }
})

// FAQ content toggle

const faqSwitchContainer = document.querySelector('.faq-switch-container')
const faqSwitch = document.querySelector('.faq-switch')
const faqNumber1 = document.querySelector('.faq-switch-number1')
const faqNumber2 = document.querySelector('.faq-switch-number2')
const faqContentOne = document.querySelector('.faq-content1')
const faqContentTwo = document.querySelector('.faq-content2')

let checkContentStatus = true 

if("ontouchstart" in document.documentElement) {
    faqSwitchContainer.addEventListener('touchstart', e => {
        switchFAQ()
    })
} else {
    faqSwitchContainer.addEventListener('click', e => {
        switchFAQ()
    })
}

function switchFAQ() {
    faqSwitch.classList.toggle('faq-switch-on')

    if(checkContentStatus === true) {
        faqContentOne.style.left = '-2600px'
        faqContentTwo.style.left = '0'
        faqNumber1.style.color = 'hsl(0, 0%, 33%)'
        faqNumber2.style.color = 'turquoise'
        checkContentStatus = false

    } else if(checkContentStatus === false) {
        faqContentOne.style.left = '0'
        faqContentTwo.style.left = '2600px'
        faqNumber1.style.color = 'turquoise'
        faqNumber2.style.color = 'hsl(0, 0%, 33%)'
        checkContentStatus = true
    }
}

// Fade Banner Text In and Out

const headlineOne = document.querySelector('.banner-text-one')
const headlineTwo = document.querySelector('.banner-text-two')

    window.setInterval(fadeBannerText, 10000)

    function fadeBannerText() {
        headlineOne.style.opacity = '0'
        headlineTwo.style.opacity = '1'

        setTimeout(function() {
            headlineOne.style.opacity = '1'
            headlineTwo.style.opacity = '0'
        }, 5000)
    }

// Testimonial Carousel Slider

const carouselContent = document.querySelector('.carousel-content')
const slides = Array.from(carouselContent.children)
const rightButton = document.querySelector('.carousel-btn-right')
const leftButton = document.querySelector('.carousel-btn-left')
const pointNav = document.querySelector('.carousel-point-nav')
const navPointArray = Array.from(pointNav.children)

const slideWidth = slides[0].getBoundingClientRect().width

// arrange slides next to each other

slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px'
})

// click right & move slides

if("ontouchstart" in document.documentElement) {
    rightButton.addEventListener('touchstart', e => {
        rightButtonClicked()
    })
    leftButton.addEventListener('touchstart', e => {
        leftButtonClicked()
    })
    pointNav.addEventListener('touchstart', e => {
        navPointsClicked(e)
    })

} else {
    rightButton.addEventListener('click', e => {
        rightButtonClicked()
    })
    leftButton.addEventListener('click', e => {
        leftButtonClicked()
    })
    pointNav.addEventListener('click', e => {
        navPointsClicked(e)
    })
}

function rightButtonClicked() {
    const activeSlide = document.querySelector('.active-slide')
    const targetSlide = activeSlide.nextElementSibling
    moveSlide(carouselContent, activeSlide, targetSlide)

    const activePoint = pointNav.querySelector('.active-point')
    const targetPoint = activePoint.nextElementSibling
    updatePoints(activePoint, targetPoint)

    const nextIndex = slides.findIndex(slide => slide === targetSlide)
    hideNavArrow(slides, leftButton, rightButton, nextIndex)
}

// click left & move slides

function leftButtonClicked() {
    const activeSlide = document.querySelector('.active-slide')
    const targetSlide = activeSlide.previousElementSibling
    const amountToMove = targetSlide.style.left
    carouselContent.style.transform = 'translateX(' + amountToMove + ')'
    moveSlide(carouselContent, activeSlide, targetSlide)
 
    const activePoint = pointNav.querySelector('.active-point')
    const targetPoint = activePoint.previousElementSibling
    updatePoints(activePoint, targetPoint)
 
    const prevIndex = slides.findIndex(slide => slide === targetSlide)
    hideNavArrow(slides, leftButton, rightButton, prevIndex)
}

// Create Function for moving Slide

const moveSlide = (carouselContent, activeSlide, targetSlide) => {
    carouselContent.style.transform = 'translateX(-' + targetSlide.style.left  + ')'
    activeSlide.classList.remove('active-slide')
    targetSlide.classList.add('active-slide')
}

// Update NavPoint Color on arrowClick

const updatePoints = (activePoint, targetPoint) => {
    activePoint.classList.remove('active-point')
    targetPoint.classList.add('active-point')
}

// hide arrow when on first or last slide

const hideNavArrow = (slides, leftButton, rightButton, clickedPointIndex) => {
    if (clickedPointIndex === 0) {
        leftButton.classList.add('btn-is-hidden')
        rightButton.classList.remove('btn-is-hidden')
    } else if (clickedPointIndex === slides.length - 1) {
        rightButton.classList.add('btn-is-hidden')
        leftButton.classList.remove('btn-is-hidden')
    } else {
        rightButton.classList.remove('btn-is-hidden')
        leftButton.classList.remove('btn-is-hidden')
    }
}

// move Slides with nav Points

function navPointsClicked(e) {
    const clickedPoint = e.target.closest('button')
    if (!clickedPoint) return
    const activeSlide = carouselContent.querySelector('.active-slide')
    const activePoint = pointNav.querySelector('.active-point')
    const clickedPointIndex = navPointArray.findIndex(point => point === clickedPoint)
    const targetSlide = slides[clickedPointIndex]
    moveSlide(carouselContent, activeSlide, targetSlide)

    // change color for active point onclick
    activePoint.classList.remove('active-point')
    clickedPoint.classList.add('active-point')
    updatePoints(activePoint, clickedPoint)

    hideNavArrow(slides, leftButton, rightButton, clickedPointIndex)
}