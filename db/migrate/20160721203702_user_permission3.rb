class UserPermission3 < ActiveRecord::Migration
  def change
  	drop_table :admin_users_permissions
  	create_table :admin_users_permissions do |t|
    	t.belongs_to :admin_user, index: true
        t.belongs_to :permission, index: true
    end
  end
end
