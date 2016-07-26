class CreateTiles < ActiveRecord::Migration
  def change
    create_table :tiles do |t|
      t.string :name
      t.belongs_to :tile_type, index: true, foreign_key: true
      t.belongs_to :sport, index: true, foreign_key: true
      t.belongs_to :performer, index: true, foreign_key: true
      t.belongs_to :venue, index: true, foreign_key: true
      t.string :link
      t.string :slug
      t.boolean :has_geolocation
      
      t.timestamps null: false
    end
    add_attachment :tiles, :image
  end
end
