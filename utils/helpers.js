module.exports = {
  format_date: (date) => {
    // Format date as DD/MM/YYYY

    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getDate() +
      '-' +
      (current_datetime.getMonth() + 1) +
      '-' +
      current_datetime.getFullYear();
    console.log(formatted_date);

    // return date.toLocaleDateString();

    return formatted_date;
  },

};
