class DateOrder < ActiveRecord::Migration
  def change
  	add_column :orders, :real_event_date, :datetime
  end
end
