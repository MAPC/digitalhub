class AddImageCreditToAnnouncements < ActiveRecord::Migration[5.2]
  def change
    add_column :refinery_announcements, :image_credit, :string
  end
end
