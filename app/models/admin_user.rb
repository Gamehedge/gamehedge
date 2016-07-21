class AdminUser < ActiveRecord::Base
 	# Include default devise modules. Others available are:
	# :confirmable, :lockable, :timeoutable and :omniauthable
	has_many :admin_users_permissions
    has_many :permissions, :through => :admin_users_permissions
	devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable
	accepts_nested_attributes_for :admin_users_permissions, :allow_destroy => true
	accepts_nested_attributes_for :permissions, :allow_destroy => true
end
