module Refinery
  module Reports
    module Admin
      class ReportsController < ::Refinery::AdminController

        crudify :'refinery/reports/report'

        def create
          @report = Refinery::Reports::Report.new(report_params)
          params[:tag][:tag_ids].each do |tid|
            @report.tags << Refinery::Tags::Tag.find(tid)
          end
          if @report.save
            flash[:notice] = "Report was successfully created!"
            redirect_to reports_admin_reports_path
          else
            render action: 'new'
          end
        end

        def update
          @report = Refinery::Reports::Report.find(params[:id])
          @report.update(report_params)
          @report.taggings.each {|t| t.delete}
          params[:tag][:tag_ids].each do |tid|
            new_tagging = Refinery::Taggings::Tagging.create(report_id: @report.id, tag_id: tid.to_i)
          end
          @report.save
          redirect_to reports_admin_reports_path and return
        end

        private

        # Only allow a trusted parameter "permit list" through.
        def report_params
          params.require(:report).permit(:title, :body, :date, :image_id, :link, :tag)
         end
      end
    end
  end
end
