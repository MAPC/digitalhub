class RemoveSelectedTables < ActiveRecord::Migration[5.2]
  def up
    drop_table :refinery_tags
    drop_table :refinery_taggings
    drop_table :refinery_reports
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
