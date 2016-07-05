class CreateSport < ActiveRecord::Migration
  def change
    create_table :sports do |t|
    	t.string :name
    	t.text :description
    	t.integer :te_uid
    	t.timestamps null: false
    end
  end
end
