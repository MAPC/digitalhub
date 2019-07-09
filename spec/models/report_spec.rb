require "rails_helper"

RSpec.describe Refinery::Reports::Report, :type => :model do
  it "it has a tag of 'publications' ", js: true do
    report1 = create(:report, title: "The New Orthodoxy")
    Refinery::Taggings::Tagging.create(tag_id: 8, report_id: report1.id)

    expect(report1.tags[0].title).to eq('publications')
  end
end
