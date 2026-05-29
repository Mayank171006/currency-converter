const exchangeRatesURL="https://api.frankfurter.dev/v2/rates";  //BASE URL FOR EXCHANGE RATES
const selector=document.querySelectorAll("select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector("#fromBox select");
const toCurr=document.querySelector("#toBox select");
const ansbox=document.querySelector(".AnswerBox");
const ic=document.querySelector("i");
function updateFlag(element){                                 //Update flag on option change
        let image=element.parentElement.querySelector("img");
        let currCode=element.value;
        let flagCode=countryList[currCode];
        image.src=`https://flagsapi.com/${flagCode}/shiny/64.png`;
        
}
for (let selectobox of selector){
        
        for (currCode in countryList){
                let newOption=document.createElement("option");
                newOption.innerText=currCode;
                newOption.value=currCode;
                
                
                if (selectobox.name==="from" && currCode==="USD"){
                        newOption.selected="selected";

                }
                else if (selectobox.name==="to" && currCode==="INR"){
                        newOption.selected="selected";
                }
                selectobox.append(newOption);
                selectobox.addEventListener("change",(evt)=>{
                        updateFlag(evt.target);
                })
        }
}
const updateExchangeRate=async ()=>{                                  //Update answer box when convert button is clicked
        let amount=document.querySelector("input");
        let amt=amount.value;
        if (isNaN(amt) || amt<0){
                amt=1;
                amount.value='1';
        }
        
        const URL=`${exchangeRatesURL}?base=${fromCurr.value}&quotes=${toCurr.value}`;
        let resp=await fetch(URL);
        let obj=await resp.json();
        let rate=(obj[0]['rate']);
        let newAnswer=`${amt} ${fromCurr.value} = ${Math.round(amt*rate*1000)/1000} ${toCurr.value}`;
        ansbox.innerText=newAnswer;
}
const exchangeCurr=()=>{                                                  //Swap from and to countries
        let op1=document.querySelector(`#fromBox select option[value=${toCurr.value}]`);
        let op2=document.querySelector(`#toBox select option[value=${fromCurr.value}]`);
        op1.selected="selected";
        op2.selected="selected";
        updateFlag(op1.parentElement);
        updateFlag(op2.parentElement);
}
btn.addEventListener("click",(evt)=>{
        evt.preventDefault();
        updateExchangeRate();
});
window.addEventListener("load",(evt)=>{                        
        updateExchangeRate();
})
ic.addEventListener("click",(evt)=>{
        exchangeCurr();
})