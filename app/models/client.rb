class Client < ActiveRecord::Base
	def display_name
		return self.name
	end
end