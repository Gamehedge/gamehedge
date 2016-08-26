class PromoCodeFix < ActiveRecord::Migration
  def change
  	add_column :promo_codes, :value, :float
	add_column :promo_codes, :is_percentage, :boolean
	add_column :promo_codes, :name, :string
	add_column :promo_codes, :code, :string
	add_column :promo_codes, :start_date, :date
	add_column :promo_codes, :end_date, :date
	add_column :promo_codes, :active, :boolean
  end
end
