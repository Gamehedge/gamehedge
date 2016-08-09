class Performer < ActiveRecord::Base
	self.primary_key = "id"
	belongs_to :division, class_name: "Division", foreign_key: "division_id"
	belongs_to :sport
	belongs_to :venue
	has_many :players
  has_many :home_events, class_name: "Event", foreign_key: "home_performer_id"
  has_many :away_events, class_name: "Event", foreign_key: "away_performer_id"
	has_many :tiles
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
	def display_name
		return self.te_name
	end
	after_create :update_url

  	def update_url
	     self.update_attributes(:url => '/performers/' + String(self.id))
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
    
    def image_cover
    	self.sport.image.url
    end
    
end