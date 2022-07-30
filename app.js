// an empty array to push data from json
let current = [];
// the array for charts of weekdays
const days = [...document.querySelectorAll(".days")];
const today = new Date().toString("en-us", { weekday: "long" }).slice(0, 3);

// const for fetch the data from json and manipulate the view of the card according to it
const daysData = fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (const d of data) {
      current.push(d);
    }

    for (let i = 0; i < days.length; i++) {
      if (days[i].id == current[i].day)
        days[i].ariaValueNow = current[i].amount;
    }
    let largestAmount = 0;
    days.forEach((e) => {
      if (Math.round(largestAmount) < Math.round(e.ariaValueNow)) {
        return (largestAmount = e.ariaValueNow);
      }
      console.log(largestAmount);
    });
    for (const day of days) {
      let chartHeight = day.ariaValueNow / largestAmount;
      day.style.height = chartHeight * 100 + "%";
      day.ariaValueNow = "$" + day.ariaValueNow;
    }
  });

// giving the current day a different color
let todayChartColor = () => {
  for (let i = 0; i < days.length; i++) {
    if (days[i].id == today.toLocaleLowerCase())
      days[i].style.backgroundColor = "var(--Softer-red)";
  }
};
todayChartColor();
