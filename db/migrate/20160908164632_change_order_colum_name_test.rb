class ChangeOrderColumNameTest < ActiveRecord::Migration
  def change
  	rename_column :orders, :modified_date, :updated_at
  end
end
