class CreateHeroImagesHeroImages < ActiveRecord::Migration[5.2]

  def up
    create_table :refinery_hero_images do |t|
      t.integer :image_id
      t.string :title
      t.text :description
      t.string :url
      t.string :format
      t.integer :position

      t.timestamps
    end


  end


  def down
    if defined?(::Refinery::UserPlugin)
      ::Refinery::UserPlugin.destroy_all({:name => "refinerycms-hero_images"})
    end

    if defined?(::Refinery::Page)
      ::Refinery::Page.delete_all({:link_url => "/hero_images/hero_images"})
    end

    drop_table :refinery_hero_images

  end
end
