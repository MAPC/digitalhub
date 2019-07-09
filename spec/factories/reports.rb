FactoryBot.define do
  factory :report, class: Refinery::Reports::Report do
    sequence(:title, "a") { |n| "Test title #{n}" }
    # TODO:
    # add image
    # then remove 'optional: true' from Report model
  end
end
