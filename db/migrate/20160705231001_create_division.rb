class CreateDivision < ActiveRecord::Migration
  def change
    create_table :divisions do |t|
    	t.string :name
    	t.text :description
    	t.integer :te_uid
    	t.belongs_to :sport, index: true, foreign_key: true
    	t.belongs_to :division, index: true, foreign_key: true
    	t.timestamps null: false
    end
  end
end
