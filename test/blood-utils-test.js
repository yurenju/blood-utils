'use strict';

var utils = require('../');
var expect = require('chai').expect;

describe('blood-utils', function() {
  describe('#getYearly', function() {
    it('should sum all volumeType together', function() {
      var donations = [
        {volumeType: '500', date: Date()},
        {volumeType: '250', date: Date()}
      ];
      var year = (new Date()).getFullYear();
      var total = utils.getYearly(donations, year);
      expect(total).is.equal(750);
    });

    it('should skip donation with volumeType "PH"', function() {
      var donations = [
        {volumeType: 'PH', date: Date()},
        {volumeType: '250', date: Date()}
      ];
      var year = (new Date()).getFullYear();
      var total = utils.getYearly(donations, year);
      expect(total).is.equal(250);
    });
  });

  describe('#checkLastDonation', function() {
    var today = new Date('2015/7/5');

    it('should return false if last donation time is in 3 months with 500cc ', function() {
      var last = new Date('2015/6/30');
      var result = utils.checkLastDonation('500', last, today);
      expect(result).is.equal(false);
    });

    it('should return true if last donation time is brefore than 3 months with 500cc ', function() {
      var last = new Date('2015/1/30');
      var result = utils.checkLastDonation('500', last, today);
      expect(result).is.equal(true);
    });

    it('should return true if last donation time is brefore than 2 months with 250cc ', function() {
      var last = new Date('2015/5/1');
      var result = utils.checkLastDonation('250', last, today);
      expect(result).is.equal(true);
    });

    it('should return true if last donation time is brefore than 2 weeks with volumeType "PH" ', function() {
      var last = new Date('2015/6/15');
      var result = utils.checkLastDonation('PH', last, today);
      expect(result).is.equal(true);
    });

    it('should return false if last donation time is in 2 weeks with volumeType "PH" ', function() {
      var last = new Date('2015/7/1');
      var result = utils.checkLastDonation('PH', last, today);
      expect(result).is.equal(false);
    });
  });

  describe('#getYearlyDonationCount', function() {
    it('should count to 2 for "PH" volumeType', function() {
      var donations = [
        {volumeType: 'PH', date: Date()},
        {volumeType: '500', date: Date()},
        {volumeType: 'PH', date: Date()}
      ];
      var year = (new Date()).getFullYear();
      var count = utils.getYearlyDonationCount(donations, 'PH', year);
      expect(count).is.equal(2);
    });
  });

  describe('#checkYearlyVolume', function() {
    it('should return false if men donate over 1500', function() {
      var year = (new Date()).getFullYear();
      var donations = [
        {volumeType: '500', date: Date()},
        {volumeType: '500', date: Date()},
        {volumeType: '500', date: Date()}
      ];
      var result = utils.checkYearlyVolume('male', donations, year);
      expect(result).is.equal(false);
    });

    it('should return true if a men donate less than 1500', function() {
      var year = (new Date()).getFullYear();
      var donations = [
        {volumeType: '500', date: Date()},
        {volumeType: '500', date: Date()}
      ];
      var result = utils.checkYearlyVolume('male', donations, year);
      expect(result).is.equal(true);
    });

    it('should return false if donate count more that 24 for PH volumeType', function() {
      var year = (new Date()).getFullYear();
      var donations = [];
      for (var i = 0; i < 25; i++) {
        donations.push({volumeType: 'PH', date: Date()});
      }
      var result = utils.checkYearlyVolume('male', donations, year);
      expect(result).is.equal(false);
    });

    it('should return true if donate count less that 24 for PH volumeType', function() {
      var year = (new Date()).getFullYear();
      var donations = [];
      for (var i = 0; i < 10; i++) {
        donations.push({volumeType: 'PH', date: Date()});
      }
      var result = utils.checkYearlyVolume('male', donations, year);
      expect(result).is.equal(true);
    });
  });
});
