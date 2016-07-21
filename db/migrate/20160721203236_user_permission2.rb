class UserPermission2 < ActiveRecord::Migration
  def change
  	drop_table :users_permissions
  	create_table :admin_users_permissions do |t|
    	t.string :name
    	
    	t.timestamps null: false
    end
  end
end
