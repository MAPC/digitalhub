class AddImageCreditToPublications < ActiveRecord::Migration[5.2]
  def change
    add_column :refinery_reports, :image_credit, :string
  end
end
