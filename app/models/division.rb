class Division < ActiveRecord::Base
	belongs_to :sport
	belongs_to :division
	has_many :divisions
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  	def display_name
  		if self.division == nil
  			return String(self.sport.name) +  " " + self.name
  		else
  			return String(self.sport.name) + " " + String(self.division.name) + " " + self.name
  		end
	end
end
