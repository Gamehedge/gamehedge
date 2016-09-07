class ChangeFloatToDecimal2 < ActiveRecord::Migration
  def change
  	change_column(:orders, :sale_price_per_ticket, :float)
  	change_column(:orders, :ticket_total, :float)
  	change_column(:orders, :service_fee, :float)
  	change_column(:orders, :shipping_fee, :float)
  	change_column(:orders, :total, :float)
  	change_column(:orders, :cost, :float)
  end
end
