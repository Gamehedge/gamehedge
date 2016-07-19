class Performer < ActiveRecord::Base
	self.primary_key = "id"
	belongs_to :division, class_name: "Division", foreign_key: "division_id"
	belongs_to :sport
	has_many :players
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
	def display_name
		return self.te_name
	end
end