require "rails_helper"

RSpec.describe "Find Out filter", :type => :system do
  # before(:all) do
  #   # create default tags
  #   topic_areas = ["transportation", "housing", "environment", "health", "economic development", "arts & culture", "dynamic government"]
  #   content_types = ["publications", "news", "events", "calls to action", "datasets"]
    
  #   topic_areas.each do |topic_area_title|
  #     ::Refinery::Tags::Tag.create(title: topic_area_title, tag_type: "topic_area")
  #   end
    
  #   content_types.each do |content_type_title|
  #     ::Refinery::Tags::Tag.create(title: content_type_title, tag_type: "content_type")
  #   end


  # end

  # after(:all) do
  #   @announcement1.delete
  # end

  it "returns all content_types and all topic_areas on page load", js: true do

    announcement1 = create(:announcement, title: "My Dog")
    Refinery::Taggings::Tagging.create(tag_id: 9, announcement_id: announcement1.id)
    
    event1 = create(:event, title: "The New Orthodoxy")
    Refinery::Taggings::Tagging.create(tag_id: 10, event_id: event1.id)

    report1 = create(:report, title: "The Jam Band")
    Refinery::Taggings::Tagging.create(tag_id: 8, report_id: report1.id)

    create(:page)
    visit '/find-out'

    # expect(page).to have_selector('.find-out__tagged-item', count: 3)
    expect(page).to have_text('Filters showing all items.')
  end
end
