
FactoryBot.define do
  factory :event, :class => Refinery::Events::Event do
    sequence(:title) { |n| "refinery#{n}" }
    image
    tags { [Refinery::Tags::Tag.find_by(title: 'events'),
            Refinery::Tags::Tag.find_by(title: 'transportation')] }
  end
end
