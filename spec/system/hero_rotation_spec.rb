require "rails_helper"

RSpec.describe "Hero image rotation", :type => :system do
  it "has a different hero section background image, 5 seconds after pageload, if 1 hero image is created", js: true do
    create(:page)
    create(:hero_image, image: build(:alternate_image))
    Capybara.current_session.driver.browser.manage.window.resize_to(1440, 1000)
    visit "/"
    sleep 3
    expect(page.evaluate_script("rotationTest()")).to be(true)
  end
  
  it "works with English language selected", js: true do
    create(:page)
    create(:hero_image, image: build(:alternate_image))
    Capybara.current_session.driver.browser.manage.window.resize_to(1440, 1000)
    visit "/en/"
    sleep 3
    expect(page.evaluate_script("rotationTest()")).to be(true)
  end
  
  it "works with Portugese language selected", js: true do
    create(:page)
    create(:hero_image, image: build(:alternate_image))
    Capybara.current_session.driver.browser.manage.window.resize_to(1440, 1000)
    visit "/pt/"
    sleep 3
    expect(page.evaluate_script("rotationTest()")).to be(true)
  end
  
  it "works with Spanish language selected", js: true do
    create(:page)
    create(:hero_image, image: build(:alternate_image))
    Capybara.current_session.driver.browser.manage.window.resize_to(1440, 1000)
    visit "/es/"
    sleep 3
    expect(page.evaluate_script("rotationTest()")).to be(true)
  end
  
  it "works with Chinese language selected", js: true do
    create(:page)
    create(:hero_image, image: build(:alternate_image))
    Capybara.current_session.driver.browser.manage.window.resize_to(1440, 1000)
    visit "/zh/"
    sleep 3
    expect(page.evaluate_script("rotationTest()")).to be(true)
  end
  
  it "works with French language selected", js: true do
    create(:page)
    create(:hero_image, image: build(:alternate_image))
    Capybara.current_session.driver.browser.manage.window.resize_to(1440, 1000)
    visit "/fr/"
    expect(page.evaluate_script("rotationTest()")).to be(true)
  end
end
