var validation = {
  isEmail: function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  isPhone: function(phone) {
    var re = /^\d{10}$/;
    return re.test((phone || "").replace(/\D/gi, ''));
  },

  isZip: function(zipcode) {
    var re = /^\d{5}$/;
    return re.test(zipcode);
  },

  isDOB: function(val) {
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(val) &&
      !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(val)
    ) {
      return false;
    }

    try {
      var dateVal = new Date(val);
      return dateVal < new Date();

    } catch (error) {
      return false;
    }

  }
};

export default validation;
