require "rails_helper"

RSpec.describe Refinery::Announcements::Announcement, :type => :model do
  let(:today) { Time.zone.now }

  it "it has a tag with a title of 'news' ", js: true do
    announcement = FactoryBot.create(:announcement, title: 'Test Announcement Title', published_date: today)
    expect(announcement.tags.pluck(:title)).to include('news')
  end

  it "it has a tag with a tag_type of 'topic_area'", js: true do
    announcement = FactoryBot.create(:announcement, title: 'Test Announcement Title', published_date: today)
    expect(announcement.tags.pluck(:tag_type)).to include('topic_area')
  end

  it "it MUST have a published_date", js: true do
    announcement = FactoryBot.build(:announcement, title: 'Test title', published_date: nil)
    announcement.valid?
    expect(announcement.errors[:published_date]).to include("can't be blank")
  end
end
