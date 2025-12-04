// -------------------------------------------
// 🪄 Witch Mode Toggle
// -------------------------------------------
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// default mode = witch mode
body.classList.add("witch-mode");
let isWitch = true;

themeIcon.addEventListener("click", () => {
  isWitch = !isWitch;

  if (isWitch) {
    body.classList.remove("light-mode");
    body.classList.add("witch-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    body.classList.remove("witch-mode");
    body.classList.add("light-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
});

// -------------------------------------------
// Account Number Mask / Unmask
// -------------------------------------------
const accountNumber = "102230379866";
const eyeBtn = document.getElementById("see-account-number");
const accountNoText = document.getElementById("account-no-text");
let accountNoVisible = false;

eyeBtn.addEventListener("click", () => {
  accountNoVisible = !accountNoVisible;

  if (accountNoVisible) {
    // Show full account number
    accountNoText.innerText = accountNumber;

    // FIXED: make sure FA renders correct icon
    eyeBtn.classList.remove("fa-eye-slash");
    eyeBtn.classList.add("fa-eye");
    eyeBtn.classList.add("fa-solid"); 
  } else {
    // Mask account number
    accountNoText.innerText = `*********${accountNumber.slice(-3)}`;

    // Return to slashed eye
    eyeBtn.classList.remove("fa-eye");
    eyeBtn.classList.add("fa-eye-slash");
    eyeBtn.classList.add("fa-solid");
  }
});

// -------------------------------------------
// Transactions + Account Summary
// -------------------------------------------
let balance = 0;
const balanceText = document.getElementById("balance");
const transactionList = document.getElementById("transactions");

function updateBalances() {
  balanceText.innerText = `$${balance.toFixed(2)}`;
}

function renderTransaction(type, amount) {
  const date = new Date().toLocaleString();

  const div = document.createElement("div");
  div.classList.add("transaction");

  div.innerHTML = `
    <strong>${type}:</strong> <span>${amount.toFixed(2)}</span><br>
    <small>${date}</small>
  `;

  transactionList.prepend(div);
}

// -------------------------------------------
// Deposit
// -------------------------------------------
const depositBtn = document.getElementById("deposit-btn");
const depositInput = document.getElementById("deposit-amount");

depositBtn.addEventListener("click", () => {
  const amount = Number(depositInput.value);
  if (!amount || amount <= 0) {
    showAlert("Please enter a valid deposit amount.", "danger");
    return;
  }

  balance += amount;
  updateBalances();
  renderTransaction("Deposit", amount);
  showAlert(`Successfully deposited $${amount.toFixed(2)}.`, "success");

  depositInput.value = "";
});

// -------------------------------------------
// Withdraw / Transfer Out
// -------------------------------------------
const withdrawBtn = document.getElementById("withdraw-btn");
const withdrawInput = document.getElementById("withdraw-amount");

withdrawBtn.addEventListener("click", () => {
  const amount = Number(withdrawInput.value);
  if (!amount || amount <= 0) {
    showAlert("Please enter a valid transfer amount.", "danger");
    return;
  }

  if (amount > balance) {
    showAlert("Insufficient funds for this transfer.", "danger");
    return;
  }

  balance -= amount;
  updateBalances();
  renderTransaction("Transfer Out", -amount);
  showAlert(`Transfer of $${amount.toFixed(2)} completed.`, "success");

  withdrawInput.value = "";
});

// -------------------------------------------
// Alerts (Success + Error)
// -------------------------------------------
function showAlert(message, type) {
  const alertArea = document.getElementById("alert-area");
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show alert-slide" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;

  alertArea.append(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 3500);
}

// -------------------------------------------
// Account Number Visibility Toggle
// -------------------------------------------
const seeAccountBtn = document.getElementById("see-account-number");
const accountNoText = document.getElementById("account-no-text");
let isAccountVisible = false;
const fullAccountNumber = "1234567890866";

seeAccountBtn.addEventListener("click", () => {
  isAccountVisible = !isAccountVisible;
  accountNoText.textContent = isAccountVisible ? fullAccountNumber : "********866";
  seeAccountBtn.classList.toggle("fa-eye-slash");
  seeAccountBtn.classList.toggle("fa-eye");
});

// -------------------------------------------
// Screen Navigation
// -------------------------------------------
function showScreen(screenID) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));

  document.getElementById(screenID).classList.add("active");
}
