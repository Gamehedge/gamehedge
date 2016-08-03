class AddUrls < ActiveRecord::Migration
  def change
  	add_column :events, :url, :string
  	add_column :performers, :url, :string
  	add_column :sports, :url, :string
  	add_column :venues, :url, :string
  end
end
