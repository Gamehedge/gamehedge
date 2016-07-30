class PositionDescriptionTile < ActiveRecord::Migration
  def change
  	add_column :tiles, :position, :integer
  	add_column :tiles, :description, :string
  end
end
