class AddEventsTiles < ActiveRecord::Migration
  def change
  	add_reference :tiles, :event, index: true, foreign_key: true
  end
end
