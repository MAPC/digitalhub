module Refinery
  module Announcements
    module Admin
      class AnnouncementsController < ::Refinery::AdminController

        crudify :'refinery/announcements/announcement'

        
        def update
          @announcement = Refinery::Announcements::Announcement.find(params[:id])
          @announcement.taggings.each {|t| t.delete}
          tags = params[:tag][:tag_ids].each do |tid|
            new_tagging = Refinery::Taggings::Tagging.create(announcement_id: @announcement.id, tag_id: tid.to_i)
          end
          redirect_to taggings_admin_taggings_path and return
        end
        
        private
        
        # Only allow a trusted parameter "white list" through.
        def announcement_params
          params.require(:announcement).permit(:title, :body, :image_id, :link, :tag)
        end
      end
    end
  end
end
