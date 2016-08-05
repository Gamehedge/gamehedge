class Addwinslosses < ActiveRecord::Migration
  def change
  	add_column :performers, :wins, :integer
  	add_column :performers, :losses, :integer
  end
end
