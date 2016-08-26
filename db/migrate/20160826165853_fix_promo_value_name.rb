class FixPromoValueName < ActiveRecord::Migration
  def change
  	rename_column :promo_codes, :slug, :value
  end
end
