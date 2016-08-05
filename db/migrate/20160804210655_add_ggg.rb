class AddGgg < ActiveRecord::Migration
  def change
  	remove_column :events, :priority
  	remove_column :performers, :priority
  	remove_column :sports, :priority
  	remove_column :venues, :priority
  	add_column :sports, :ggg, :string
  end
end
