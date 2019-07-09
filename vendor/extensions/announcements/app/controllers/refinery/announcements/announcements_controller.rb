module Refinery
  module Announcements
    class AnnouncementsController < ::ApplicationController

      before_action :find_all_announcements
      before_action :find_page
      
      def index
        announcements_json = @announcements.map { |announcement| AnnouncementSerializer.new(announcement, { :include => [:image] }).serializable_hash }
        
        respond_to do |f|
          f.html { present(@page) }
          f.json { render json: announcements_json }
        end
      end

      def show
        @announcement = ::Refinery::Announcements::Announcement.find(params[:id])
        announcement_json = AnnouncementSerializer.new(@announcement, { :include => [:image] }).serializable_hash
        
        respond_to do |f|
          f.html { present(@page) }
          f.json { render json: announcement_json}
        end
      end

    protected

      def find_all_announcements
        @announcements = Announcement.order('position ASC')
      end

      def find_page
        @page = ::Refinery::Page.where(link_url: "/announcements").first
      end

    end
  end
end
