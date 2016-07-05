class Performer < ActiveRecord::Base
	self.primary_key = "id"
	belongs_to :division, class_name: "Division", foreign_key: "division_id"
	def display_name
		return self.te_name
	end
end