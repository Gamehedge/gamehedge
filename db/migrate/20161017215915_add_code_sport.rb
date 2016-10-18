class AddCodeSport < ActiveRecord::Migration
  def change
  	add_column :sports, :contract_code, :string, :limit => 8
  end
end
