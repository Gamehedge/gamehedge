class OrderStat < ActiveRecord::Base
	def display_name
		return self.id
	end
end