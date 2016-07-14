class RefundStatus < ActiveRecord::Base
	has_many :orders
end
