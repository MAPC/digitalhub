require "rails_helper"

RSpec.describe Refinery::Announcements::Announcement, :type => :model do
  it "it has a tag of 'news' ", js: true do
    announcement1 = create(:announcement, title: "My Dog")
    Refinery::Taggings::Tagging.create(tag_id: 9, announcement_id: announcement1.id)

    expect(announcement1.tags[0].title).to eq('news')
  end
end
