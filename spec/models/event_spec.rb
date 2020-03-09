require "rails_helper"

RSpec.describe Refinery::Events::Event, :type => :model do
  let(:test_start_date) { Time.zone.now }

  it "it has a tag with title 'events' ", js: true do
    event = FactoryBot.create(:event, title: 'Test Event Title', start: test_start_date)
    expect(event.tags.pluck(:title)).to include('events')
  end

  it "it has a tag with a tag_type of 'content_type'", js: true do
    event = FactoryBot.create(:event, title: 'Test Event Title', start: test_start_date)
    expect(event.tags.pluck(:tag_type)).to include('content_type')
  end

  it "it has a tag with a tag_type of 'topic_area'", js: true do
    event = FactoryBot.create(:event, title: 'Test Event Title', start: test_start_date)
    expect(event.tags.pluck(:tag_type)).to include('topic_area')
  end

  it "it MUST have a start date", js: true do
    event = FactoryBot.build(:event, title: 'Test title')
    event.valid?
    expect(event.errors[:start]).to include("can't be blank")
  end
end
