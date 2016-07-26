class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :name
      t.text :address
      t.integer :te_uid
      t.string :location

      t.timestamps null: false
    end
  end
end
