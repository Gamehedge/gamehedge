class AddBannerImage < ActiveRecord::Migration
  def change
  	add_column :events, :te_venue_id, :integer
  end
end
