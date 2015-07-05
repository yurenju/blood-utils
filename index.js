'use strict';

module.exports = {
  getYearly: function(donations, year) {
    var total = 0;

    donations.forEach(function(d) {
      if (d.volumeType === 'PH') {
        return;
      }
      var vol = parseInt(d.volumeType);
      var y = (new Date(d.date)).getFullYear();
      if (y === year) {
        total += vol;
      }
    });

    return total;
  },

  getYearlyDonationCount: function(donations, volumeType, year) {
    var count = 0;

    donations.forEach(function(d) {
      var dy = (new Date(d.date)).getFullYear();
      if (d.volumeType === volumeType && dy === year) {
        count++;
      }
    });
    return count;
  },

  checkYearlyVolume: function(gender, donations, year) {
    year = year || (new Date()).getFullYear();
    var yearly = this.getYearly(donations, year);
    if (gender === 'male' && yearly >= 1500) {
      return false;
    }
    if (gender === 'famale' && yearly >= 1000) {
      return false;
    }

    if (this.getYearlyDonationCount(donations, 'PH', year) >= 24) {
      return false;
    }

    return true;
  },

  checkLastDonation: function(volumeType, last, today) {
    today = today || new Date();
    if (!(last instanceof Date)) {
      last = new Date(last);
    }
    if (volumeType instanceof Number) {
      volumeType = volumeType.toString();
    }

    var threshold = 0;
    if (volumeType === '500') {
      // 3 months
      threshold = 30 * 3;
    } else if (volumeType === '250') {
      // 2 months
      threshold = 30 * 2;
    } else if (volumeType === 'PH') {
      // PH: 分離術血小板 (Apheresis Platelets)
      // 2 weeks
      threshold = 7 * 2;
    } else {
      throw new Error('donation type error');
    }

    return threshold < (today - last) / (1000 * 60 * 60 * 24);
  }
};
