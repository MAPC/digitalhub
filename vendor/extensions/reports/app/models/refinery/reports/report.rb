module Refinery
  module Reports
    class Report < Refinery::Core::BaseModel
      self.table_name = 'refinery_reports'

      validates :title, :presence => true, :uniqueness => true
      # validate :has_required_tags
      belongs_to :image, :class_name => '::Refinery::Image', optional: true
      has_many :taggings, :class_name => '::Refinery::Taggings::Tagging', dependent: :destroy
      has_many :tags, :class_name => '::Refinery::Tags::Tag', through: :taggings

      def has_required_tags
        if !self.tags.detect {|t| t.title == "publications" }
          self.errors.add(:tags, 'report must have a content_type publications tag')
          puts self.errors

        elsif self.tags.count < 2
          self.errors.add(:tags, 'report must have at least one topic_area tag')
          puts self.errors

        else
        end
      end

      def self.tagged_with(title)
        Refinery::Tags::Tag.find_by_title!(title).reports
      end
      
      def self.tag_counts
        Refinery::Tags::Tag.select("tags.*, count(taggings.tag_id) as count").
          joins(:taggings).group("taggings.tag_id")
      end
        
      def tag_list
        tags.map(&:title).join(", ")
      end

      def tag_list=(titles)
        self.tags = titles.split(",").map do |t|
          Refinery::Tags::Tag.where(title: t.strip).first_or_create!
        end
      end

      def tag_content_type
        self.tags.where(tag_type: "content_type")[0].title
      end

    end
  end
end
