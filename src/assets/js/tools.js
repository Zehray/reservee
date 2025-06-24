import { formatCurrency, debounce } from "./utils.js";

// Tools page calculators
class CafeTools {
  constructor() {
    this.init();
  }

  init() {
    this.initTipCalculator();
    this.initBillSplitter();
    this.initDiscountCalculator();
    this.initReservationCostCalculator();
    this.initLoyaltyPointsCalculator();
  }

  // Tip Calculator
  initTipCalculator() {
    const billAmount = document.getElementById("billAmount");
    const tipPercentage = document.getElementById("tipPercentage");
    const tipAmount = document.getElementById("tipAmount");
    const totalWithTip = document.getElementById("totalWithTip");

    const calculateTip = debounce(() => {
      const bill = parseFloat(billAmount.value) || 0;
      const tipPercent = parseFloat(tipPercentage.value) || 0;

      const tip = bill * (tipPercent / 100);
      const total = bill + tip;

      tipAmount.textContent = formatCurrency(tip);
      totalWithTip.textContent = formatCurrency(total);
    }, 300);

    billAmount.addEventListener("input", calculateTip);
    tipPercentage.addEventListener("input", calculateTip);
  }

  // Bill per Person Calculator
  initBillSplitter() {
    const totalBill = document.getElementById("totalBill");
    const numberOfPeople = document.getElementById("numberOfPeople");
    const tipPercentageSplit = document.getElementById("tipPercentageSplit");
    const perPersonBeforeTip = document.getElementById("perPersonBeforeTip");
    const perPersonWithTip = document.getElementById("perPersonWithTip");

    const calculateSplit = debounce(() => {
      const bill = parseFloat(totalBill.value) || 0;
      const people = parseInt(numberOfPeople.value) || 1;
      const tipPercent = parseFloat(tipPercentageSplit.value) || 0;

      const perPersonBefore = bill / people;
      const tipAmount = bill * (tipPercent / 100);
      const totalWithTipAmount = bill + tipAmount;
      const perPersonAfter = totalWithTipAmount / people;

      perPersonBeforeTip.textContent = formatCurrency(perPersonBefore);
      perPersonWithTip.textContent = formatCurrency(perPersonAfter);
    }, 300);

    totalBill.addEventListener("input", calculateSplit);
    numberOfPeople.addEventListener("input", calculateSplit);
    tipPercentageSplit.addEventListener("input", calculateSplit);
  }

  // Discount Calculator
  initDiscountCalculator() {
    const originalPrice = document.getElementById("originalPrice");
    const discountPercentage = document.getElementById("discountPercentage");
    const discountAmount = document.getElementById("discountAmount");
    const finalPrice = document.getElementById("finalPrice");

    const calculateDiscount = debounce(() => {
      const price = parseFloat(originalPrice.value) || 0;
      const discountPercent = parseFloat(discountPercentage.value) || 0;

      const discount = price * (discountPercent / 100);
      const final = price - discount;

      discountAmount.textContent = formatCurrency(discount);
      finalPrice.textContent = formatCurrency(final);
    }, 300);

    originalPrice.addEventListener("input", calculateDiscount);
    discountPercentage.addEventListener("input", calculateDiscount);
  }

  // Estimated Reservation Cost Calculator
  initReservationCostCalculator() {
    const guestCount = document.getElementById("guestCount");
    const avgPerPerson = document.getElementById("avgPerPerson");
    const drinkUpgrade = document.getElementById("drinkUpgrade");
    const baseCost = document.getElementById("baseCost");
    const upgradeCost = document.getElementById("upgradeCost");
    const estimatedTotal = document.getElementById("estimatedTotal");

    const calculateReservationCost = debounce(() => {
      const guests = parseInt(guestCount.value) || 0;
      const avgCost = parseFloat(avgPerPerson.value) || 0;
      const upgradeAmount = parseFloat(drinkUpgrade.value) || 0;

      const base = guests * avgCost;
      const upgrade = guests * upgradeAmount;
      const total = base + upgrade;

      baseCost.textContent = formatCurrency(base);
      upgradeCost.textContent = formatCurrency(upgrade);
      estimatedTotal.textContent = formatCurrency(total);
    }, 300);

    guestCount.addEventListener("input", calculateReservationCost);
    avgPerPerson.addEventListener("input", calculateReservationCost);
    drinkUpgrade.addEventListener("change", calculateReservationCost);
  }

  // Loyalty Points Calculator
  initLoyaltyPointsCalculator() {
    const spendAmount = document.getElementById("spendAmount");
    const membershipTier = document.getElementById("membershipTier");
    const currentPoints = document.getElementById("currentPoints");
    const pointsEarned = document.getElementById("pointsEarned");
    const totalPoints = document.getElementById("totalPoints");
    const rewardValue = document.getElementById("rewardValue");

    const calculateLoyaltyPoints = debounce(() => {
      const spend = parseFloat(spendAmount.value) || 0;
      const multiplier = parseFloat(membershipTier.value) || 1;
      const existing = parseInt(currentPoints.value) || 0;

      // 1 point per dollar spent, multiplied by tier
      const earned = Math.floor(spend * multiplier);
      const total = existing + earned;

      // Every 100 points = $5 reward
      const rewardAmount = Math.floor(total / 100) * 5;

      pointsEarned.textContent = earned.toString();
      totalPoints.textContent = total.toString();
      rewardValue.textContent = formatCurrency(rewardAmount);
    }, 300);

    spendAmount.addEventListener("input", calculateLoyaltyPoints);
    membershipTier.addEventListener("change", calculateLoyaltyPoints);
    currentPoints.addEventListener("input", calculateLoyaltyPoints);
  }
}

// Initialize tools when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new CafeTools();
});

export default CafeTools;
