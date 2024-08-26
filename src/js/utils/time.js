export function startUtahClock() {
  // Function to get formatted Utah time
  function getUtahTime() {
    const options = {
      timeZone: "America/Denver", // Mountain Time (Utah)
      hour: "2-digit",
      minute: "2-digit",
      //second: "2-digit", // Include seconds for live updating
      hour12: true, // 12-hour format
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(new Date());
  }

  // Function to update all elements with data-time="utah"
  function updateTime() {
    const timeElements = document.querySelectorAll('[data-time="utah"]');

    timeElements.forEach((element) => {
      element.textContent = getUtahTime();
    });
  }

  // Initial call to display the time immediately
  updateTime();

  // Update the time every second for a live clock effect
  setInterval(updateTime, 1000);
}
