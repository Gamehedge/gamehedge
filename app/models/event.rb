class Event < ActiveRecord::Base
	after_create :update_url
	belongs_to :home_performer, class_name: "Performer", foreign_key: "home_performer_id"
	belongs_to :away_performer, class_name: "Performer", foreign_key: "away_performer_id"
	belongs_to :venue
  	def update_url
	     self.update_attributes(:url => '/events/' + String(self.id))
  	end

	def display_name
		return self.id
	end
end