class Venue < ActiveRecord::Base
	has_many :tiles
	has_many :performers
	has_many :events
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
	after_create :update_url

  	def update_url
	     self.update_attributes(:url => '/venues/' + String(self.id))
  	end

  	def image_url
      image.url
    end
    def image_url_medium
    	image.url(:medium)
    end
    def image_url_thumb
    	image.url(:thumb)
    end
end
