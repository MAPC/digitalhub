module Refinery
  module Taggings
    class Tagging < Refinery::Core::BaseModel
      self.table_name = 'refinery_taggings'

      belongs_to :tag, :class_name => '::Refinery::Tags::Tag'
      belongs_to :event, :class_name => '::Refinery::Events::Event', optional: true
      belongs_to :announcement, :class_name => '::Refinery::Announcements::Announcement', optional: true

      def self.total_pages
        self.count / 12
      end

      def self.current_page
        1
      end

      def self.topic_areas
        self.all.select {|t| t.tag.tag_type == 'topic_area'}
      end
      
      def self.content_types
        self.all.select {|t| t.tag.tag_type == 'content_type'}
      end

      def extension_class_name
        if event 
          "event"
        elsif announcement
          "announcement" 
        elsif report 
          "report"
        else
        end
      end

      def tag_title
        return self.tag.title.downcase
      end

      def tagged_item_title
        if event 
          self.event.title.downcase
        elsif announcement
          self.announcement.title.downcase 
        elsif report 
          self.report.title.downcase
        else
        end
      end
      
    end
  end
end
