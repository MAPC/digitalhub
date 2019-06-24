require "rails_helper"

RSpec.describe Refinery::Tags::Tag, :type => :model do
  it "has a title" do
    FactoryBot.create(:tag, title: 'TagTitle3', tag_type: "topic_area")
    expect(tag3.title).to eq("TagTitle3")
  end

  it "has a tag_type" do
    FactoryBot.create(:tag, title: 'TagTitle2', tag_type: "topic_area")
    expect(tag4.tag_type).to eq("topic_area")
  end
  
  # it "has_many taggings" do 
  #   FactoryBot.create(:tag, title: 'TagTitle2', tag_type: "topic_area")
  #   expect(tag4.tag_type).to eq("topic_area")
  # end
    

end
