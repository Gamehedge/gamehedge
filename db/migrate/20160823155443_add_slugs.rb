class AddSlugs < ActiveRecord::Migration
  def change
  	add_column :venues, :slug, :string
  	add_column :sports, :slug, :string
  	add_column :performers, :slug, :string
  	add_column :events, :slug, :string
  end
end
