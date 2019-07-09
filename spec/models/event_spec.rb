require "rails_helper"

RSpec.describe Refinery::Events::Event, :type => :model do
  it "it has a tag of 'publications' ", js: true do
    event1 = create(:event, title: "The New Orthodoxy")
    Refinery::Taggings::Tagging.create(tag_id: 10, event_id: event1.id)

    expect(event1.tags[0].title).to eq('events')
  end
end
