class UserPermission < ActiveRecord::Migration
  def change
  	drop_table :user_permissions
  	create_table :users_permissions do |t|
    	t.string :name
    	
    	t.timestamps null: false
    end

  end
end
