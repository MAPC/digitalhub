module Refinery
  module Announcements
    module Admin
      class AnnouncementsController < ::Refinery::AdminController

        crudify :'refinery/announcements/announcement'

        def create
          @announcement = Refinery::Announcements::Announcement.new(announcement_params.except(:tags))
          if announcement_params[:tags]
            announcement_params[:tags].each do |tag_id|
              @announcement.tags <<  Refinery::Tags::Tag.find(tag_id)
            end
          end
          if @announcement.save
            flash[:notice] = "News was successfully created!"
            redirect_to announcements_admin_announcements_path
          else
            render action: 'new'
          end
        end

        def update
          @announcement = Refinery::Announcements::Announcement.find(params[:id])
          @announcement.update(announcement_params.except(:tags))
          if announcement_params[:tags]
            @announcement.tags = [Refinery::Tags::Tag.find(9)]
            announcement_params[:tags].each do |tag_id|
              @announcement.tags <<  Refinery::Tags::Tag.find(tag_id)
            end
          end
          if @announcement.save
            flash[:notice] = "News was successfully updated!"
            redirect_to announcements_admin_announcements_path
          else
            render action: 'update'
          end
        end

        private

        # Only allow a trusted parameter "white list" through.
        def announcement_params
          params.require(:announcement).permit(:title, :body, :published_date, :image_id, :link, :image_credit, tags: [])
        end
      end
    end
  end
end
