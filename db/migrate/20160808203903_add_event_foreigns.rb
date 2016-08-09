class AddEventForeigns < ActiveRecord::Migration
  def change
  	add_column :events, :home_performer_id, :integer
  	add_column :events, :away_performer_id, :integer
  	add_column :events, :venue_id, :integer
  	add_foreign_key :events, :performers, column: :home_performer_id
  	add_foreign_key :events, :performers, column: :away_performer_id
  	add_foreign_key :events, :venues
  end
end
