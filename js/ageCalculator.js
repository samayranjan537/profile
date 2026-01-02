/* ===================================================================
 * Samay's Profile - Age Calculator JS
 *
 *
 * ------------------------------------------------------------------- */



// Fixed DOB
const DOB = "31/08/2024";

// Calculate on page load
document.getElementById("age").innerHTML = calculateAge(DOB);

function calculateAge(dobStr) {
      const [day, month, year] = dobStr.split('/').map(Number);

      // Create UTC dates (timezone safe)
      const birthDate = new Date(Date.UTC(year, month - 1, day));
      const today = new Date();
      const currentDate = new Date(Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate()
      ));

      let years = currentDate.getUTCFullYear() - birthDate.getUTCFullYear();
      let months = currentDate.getUTCMonth() - birthDate.getUTCMonth();
      let days = currentDate.getUTCDate() - birthDate.getUTCDate();

      if (days < 0) {
        const prevMonth = new Date(Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          0
        ));
        days += prevMonth.getUTCDate();
        months--;
      }

      if (months < 0) {
        months += 12;
        years--;
      }

      let yearsString = 'year';
      if (years > 1) {
        yearsString += 's';
      }

      let monthsString = 'month';
      if (month > 1) {
        monthsString += 's';
      }

      let daysString = 'day';
      if (days > 1) {
        daysString += 's';
      }

      return `
            <strong>${years}</strong> ${yearsString}
            <strong>${months}</strong> ${monthsString} and
            <strong>${days}</strong> ${daysString}
          `;
    }