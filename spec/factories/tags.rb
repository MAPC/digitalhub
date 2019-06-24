FactoryBot.define do
  factory :tag, class: Refinery::Tags::Tag do
    sequence(:title, "a") { |n| "Test title #{n}" }

    # factory :tag do
    #   after(:create) do |tag|
    #     tag.parts << FactoryBot.build(:tag)
    #   end
    # end
  end
end
