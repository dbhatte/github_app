'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /app when location hash/fragment is empty', function() {
    browser.get('/app/index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/app");
  });


  describe('Repositories list view', function() {

    beforeEach(function() {
      browser.get('/app/index.html#/app');
    });


    it('should fetch the repository list as user types in search box', function() {

      var repositoryList = element.all(by.repeater('repo in repositories'));
      var searchTerm = element(by.model('searchTerm'));
      var submitButton = element(by.buttonText('Search'));

      var EC = protractor.ExpectedConditions;

      searchTerm.sendKeys('kibo007');
      submitButton.click();
      expect(repositoryList.count()).toBe(30);

      searchTerm.clear();
      searchTerm.sendKeys('da');
      submitButton.click();
      expect(repositoryList.count()).toBe(0);
      browser.wait(EC.visibilityOf($('#noRepositories')), 5000);

      searchTerm.clear();
      searchTerm.sendKeys('afscx23');
      submitButton.click();
      expect(repositoryList.count()).toBe(0);
      browser.wait(EC.visibilityOf($('#userDoesNotExist')), 5000);


    });
  });

});
