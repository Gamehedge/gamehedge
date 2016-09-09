class Tile < ActiveRecord::Base
	belongs_to :tile_type
	belongs_to :sport
	belongs_to :performer
	belongs_to :venue
    belongs_to :event1, :class_name => 'Event', :foreign_key => 'event_id'
    belongs_to :event2, :class_name => 'Event', :foreign_key => 'event_id2'
    belongs_to :event3, :class_name => 'Event', :foreign_key => 'event_id3'
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100#" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

    after_update :update_url

    def update_url
        if self.tile_type_id == 1
            self.update_column(:url, '/leagues/' + String(self.sport.id) + '/' + self.sport.slug)
        elsif self.tile_type_id == 2
            self.update_column(:url, '/performers/' + String(self.performer.te_uid) + '/' + self.performer.slug)
        elsif self.tile_type_id == 3
            self.update_column(:url, '/venues/' + String(self.venue.te_uid) + '/' + self.venue.slug)
        else
            self.update_column(:url, '#')
        end
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
