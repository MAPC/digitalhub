module Refinery
  module Tags
    module Admin
      class TagsController < ::Refinery::AdminController

        crudify :'refinery/tags/tag'

        private

        # Only allow a trusted parameter "permit list" through.
        def tag_params
          params.require(:tag).permit(:title, :tag_type)
        end
      end
    end
  end
end
