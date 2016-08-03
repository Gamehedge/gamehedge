class Sport < ActiveRecord::Base
	has_many :divisions
	has_many :performers
	has_many :tiles
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  	after_create :update_url

  	def update_url
	     self.update_attributes(:url => '/leagues/' + String(self.id), :priority => 2)
  	end
end
