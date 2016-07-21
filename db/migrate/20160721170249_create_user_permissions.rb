class CreateUserPermissions < ActiveRecord::Migration
  def change
    create_table :user_permissions do |t|
      t.belongs_to :admin_user, index: true
      t.belongs_to :permission, index: true
      
      t.timestamps null: false
    end
  end
end
