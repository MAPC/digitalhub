FactoryBot.define do
  factory :report, class: Refinery::Reports::Report do
    sequence(:title, "a") { |n| "Test title #{n}" }
    image
    tags { [Refinery::Tags::Tag.find_by(title: 'publications'),
            Refinery::Tags::Tag.find_by(title: 'transportation')] }
  end
end
