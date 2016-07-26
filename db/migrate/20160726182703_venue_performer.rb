class VenuePerformer < ActiveRecord::Migration
  def change
  	add_reference :performers, :venue, index: true, foreign_key: true
  end
end
