class AddVenueConf < ActiveRecord::Migration
  def change
  	add_column :events, :venue_configuration_id, :integer
  end
end
