module Refinery
  module HeroImages
    class HeroImagesController < ::ApplicationController

      before_action :find_all_hero_images
      before_action :find_page

      def index
        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @hero_image in the line below:
        present(@page)
      end

      def show
        @hero_image = HeroImage.find(params[:id])

        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @hero_image in the line below:
        present(@page)
      end

    protected

      def find_all_hero_images
        @hero_images = HeroImage.order('position ASC')
      end

      def find_page
        @page = ::Refinery::Page.where(link_url: "/hero_images").first
      end

    end
  end
end
