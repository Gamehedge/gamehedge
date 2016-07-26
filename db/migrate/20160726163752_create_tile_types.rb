class CreateTileTypes < ActiveRecord::Migration
  def change
    create_table :tile_types do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
