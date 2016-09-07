class AddOrderDetails2 < ActiveRecord::Migration
  def change
  	add_column :orders, :cc_last_digits, :integer
  	add_column :orders, :address, :string
  	add_column :orders, :phone_number, :string
  end
end
