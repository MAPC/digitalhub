
FactoryBot.define do
  factory :announcement, :class => Refinery::Announcements::Announcement do
    sequence(:title) { |n| "Announcement#{n}" }
    body { "This is some body test!" }
    sequence(:link) { |n| "http://www.link#{n}.com/"}
    image
    tags { [Refinery::Tags::Tag.find_by(title: 'news'),
            Refinery::Tags::Tag.find_by(title: 'transportation')] }
  end
end

