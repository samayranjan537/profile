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

      var yearsString = '<strong>' + years + '</strong> year';
      if (years == 0) {
        yearsString = '';
      } else if (years > 1) {
        yearsString += 's';
      }

      var monthsString = ' <strong>' + months + '</strong> month';
      if (month == 0) {
        monthsString = '';
      } else if(month > 1) {
        monthsString += 's';
      }

      var daysString = ' <strong>' + days + '</strong> day';
      if (days == 0) {
        daysString = '';
      } else if (days > 1) {
        daysString += 's';
      }

      return `${yearsString}${monthsString}${daysString}`;
    }