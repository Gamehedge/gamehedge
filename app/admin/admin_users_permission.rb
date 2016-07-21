class AdminUsersPermission < ActiveRecord::Base
    belongs_to :admin_user
    belongs_to :permission
    accepts_nested_attributes_for :admin_user, :allow_destroy => true
    accepts_nested_attributes_for :permission, :allow_destroy => true
end