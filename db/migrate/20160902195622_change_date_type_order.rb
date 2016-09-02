class ChangeDateTypeOrder < ActiveRecord::Migration
  def change
  	change_column(:orders, :event_date, :string, limit: 100)
  end
end
