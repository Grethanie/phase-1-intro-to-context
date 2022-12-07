// Your code here

let createEmployeeRecord = (details) => {
  let employee = {};

  employee.firstName = details[0];
  employee.familyName = details[1];
  employee.title = details[2];
  employee.payPerHour = details[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = [];

  return employee;
};

let createEmployeeRecords = (records) => {
  return records.map((record) => createEmployeeRecord(record));
};

function createTimeInEvent(record, timeIn) {
  let hour = timeIn.split(" ")[1];
  let date = timeIn.split(" ")[0];
  let timeObj = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: `${date}`,
  };
  record.timeInEvents.push(timeObj);
  return record;
}

function createTimeOutEvent(record, timeOut) {
  let hour = timeOut.split(" ")[1];
  let date = timeOut.split(" ")[0];
  let timeObj = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: `${date}`,
  };
  record.timeOutEvents.push(timeObj);
  return record;
}

function hoursWorkedOnDate(employee, date) {
  let length = employee.timeInEvents.length;
  let hours = 0;
  for (let i = 0; i < length; i++) {
    if (employee.timeInEvents[i].date === date)
      hours +=
        (employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour) / 100;
  }
  return hours;
}

function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

function allWagesFor(employee) {
  let wages = 0;
  let alreadySeenDates = [];
  employee.timeInEvents.forEach((element) => {
    if (!alreadySeenDates.includes(element.date)) {
      wages += wagesEarnedOnDate(employee, element.date);
      alreadySeenDates.push(element.date);
    }
  });
  return wages;
}

function calculatePayroll(records) {
  let total = 0;
  records.forEach((record) => {
    total += allWagesFor(record);
  });
  return total;
}

let thor = createEmployeeRecord([
  ["Thor", "Odinsson", "Electrical Engineer", 45],
]);
createTimeInEvent(thor, "1965-01-18 1200");
createTimeOutEvent(thor, "1965-01-18 1400");
createTimeInEvent(thor, "1965-01-18 1600");
createTimeOutEvent(thor, "1965-01-18 1800");
console.log(hoursWorkedOnDate(thor, "1965-01-18"));
