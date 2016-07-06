class AddImages < ActiveRecord::Migration
  def change
  	add_attachment :sports, :image
  	add_attachment :divisions, :image
  	add_attachment :performers, :image
  end
end
