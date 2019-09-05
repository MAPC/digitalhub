class DeleteNilTaggings < ActiveRecord::Migration[5.2]
  def change
    Refinery::Taggings::Tagging.all.each do |tagging|
      if !tagging.valid?
        tagging.delete
      end
    end
  end
end
