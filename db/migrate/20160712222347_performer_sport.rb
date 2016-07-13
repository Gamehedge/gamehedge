class PerformerSport < ActiveRecord::Migration
  def change
  	add_column :performers, :sport_id, :integer
  	add_foreign_key :performers, :sports 
  end
end
