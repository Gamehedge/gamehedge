class Permission < ActiveRecord::Base
	has_many :admin_users_permissions
    has_many :admin_users, :through => :admin_users_permissions
    accepts_nested_attributes_for :admin_users_permissions, :allow_destroy => true
	accepts_nested_attributes_for :admin_users, :allow_destroy => true
end
