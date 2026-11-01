# Demoblaze E2E Automation Testing with Playwright

This project contains End-to-End (E2E) automated test scripts for the e-commerce website [Demoblaze](https://www.demoblaze.com/) using **Playwright** and **JavaScript**.

---

## 🚀 Features Tested
1. **User Sign-up:** Dynamically generates a unique user account and completes registration with browser alert handling.
2. **User Login:** Logs into the application using the newly created credentials and validates the welcome message.
3. **Product Navigation & Cart:** Navigates to the "Laptops" category, selects "Sony vaio i5", adds it to the shopping cart, and verifies product addition.
4. **Checkout & Purchase Flow:** Fills out the checkout modal form, completes the order, and verifies the success confirmation message ("Thank you for your purchase!").

---

## 🛠️ Tech Stack
* **Test Automation Framework:** [Playwright](https://playwright.dev/)
* **Programming Language:** JavaScript (Node.js)
* **Test Runners:** Cross-browser execution (Chromium, Firefox, WebKit)

---

## 📋 Prerequisites
Before running the tests, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (LTS version recommended)
* Git

---

## ⚙️ Installation & Setup

1. **Clone the repository or open your project folder:**
   ```bash
   cd demoblaze-playwright
   npm install
   npx playwright install
   npx playwright test demoblaze.spec.js --project=chromium --headed
   npx playwright show-report

