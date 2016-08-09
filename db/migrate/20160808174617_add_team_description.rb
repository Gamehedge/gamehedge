class AddTeamDescription < ActiveRecord::Migration
  def change
  	add_column :performers, :description, :text
  end
end
