module Refinery
  module Taggings
    class Tagging < Refinery::Core::BaseModel
      self.table_name = 'refinery_taggings'

      belongs_to :tag, :class_name => '::Refinery::Tags::Tag'
      belongs_to :event, :class_name => '::Refinery::Events::Event', optional: true
      belongs_to :announcement, :class_name => '::Refinery::Announcements::Announcement', optional: true

      def self.topic_areas
        self.all.select {|t| t.tag.tag_type == 'topic_area'}
      end
      
      def self.content_types
        self.all.select {|t| t.tag.tag_type == 'content_type'}
      end

      def title
        self.tag.title
      end
    end
  end
end
