module Refinery
  module Events
    module Admin
      class EventsController < ::Refinery::AdminController

        crudify :'refinery/events/event'

        def create
          @event = Refinery::Events::Event.new(event_params.except(:tags))
          if event_params[:tags]
            event_params[:tags].each do |tag_id|
              @event.tags <<  Refinery::Tags::Tag.find(tag_id)
            end
          end
          if @event.save
            flash[:notice] = "Event was successfully created!"
            redirect_to events_admin_events_path
          else
            render action: 'new'
          end
        end

        def update
          @event = Refinery::Events::Event.find(params[:id])
          @event.update(event_params.except(:tags))
          if event_params[:tags]
            @event.tags = [Refinery::Tags::Tag.find(10)]
            event_params[:tags].each do |tag_id|
              @event.tags <<  Refinery::Tags::Tag.find(tag_id)
            end
          end
          if @event.save
            flash[:notice] = "Event was successfully updated!"
            redirect_to events_admin_events_path
          else
            render action: 'update'
          end
        end

        private

        # Only allow a trusted parameter "white list" through.
        def event_params
          params.require(:event).permit(:title, :description, :start, :end, :image_id, :event_type, :address, :city, :state, :zipcode, :registration_link, :accessibility_note, :translation_note, :browser_title, :meta_description, :location_name, tags: [])
        end
      end
    end
  end
end
