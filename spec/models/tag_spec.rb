require "rails_helper"

RSpec.describe Refinery::Tags::Tag, :type => :model do
  let(:test_date) { Time.zone.now }

  it "has a title" do
    new_tag = FactoryBot.create(:tag, title: 'TagTitle3', tag_type: "topic_area")

    expect(new_tag.title).to eq("TagTitle3")
  end

  it "has a tag_type" do
    new_tag = FactoryBot.create(:tag, title: 'TagTitle2', tag_type: "topic_area")

    expect(new_tag.tag_type).to eq("topic_area")
  end

  it "can have many taggings" do
    report = FactoryBot.create(:report, title: "When the dogs come back.", date: test_date)

    expect(report.taggings.count).to eq(2)
  end
end
