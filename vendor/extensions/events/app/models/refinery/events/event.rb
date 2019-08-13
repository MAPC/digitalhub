module Refinery
  module Events
    class Event < Refinery::Core::BaseModel
      extend Mobility
      self.table_name = 'refinery_events'
      acts_as_indexed :fields => [:title, :description]
      is_seo_meta
      translates :title, :description, :accessibility_note, :translation_note
      validates :title, :presence => true, :uniqueness => true
      validates :start, :presence => true
      belongs_to :image, :class_name => '::Refinery::Image'

      has_many :taggings, :class_name => '::Refinery::Taggings::Tagging', dependent: :destroy
      has_many :tags, :class_name => '::Refinery::Tags::Tag', through: :taggings

      def self.tagged_with(title)
        Refinery::Tags::Tag.find_by_title!(title).events
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

      def self.next_three_events
        next_three = ::Refinery::Events::Event.where('start > ?', DateTime.now).order(start: :asc).first(3)
        next_three_json = next_three.map {|event| EventSerializer.new(event, { :include => [:image] }).serializable_hash }
      end
    end
  end
end
