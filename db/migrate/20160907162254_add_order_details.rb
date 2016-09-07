class AddOrderDetails < ActiveRecord::Migration
  def change
  	add_column :orders, :customer_email, :string
  	add_column :orders, :number_of_tickets, :integer
  	add_column :orders, :sale_price_per_ticket, :float
  	add_column :orders, :ticket_total, :float
  	add_column :orders, :broker_name, :string
  	add_column :orders, :service_fee, :float
  	add_column :orders, :shipping_fee, :float
  end
end
