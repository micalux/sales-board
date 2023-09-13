// Product A info
let productA = {
    emoji: "⭐",
    revenue: 200,
    commission: 50
}

// Product B info
let productB = {
    emoji: "🔥",
    revenue: 300,
    commission: 75
}


const AproductButtonEl = document.getElementById("a-product-button")
const BproductButtonEl = document.getElementById("b-product-button")
const resetButtonEl = document.getElementById("reset-button")
const toggleButtonEl = document.getElementById("toggle-button")

const salesNumberEl = document.getElementById("sales-number")
const salesFieldEl = document.getElementById("sales-field")

const achievementsNumberEl = document.getElementById("achievements-number")
const achievementsFieldEl = document.getElementById("achievements-field")

const totRevenueEl = document.getElementById("tot-revenue")
const totCommissionEl = document.getElementById("tot-commission")

let liveSalesNumber = 0
let liveSalesEmoji = []

let liveAchievementsNumber = 0
let liveAchievementsEmoji = []

let totRevenue = 0
let totCommission = 0

let localLiveSalesNumber = localStorage.getItem("liveSalesNumber")
let localLiveSalesEmoji = JSON.parse(localStorage.getItem("liveSalesEmoji"))

let localLiveAchievementsNumber = localStorage.getItem("liveAchievementsNumber")
let localLiveAchievementsEmoji = JSON.parse(localStorage.getItem("liveAchievementsEmoji"))

let localTotRevenue = localStorage.getItem("totRevenue")
let localTotCommission = localStorage.getItem("totCommission")

const bell = "🔔"
const moneyBag = "💰"
const trophy = "🏆"


if (localLiveSalesNumber) {
     liveSalesNumber = localLiveSalesNumber
     liveSalesEmoji = localLiveSalesEmoji
   
     liveAchievementsNumber = localLiveAchievementsNumber
     liveAchievementsEmoji = localLiveAchievementsEmoji
   
     totRevenue = localTotRevenue
     totCommission = localTotCommission

    renderText()
   }
   

AproductButtonEl.addEventListener("click", function() {
    liveSalesNumber += 1
    totRevenue += productA.revenue
    totCommission += productA.commission

    addEmojiToLiveField(liveSalesEmoji, productA)
    renderText()
    saveToLocalStorage()
})


BproductButtonEl.addEventListener("click", function() {
    liveSalesNumber += 1
    totRevenue += productB.revenue
    totCommission += productB.commission

    addEmojiToLiveField(liveSalesEmoji, productB)
    renderText()
    saveToLocalStorage()
})


function renderText() {
    salesFieldEl.innerText = liveSalesEmoji.join(" ")
    achievementsFieldEl.innerText = liveAchievementsEmoji.join(" ")

    salesNumberEl.innerText = `Live Sales - ${liveSalesNumber}`
    achievementsNumberEl.innerText = `Live Achievements - ${liveAchievementsNumber}`

    totRevenueEl.innerText = `$ ${totRevenue}`
    totCommissionEl.innerText = `$ ${totCommission}`
}


function addEmojiToLiveField(array, product) {
    array.push(product.emoji)

    if (liveSalesNumber === 1) {
        liveAchievementsNumber += 1
        addEmoji(bell)

    } else if (totRevenue >= 2500 && liveAchievementsNumber === 1) {
        liveAchievementsNumber += 1
        addEmoji(moneyBag)
        
    } else if (liveSalesNumber === 15) {
        liveAchievementsNumber += 1
        addEmoji(trophy)
    }
}


function addEmoji(emoji) {
    liveAchievementsEmoji.push(emoji)
}


resetButtonEl.addEventListener("click", function() {
    localStorage.clear()

    liveSalesNumber = 0
    liveAchievementsNumber = 0
    
    liveSalesEmoji = []
    liveAchievementsEmoji = []

    totRevenue = 0
    totCommission = 0

    renderText()
})


toggleButtonEl.addEventListener("click", function() {
    const mainElement = document.getElementById("container");
    mainElement.classList.toggle("dark-mode")

    const secondElements = document.getElementsByClassName("field")
    for (const element of secondElements) {
        element.classList.toggle("dark-mode-alt")
    }
})


function saveToLocalStorage() {
    localStorage.setItem("liveSalesNumber",liveSalesNumber)
    localStorage.setItem("liveSalesEmoji", JSON.stringify(liveSalesEmoji))

    localStorage.setItem("liveAchievementsNumber",liveAchievementsNumber)
    localStorage.setItem("liveAchievementsEmoji", JSON.stringify(liveAchievementsEmoji))

    localStorage.setItem("totRevenue",totRevenue)
    localStorage.setItem("totCommission",totCommission)
}