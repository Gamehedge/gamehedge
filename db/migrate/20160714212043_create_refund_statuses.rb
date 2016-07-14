class CreateRefundStatuses < ActiveRecord::Migration
  	def change
	    create_table :refund_statuses do |t|
	    	t.string :name
	      	t.timestamps null: false
	    end
	    add_column :orders, :refund_status_id, :integer
  		add_foreign_key :orders, :refund_statuses
  	end
end
