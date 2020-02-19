module Refinery
  module Reports
    module Admin
      class ReportsController < ::Refinery::AdminController

        crudify :'refinery/reports/report'

        def create
          @report = Refinery::Reports::Report.new(report_params.except(:tags))
          if report_params[:tags]
            report_params[:tags].each do |tag_id|
              @report.tags <<  Refinery::Tags::Tag.find(tag_id)
            end
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
          @report.update(report_params.except(:tags))
          if report_params[:tags]
            @report.tags = [Refinery::Tags::Tag.find(8)]
            report_params[:tags].each do |tag_id|
              @report.tags <<  Refinery::Tags::Tag.find(tag_id)
            end
          end
          if @report.save
            flash[:notice] = "Report was successfully updated!"
            redirect_to reports_admin_reports_path
          else
            render action: 'update'
          end
        end

        private

        # Only allow a trusted parameter "permit list" through.
        def report_params
          params.require(:report).permit(:title, :body, :date, :image_id, :link, :image_credit, tags: [])
         end
      end
    end
  end
end
