class AddVenueDescriptionPerformer < ActiveRecord::Migration
  def change
  	add_column :performers, :venue_description, :text
  end
end
