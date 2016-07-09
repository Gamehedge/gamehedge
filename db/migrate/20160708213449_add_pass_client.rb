class AddPassClient < ActiveRecord::Migration
  def change
  	add_column :clients, :temporal_pass, :string
  end
end
