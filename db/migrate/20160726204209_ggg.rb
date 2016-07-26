class Ggg < ActiveRecord::Migration
  def change
  	add_column :tiles, :good_game_guarantee, :string
  end
end
