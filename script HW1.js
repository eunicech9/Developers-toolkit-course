// (c) Anuflora Systems 
const balance = document.getElementById('balance');
const money_plus = document.getElementById('deposit');
const money_minus = document.getElementById('loan');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');
const reco = document.getElementById('reco');

const TransactionDataAll = [
   { id: 1, customername: 'Flora', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 2, customername: 'Flora', bank: 'OCBC', deposit: 4000, loan: 2000 },
   { id: 3, customername: 'Mikhil', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 4, customername: 'Sashil', bank: 'UOB', deposit: 6000, loan: 1000 },
   { id: 5, customername: 'Jack', bank: 'UOB', deposit: 6000, loan: 8000 }

  ];

 var TransactionData = null;

// [FUNCTIONS]
// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const net_item = document.createElement('li'); //creates <li></li>
  
  if (Math.abs(transaction.deposit)>=Math.abs(transaction.loan)) {
    net_item.classList.add('plus'); //<li class="plus">
    net_item.innerHTML = `
    ${transaction.customername}-${transaction.bank}  
    <span> $ ${Math.abs(transaction.deposit)-Math.abs(transaction.loan)}</span> 
    `; 
  } else {
    net_item.classList.add('minus');
    net_item.innerHTML = `
    ${transaction.customername}-${transaction.bank} 
    <span> -$ ${Math.abs(transaction.loan)-Math.abs(transaction.deposit)}</span> 
    `;
  }

  list.appendChild(net_item); //appends to id="list" under html "Details"
}

// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit); //creates an array of deposits only
  const loans = TransactionData.map(transaction => transaction.loan);       //creates an array of loans only
  const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);  //reduces() the array to a single value.
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const bal = total_deposit - total_loan;
  let max = Math.max(total_deposit,total_loan)
  
  balance.innerText = `$${bal}`;
  money_plus.innerHTML = `$${total_deposit}`;  
  drawBar(money_plus,total_deposit,"#2ecc71",max)   //add bar chart
  money_minus.innerText = `-$${total_loan}`;
  drawBar(money_minus,total_loan,"#c0392b",max)

  console.log(TransactionData.length)
  if (TransactionData.length>0) {
    reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak"; //ternary operator TEST?: TRUE value : FALSE value 
  } else {
    reco.innerText = "Customer name not found ):"
  } 
}

function drawBar(body,data,fill,max) {

  var svg = d3.select(body) // draw canvas
    .append('svg')
    .attr("width",300)
    .attr("height",20);
  
  svg.append("rect")  //draws rectangle at x,y (0,0)
    .attr("fill",fill)
    .attr("height",20)
    .attr("width", data/max*300);
  
}

function init() {
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = [...TransactionDataAll]; //copy array [TransactionDataAll] into [TransactionData]
  TransactionData.forEach(addTransactionDOM);
  updateValues();
}

function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = TransactionDataAll.filter(tran => tran.customername.toLowerCase() == custname.value.toLowerCase());  //input name is case-insenstive
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
}


// [EXECUTION]
/*init();*/
form.addEventListener('submit', filterTransaction); 
