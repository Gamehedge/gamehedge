class AddLeaguetoEvent < ActiveRecord::Migration
  def change
  	add_column :events, :sport_id, :integer
  	add_foreign_key :events, :sports
  end
end
