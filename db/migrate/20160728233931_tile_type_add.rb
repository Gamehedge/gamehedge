class TileTypeAdd < ActiveRecord::Migration
  def change
  	add_column :tile_types, :te_uid, :integer
  end
end
