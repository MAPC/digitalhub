# frozen_string_literal: true

module Refinery
  module Taggings
    class Tagging < Refinery::Core::BaseModel
      self.table_name = 'refinery_taggings'

      validates :tagged_item_title, presence: true
      validate :has_tagged_item?
      belongs_to :tag, class_name: '::Refinery::Tags::Tag'
      belongs_to :event, class_name: '::Refinery::Events::Event', optional: true
      belongs_to :announcement, class_name: '::Refinery::Announcements::Announcement', optional: true
      belongs_to :report, class_name: '::Refinery::Reports::Report', optional: true

      scope :topic_area_taggings, -> { where(tag_type: 'topic_area') }

      def self.total_pages
        count / 12
      end

      def self.current_page
        1
      end

      def content_type
        if event
          'events'
        elsif announcement
          'news'
        elsif report
          'publications'
        end
      end

      def tag_type
        tag.tag_type
      end

      def tag_title
        tag.title.downcase
      end

      def tag_narrative
        tag.narrative
      end

      def tagged_item
        if announcement
          AnnouncementSerializer.new(announcement, { include: [:image] }).serializable_hash
        elsif event
          EventSerializer.new(event, { include: [:image] }).serializable_hash
        elsif report
          ReportSerializer.new(report, { include: [:image] }).serializable_hash
        else
          errors.add(:tagged_item, 'associated Active Record instance NOT found')
        end
      end

      def tagged_item_title
        if announcement
          announcement.title.downcase.lstrip
        elsif event
          event.title.downcase.lstrip
        elsif report
          report.title.downcase.lstrip
        else
          errors.add(:tagged_item_title, 'associated Active Record instance NOT found')
        end
      end

      def sort_date
        if announcement
          announcement.published_date
        elsif event
          event.start
        elsif report
          report.date
        else
          errors.add(:sort_date, 'associated Active Record instance NOT found')
        end
      end

      def has_tagged_item?
        announcement || event || report ? true : errors.add(:has_tagged_item?, 'tagging must have tagged model instance')
      end

      def self.filter_taggings(filters)
        content_type_filter = Refinery::Tags::Tag.where(tag_type: 'content_type').pluck(:title)
        topic_area_filter = Refinery::Tags::Tag.where(tag_type: 'topic_area').pluck(:title)
        result = []

        content_type_filter = filters[0] if filters[0] != 'everything'
        topic_area_filter = filters[1] if filters[1] != 'all topic areas'

        Refinery::Taggings::Tagging.all.each do |t|
          if topic_area_filter.include?(t.tag_title) && content_type_filter.include?(t.content_type)
            result.push(t)
          end
        end

        # filter out duplicates based on tagged_item_title
        result.uniq(&:tagged_item_title)
      end
    end
  end
end
