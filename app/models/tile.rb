class Tile < ActiveRecord::Base
	belongs_to :tile_type
	belongs_to :sport
	belongs_to :performer
	belongs_to :venue
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  	def image_url
        image.url
    end
end
