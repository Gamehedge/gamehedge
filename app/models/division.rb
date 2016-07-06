class Division < ActiveRecord::Base
	belongs_to :sport
	belongs_to :division
	has_many :divisions
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
