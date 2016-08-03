class AddSearchPriority < ActiveRecord::Migration
  def change
  	add_column :events, :priority, :string
  	add_column :performers, :priority, :string
  	add_column :sports, :priority, :string
  	add_column :venues, :priority, :string
  end
end
