class ChangeDatesNames < ActiveRecord::Migration
  def change
  	rename_column :orders, :create_date, :created_at
  	rename_column :clients, :modified_date, :updated_at
  	rename_column :clients, :create_date, :created_at
  	add_column :events, :updated_at, 'timestamp without time zone'
  	add_column :events, :created_at, 'timestamp without time zone'
  	add_column :performers, :updated_at, 'timestamp without time zone'
  	add_column :performers, :created_at, 'timestamp without time zone'
  end
end
