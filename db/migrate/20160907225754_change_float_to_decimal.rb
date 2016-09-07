class ChangeFloatToDecimal < ActiveRecord::Migration
  def change
  	change_column(:orders, :sale_price_per_ticket, :decimal, precision: 10, scale: 2)
  	change_column(:orders, :ticket_total, :decimal, precision: 10, scale: 2)
  	change_column(:orders, :service_fee, :decimal, precision: 10, scale: 2)
  	change_column(:orders, :shipping_fee, :decimal, precision: 10, scale: 2)
  end
end
