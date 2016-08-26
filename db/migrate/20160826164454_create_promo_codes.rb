class CreatePromoCodes < ActiveRecord::Migration
  def change
    create_table :promo_codes do |t|
    	t.float :value
    	t.boolean :is_percentage
    	t.string :name
    	t.string :code
    	t.date :start_date
    	t.date :end_date
    	t.boolean :active

      t.timestamps null: false
    end
  end
end
