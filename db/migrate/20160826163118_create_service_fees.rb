class CreateServiceFees < ActiveRecord::Migration
  def change
    create_table :service_fees do |t|
    	t.decimal :minimum_amount, precision: 8, scale: 2
    	t.float :fee_amount
    	t.string :description

      t.timestamps null: false
    end
  end
end
