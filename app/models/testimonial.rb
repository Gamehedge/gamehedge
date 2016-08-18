class Testimonial < ActiveRecord::Base
  belongs_to :performer
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100#" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
	
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
