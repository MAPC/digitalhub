require "rails_helper"

RSpec.describe "Hero image rotation", :type => :system do
  it "has a different hero section background image, 5 seconds after pageload, if 1 hero image is created", js: true do
    create(:page)
    create(:hero_image, image: build(:alternate_image))
    Capybara.current_session.driver.browser.manage.window.resize_to(1440, 1000)
    visit "/"
    sleep 5
    expect(page).to have_xpath('//div[contains(@style,"2014-01-12%2013.51.23%20HDR.jpg")]')
  end
end
