class Venue < ActiveRecord::Base
	has_many :tiles
	has_many :performers
	has_many :events
	after_create :update_url

  	def update_url
	     self.update_attributes(:url => '/venues/' + String(self.id))
  	end
end
