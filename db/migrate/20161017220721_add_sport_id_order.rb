class AddSportIdOrder < ActiveRecord::Migration
  def change
  	add_column :orders, :sport_id, :integer
  	add_foreign_key :orders, :sports
  end
end
