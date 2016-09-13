class Player < ActiveRecord::Base
	belongs_to :performer
	
	after_update :update_url
	def update_url
	     self.update_column(:url,self.performer.url)
  	end
end
