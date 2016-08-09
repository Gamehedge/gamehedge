class AddTileUrl < ActiveRecord::Migration
  def change
  	add_column :tiles, :url, :string
  end
end
