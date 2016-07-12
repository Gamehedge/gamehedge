class MainDivisions < ActiveRecord::Migration
  def change
  	add_column :divisions, :is_main_division, :boolean 
  end
end
