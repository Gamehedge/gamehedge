class AddOrderNotes < ActiveRecord::Migration
  def change
  	add_column :orders, :ticket_notes, :string
  end
end
