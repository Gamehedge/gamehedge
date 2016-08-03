class AddSearchPriority2 < ActiveRecord::Migration
  def change
  	remove_column :events, :priority
  	remove_column :performers, :priority
  	remove_column :sports, :priority
  	remove_column :venues, :priority
  	add_column :events, :priority, :integer
  	add_column :performers, :priority, :integer
  	add_column :sports, :priority, :integer
  	add_column :venues, :priority, :integer
  end
end
