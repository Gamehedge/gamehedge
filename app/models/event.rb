class Event < ActiveRecord::Base
	after_create :update_url

  	def update_url
	     self.update_attributes(:url => '/events/' + String(self.id))
  	end

	def display_name
		return self.id
	end
end