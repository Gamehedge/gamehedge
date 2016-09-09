class AddEventsTiles2 < ActiveRecord::Migration
  def change
  	add_column :tiles, :event_id2, :integer, index: true, foreign_key: true
  	add_column :tiles, :event_id3, :integer, index: true, foreign_key: true
  end
end
