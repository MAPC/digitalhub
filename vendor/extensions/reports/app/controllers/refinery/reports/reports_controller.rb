module Refinery
  module Reports
    class ReportsController < ::ApplicationController

      before_action :find_all_reports
      before_action :find_page

      def index
        reports_json = @reports.map { |report| ReportSerializer.new(report, { :include => [:image] }).serializable_hash }
        respond_to do |format|
          format.html { redirect_to "/find-out" }
          format.json { render json: reports_json }
        end
      end

      def show
        @report = ::Refinery::Reports::Report.find(params[:id])
        report_json = ReportSerializer.new(@report, { :include => [:image] }).serializable_hash
        @tags = @report.tags.map {|t| t.tag_type == 'topic_area' ? t.title : nil }.compact.join(', ')

        respond_to do |format|
          format.html { present(@page) }
          format.json { render json: report_json }
        end
      end

    protected

      def find_all_reports
        @reports = Report.order('position ASC')
      end

      def find_page
        @page = ::Refinery::Page.where(link_url: "/reports").first
      end

    end
  end
end
