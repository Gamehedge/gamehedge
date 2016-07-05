class Performer < ActiveRecord::Base
	def display_name
		return self.te_name
	end
end