// ----- Navigation Switching -----
const navLinks = document.querySelectorAll("#bank-nav .nav-link");
const screens = document.querySelectorAll(".screen");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    
    const target = link.getAttribute("data-screen");

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    screens.forEach(s => s.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});
// -------------------------------------------
// 🪄 Witch Mode Toggle (Dark / Light Switch)
// -------------------------------------------

const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// default mode
body.classList.add("witch-mode");
let isWitch = true;

themeIcon.addEventListener("click", () => {
  isWitch = !isWitch;

  if (isWitch) {
    body.classList.remove("light-mode");
    body.classList.add("witch-mode");
    themeIcon.classList.remove("bi-sun-fill");
    themeIcon.classList.add("bi-moon-stars");
  } else {
    body.classList.remove("witch-mode");
    body.classList.add("light-mode");
    themeIcon.classList.remove("bi-moon-stars");
    themeIcon.classList.add("bi-sun-fill");
  }
});


// ALERT SYSTEM
function showAlert(message, type = "success") {
  const alertArea = document.getElementById("alert-area");

  let icon = "";
  if (type === "success") icon = `<i class="bi bi-check-circle-fill me-2"></i>`;
  if (type === "danger") icon = `<i class="bi bi-x-circle-fill me-2"></i>`;

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-slide`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
    ${icon} ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  alertArea.appendChild(alertDiv);


    setTimeout(() => {
        alertDiv.classList.remove("show");
        setTimeout(() => alertDiv.remove(), 150);
    }, 4000);
}


// ---- Banking Functionality ----
// This script manages the balance and transaction history of a simple banking application.
let balance = 0;
let transactions = [];

const balanceText = document.getElementById("balance");
balanceText.textContent = `$${balance.toFixed(2)}`;

function updateSummary() {
    balanceText.textContent = `$${balance.toFixed(2)}`;

    const list = document.getElementById("transactions");
    list.innerHTML = '';

    transactions.forEach(t => {
        const div = document.createElement('div');
        div.classList.add('transaction');
        div.innerHTML = `
            <strong>${t.type}</strong>: $${t.amount} <br>
            <small>${t.date}</small>
        `;
        list.prepend(div);
    });
}

// DEPOSIT
document.getElementById("deposit-btn").addEventListener("click", () => {
  const amount = Number(document.getElementById("deposit-amount").value);

  if (!amount || amount <= 0) {
    showAlert("Please enter a valid deposit amount.", "danger");
    return;
  }

  balance += amount;

  transactions.push({
    type: "Deposit",
    amount: `+$${amount.toFixed(2)}`,
    date: new Date().toLocaleString()
  });

  updateSummary();
  showAlert(`Successfully deposited $${amount.toFixed(2)}.`, "success");
});

// WITHDRAW
document.getElementById("withdraw-btn").addEventListener("click", () => {
  const amount = Number(document.getElementById("withdraw-amount").value);

  if (!amount || amount <= 0) {
    showAlert("Please enter a valid transfer amount.", "danger");
    return;
  }

  if (amount > balance) {
    showAlert("Insufficient funds for this transfer.", "danger");
    return;
  }

  balance -= amount;

  transactions.push({
    type: "Transfer Out",
    amount: `-$${amount.toFixed(2)}`,
    date: new Date().toLocaleString()
  });

  updateSummary();
  showAlert(`Transfer of $${amount.toFixed(2)} completed.`, "success");

});
