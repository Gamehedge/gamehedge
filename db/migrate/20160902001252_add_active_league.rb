class AddActiveLeague < ActiveRecord::Migration
  def change
  	add_column :sports, :active, :boolean
  end
end
