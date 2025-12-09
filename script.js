const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}


const updateexchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    const fromCode = fromcurr.value.toLowerCase();
    const toCode = tocurr.value.toLowerCase();
    const URL = `${BASE_URL}/${fromCode}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    // rate from fromCode -> toCode
    let rate = data[fromCode][toCode];
    console.log("Rate:", rate);
    let finalAmount = amtval * rate;
    // console.log("Converted amount:", finalAmount);
    msg.innerText =  `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
};

const updateFlag = (element) => {
    let currcode = element.value;
    // console.log(currcode);
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};




// btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtval = amount.value;
//     if(amtval === "" || amtval<1){
//         amtval = 1;
//         amount.value="1";
//     }
//     const URL = `${BASE_URL}/${fromcurr}/${tocurr}.json`;
//     let response = await fetch(URL);
//     console.log(response);
// });


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateexchangerate();
});

window.addEventListener("load",() =>{
    updateexchangerate();
});
