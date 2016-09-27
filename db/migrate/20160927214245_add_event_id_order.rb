class AddEventIdOrder < ActiveRecord::Migration
  def change
  	add_column :orders, :event_te_uid, :integer
  end
end
