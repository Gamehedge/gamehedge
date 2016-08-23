class Event < ActiveRecord::Base
	after_update :update_url
	belongs_to :home_performer, class_name: "Performer", foreign_key: "home_performer_id"
	belongs_to :away_performer, class_name: "Performer", foreign_key: "away_performer_id"
	belongs_to :venue
	belongs_to :sport
  	def update_url
	     self.update_column(:url => '/events/' + String(self.te_uid) + '/' + self.slug)
  	end

	def display_name
		return self.id
	end
end